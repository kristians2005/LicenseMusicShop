<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            'Pop',
            'Rock',
            'Hip Hop',
            'R&B',
            'Electronic',
            'Classical',
            'Jazz',
            'Country',
            'Blues',
            'Metal',
            'Folk',
            'Reggae',
            'Latin',
            'World',
            'Alternative',
        ];

        foreach ($genres as $genre) {
            Genre::create(['name' => $genre]);
        }
    }
}