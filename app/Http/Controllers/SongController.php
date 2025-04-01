<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::with(['files', 'genres'])->latest()->paginate(12);

        return Inertia::render('Songs/Index', [
            'songs' => $songs
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
            'file' => 'required|file|mimes:mp3,wav|max:10240',
            'genres' => 'required|array',
            'genres.*' => 'exists:genres,id'
        ]);

        $song = Song::create([
            'name' => $validated['name'],
            'artist' => $validated['artist'],
            'duration' => $validated['duration'],
        ]);

        $path = $request->file('file')->store('songs', 'public');
        $song->files()->create(['path' => $path]);

        $song->genres()->attach($validated['genres']);

        return redirect()->route('songs.index')
            ->with('message', 'Song created successfully');
    }

    public function show(Song $song)
    {
        $song->load(['files', 'genres']);
        return Inertia::render('Songs/Show', [
            'song' => $song
        ]);
    }

    public function edit(Song $song)
    {
        $song->load(['files', 'genres']);
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
            'file' => 'nullable|file|mimes:mp3,wav|max:10240',
            'genres' => 'required|array',
            'genres.*' => 'exists:genres,id'
        ]);

        $song->update([
            'name' => $validated['name'],
            'artist' => $validated['artist'],
            'duration' => $validated['duration'],
        ]);

        if ($request->hasFile('file')) {
            // Delete old file
            if ($song->files->first()) {
                Storage::disk('public')->delete($song->files->first()->path);
                $song->files()->delete();
            }

            // Store new file
            $path = $request->file('file')->store('songs', 'public');
            $song->files()->create(['path' => $path]);
        }

        $song->genres()->sync($validated['genres']);

        return redirect()->route('songs.index')
            ->with('message', 'Song updated successfully');
    }

    public function destroy(Song $song)
    {
        if ($song->files->first()) {
            Storage::disk('public')->delete($song->files->first()->path);
        }

        $song->delete();

        return redirect()->route('songs.index')
            ->with('message', 'Song deleted successfully');
    }

    public function download(Song $song)
    {
        $file = $song->files->first();
        if (!$file) {
            abort(404);
        }

        return Storage::disk('public')->download($file->path);
    }
}
