<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $songs = Song::where('is_private', false)
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Welcome', [
            'songs' => $songs
        ]);
    }
}
