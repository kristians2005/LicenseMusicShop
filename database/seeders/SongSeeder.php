<?php

namespace Database\Seeders;

use App\Models\Song;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        $genres = Genre::all();

        // Get or create an artist user
        $artist = User::where('role', 'artist')->first();
        if (!$artist) {
            $artist = User::create([
                'name' => 'Sample Artist',
                'email' => 'artist@example.com',
                'password' => bcrypt('password'),
                'role' => 'artist',
            ]);
        }

        // 7 songs with cover images
        $songs = [
            [
                'name' => 'Summer Vibes',
                'artist' => 'The Midnight Echoes',
                'duration' => '3:45',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample1.mp3',
                'cover' => 'covers/cover_1.png',
                'genres' => ['Chiptune', '8-bit'],
            ],
            [
                'name' => 'Jazz Fusion',
                'artist' => 'Jazz Fusion Masters',
                'duration' => '4:45',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample2.mp3',
                'cover' => 'covers/cover_2.png',
                'genres' => ['Orchestral', 'Ambient'],
            ],
            [
                'name' => 'Thunder and Lightning',
                'artist' => 'Metal Titans',
                'duration' => '4:15',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample3.mp3',
                'cover' => 'covers/cover_3.png',
                'genres' => ['Action', 'Epic'],
            ],
            [
                'name' => 'Southern Wind',
                'artist' => 'Country Roads',
                'duration' => '3:30',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample4.mp3',
                'cover' => 'covers/cover_4.png',
                'genres' => ['Adventure', 'Fantasy'],
            ],
            [
                'name' => 'Digital Pulse',
                'artist' => 'Electronic Dreams',
                'duration' => '3:45',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample5.mp3',
                'cover' => 'covers/cover_5.png',
                'genres' => ['Synthwave', 'Retro'],
            ],
            [
                'name' => 'Island Time',
                'artist' => 'Reggae Vibes',
                'duration' => '4:15',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample6.mp3',
                'cover' => 'covers/cover_6.png',
                'genres' => ['Menu', 'Soundtrack'],
            ],
            [
                'name' => 'Mountain Air',
                'artist' => 'Folk Tales',
                'duration' => '3:55',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample7.mp3',
                'cover' => 'covers/cover_7.png',
                'genres' => ['Puzzle', 'Platformer'],
            ],
        ];

        foreach ($songs as $songData) {
            $song = Song::create([
                'name' => $songData['name'],
                'artist' => $songData['artist'],
                'duration' => $songData['duration'],
                'price' => $songData['price'],
                'is_private' => $songData['is_private'],
                'file' => $songData['file'],
                'cover' => $songData['cover'],
                'user_id' => 1,
            ]);

            // Attach genres
            foreach ($songData['genres'] as $genreName) {
                $genre = $genres->firstWhere('name', $genreName);
                if ($genre) {
                    $song->genres()->attach($genre->id);
                }
            }
        }
    }
}