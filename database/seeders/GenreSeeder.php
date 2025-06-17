<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            'Chiptune',
            '8-bit',
            'Orchestral',
            'Ambient',
            'Synthwave',
            'Retro',
            'Fantasy',
            'Epic',
            'Action',
            'Adventure',
            'Horror',
            'Puzzle',
            'Platformer',
            'Battle',
            'Menu',
            'Soundtrack',
        ];

        foreach ($genres as $genre) {
            Genre::create(['name' => $genre]);
        }
    }
}