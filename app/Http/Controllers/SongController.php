<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SongController extends Controller
{
    public function index(Request $request)
    {
        $query = Song::with('genres')->where('is_private', false);

        // Handle search
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('artist', 'like', "%{$search}%");
            });
        }

        // Handle genre filter
        if ($request->has('genre') && $request->genre !== 'all') {
            $query->whereHas('genres', function ($q) use ($request) {
                $q->where('name', $request->genre);
            });
        }

        // Handle sorting
        switch ($request->sort) {
            case 'price-asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price-desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'artist':
                $query->orderBy('artist', 'asc');
                break;
            default:
                $query->latest();
        }

        // Get paginated results
        $songs = $query->paginate(8);

        // Mark owned songs
        $user = auth()->user();
        $ownedSongIds = $user
            ? $user->purchasedSongs()->pluck('songs.id')->toArray()
            : [];

        $songs->getCollection()->transform(function ($song) use ($ownedSongIds) {
            $song->owned = in_array($song->id, $ownedSongIds);
            return $song;
        });

        // Get all genres for the filter dropdown
        $genres = Genre::all();

        return Inertia::render('Songs/Index', [
            'songs' => $songs,
            'genres' => $genres,
            'filters' => [
                'search' => $request->search,
                'genre' => $request->genre,
                'sort' => $request->sort,
            ],
        ]);
    }

    public function artistSongs()
    {
        $songs = Song::where('user_id', auth()->id())
            ->with('genres')
            ->paginate(4);

        return Inertia::render('Songs/ArtistSongs', [
            'songs' => $songs
        ]);
    }

    public function purchasedSongs()
    {
        $user = auth()->user();
        $purchasedSongs = $user->purchasedSongs()->with('genres')->paginate(4);

        return Inertia::render('Songs/PurchasedSongs', [
            'songs' => $purchasedSongs
        ]);
    }

    public function download(Song $song)
    {
        $user = auth()->user();

        // Check if the user owns the song
        if (!$user->purchasedSongs()->where('song_id', $song->id)->exists()) {
            abort(403, 'You do not own this song.');
        }

        // Check if the file exists
        $filePath = public_path($song->file);
        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        // Return the file as a download
        return response()->download($filePath, $song->name . '.' . pathinfo($filePath, PATHINFO_EXTENSION));
    }

    public function create()
    {
        $genres = Genre::all();
        return Inertia::render('Songs/Create', [
            'genres' => $genres
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'duration' => 'required|string',
            'file' => 'required|file|mimes:mp3,wav,mpeg|max:10240',
            'cover' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'genres' => 'required|array',
            'genres.*' => 'exists:genres,id',
            'is_private' => 'boolean',
            'price' => 'required|numeric|min:0',
        ]);



        try {
            // Store audio file in public/songs
            $audioFile = $request->file('file');
            $audioName = uniqid() . '_' . $audioFile->getClientOriginalName();
            $audioFile->move(public_path('songs'), $audioName);
            $audioPath = 'songs/' . $audioName;

            $song = Song::create([
                'name' => $validated['name'],
                'artist' => $validated['artist'],
                'duration' => $validated['duration'],
                'is_private' => $validated['is_private'] ?? false,
                'price' => $validated['price'],
                'file' => $audioPath,
                'user_id' => auth()->id(),
            ]);

            // Store cover image in public/covers if provided
            if ($request->hasFile('cover')) {
                $coverFile = $request->file('cover');
                $coverName = uniqid() . '_' . $coverFile->getClientOriginalName();
                $coverFile->move(public_path('covers'), $coverName);
                $coverPath = 'covers/' . $coverName;
                $song->cover = $coverPath;
                $song->save();
            }

            // Attach genres
            $song->genres()->attach($validated['genres']);

            return redirect()->route('songs.index')
                ->with('success', 'Song uploaded successfully');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to upload song. Please try again.'
            ])->withInput();
        }
    }

    public function show(Song $song)
    {
        if ($song->is_private && !auth()->user()) {
            abort(403);
        }

        $song->load('genres');

        return Inertia::render('Songs/Show', [
            'song' => $song
        ]);
    }

    public function edit(Song $song)
    {
        $song->load('genres');
        $genres = Genre::all();

        return Inertia::render('Songs/Edit', [
            'song' => $song,
            'genres' => $genres
        ]);
    }

    public function update(Request $request, Song $song)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'duration' => 'required|string',
            'file' => 'nullable|file|mimes:mp3,wav,mpeg|max:10240',
            'cover' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'genres' => 'required|array',
            'genres.*' => 'exists:genres,id',
            'is_private' => 'boolean',
            'price' => 'required|numeric|min:0',
        ]);

        try {
            // Update audio file if provided (store in public/songs)
            if ($request->hasFile('file')) {
                // Delete old file if exists
                if ($song->file && file_exists(public_path($song->file))) {
                    @unlink(public_path($song->file));
                }
                $audioFile = $request->file('file');
                $audioName = uniqid() . '_' . $audioFile->getClientOriginalName();
                $audioFile->move(public_path('songs'), $audioName);
                $song->file = 'songs/' . $audioName;
            }

            // Update cover image if provided (store in public/covers)
            if ($request->hasFile('cover')) {
                // Delete old cover if exists
                if ($song->cover && file_exists(public_path($song->cover))) {
                    @unlink(public_path($song->cover));
                }
                $coverFile = $request->file('cover');
                $coverName = uniqid() . '_' . $coverFile->getClientOriginalName();
                $coverFile->move(public_path('covers'), $coverName);
                $song->cover = 'covers/' . $coverName;
            }

            // Update other fields
            $song->name = $validated['name'];
            $song->artist = $validated['artist'];
            $song->duration = $validated['duration'];
            $song->is_private = $validated['is_private'] ?? false;
            $song->price = $validated['price'];
            $song->save();

            // Update genres
            $song->genres()->sync($validated['genres']);

            return redirect()->route('songs.index')
                ->with('success', 'Song updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to update song. Please try again.'
            ])->withInput();
        }
    }

    public function destroy(Song $song)
    {
        try {
            // Delete audio file from public/songs
            if ($song->file && file_exists(public_path($song->file))) {
                @unlink(public_path($song->file));
            }

            // Delete cover image from public/covers
            if ($song->cover && file_exists(public_path($song->cover))) {
                @unlink(public_path($song->cover));
            }

            // Detach genres
            $song->genres()->detach();

            // Delete the song record
            $song->delete();

            return redirect()->route('songs.index')
                ->with('success', 'Song deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to delete song. Please try again.'
            ]);
        }
    }

    public function purchase(Song $song)
    {

        $user = auth()->user();

        // Prevent duplicate purchase
        if ($user->purchasedSongs()->where('song_id', $song->id)->exists()) {
            return back()->with('info', 'You already own this song.');
        }

        // Save purchase
        $user->purchasedSongs()->attach($song->id);

        return back()->with('success', 'Song purchased! You can now download it.');
    }
}
