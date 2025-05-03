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
        if ($request->has('search')) {
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
        $songs = $query->paginate(10);

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

        dd("works");

        try {
            // Store audio file
            $audioPath = $request->file('file')->store('songs', 'public');

            $song = Song::create([
                'name' => $validated['name'],
                'artist' => $validated['artist'],
                'duration' => $validated['duration'],
                'is_private' => $validated['is_private'] ?? false,
                'price' => $validated['price'],
                'file' => $audioPath,
                'user_id' => auth()->id(),
            ]);

            // Store cover image if provided
            if ($request->hasFile('cover')) {
                $coverPath = $request->file('cover')->store('covers', 'public');
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
            // Update audio file if provided
            if ($request->hasFile('file')) {
                // Delete old file
                if ($song->file) {
                    Storage::disk('public')->delete($song->file);
                }
                $audioPath = $request->file('file')->store('songs', 'public');
                $song->file = $audioPath;
            }

            // Update cover image if provided
            if ($request->hasFile('cover')) {
                // Delete old cover
                if ($song->cover) {
                    Storage::disk('public')->delete($song->cover);
                }
                $coverPath = $request->file('cover')->store('covers', 'public');
                $song->cover = $coverPath;
            }

            // Update other fields
            $song->update([
                'name' => $validated['name'],
                'artist' => $validated['artist'],
                'duration' => $validated['duration'],
                'is_private' => $validated['is_private'] ?? false,
                'price' => $validated['price'],
            ]);

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
            // Delete files
            if ($song->file) {
                Storage::disk('public')->delete($song->file);
            }
            if ($song->cover) {
                Storage::disk('public')->delete($song->cover);
            }

            // Delete song
            $song->delete();

            return redirect()->route('songs.index')
                ->with('success', 'Song deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to delete song. Please try again.'
            ]);
        }
    }

    public function download(Song $song)
    {
        if ($song->is_private && !auth()->user()) {
            abort(403);
        }

        return Storage::disk('public')->download($song->file);
    }
}
