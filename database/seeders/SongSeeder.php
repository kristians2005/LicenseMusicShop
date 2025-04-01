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
        // Get all genres
        $genres = Genre::all();

        // Get artist users
        $artists = User::where('role', 'artist')->get();

        if ($artists->isEmpty()) {
            // Create a default artist if none exists
            $artist = User::create([
                'name' => 'Sample Artist',
                'email' => 'artist@example.com',
                'password' => bcrypt('password'),
                'role' => 'artist',
            ]);
        } else {
            $artist = $artists->first();
        }

        // Sample songs data with 25 songs
        $songs = [
            // Songs by "The Midnight Echoes"
            [
                'name' => 'Summer Vibes',
                'artist' => 'The Midnight Echoes',
                'duration' => '3:45',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample1.mp3',
                'genres' => ['Pop', 'Electronic'],
            ],
            [
                'name' => 'Midnight Dreams',
                'artist' => 'The Midnight Echoes',
                'duration' => '4:20',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample2.mp3',
                'genres' => ['Rock', 'Alternative'],
            ],
            [
                'name' => 'Urban Groove',
                'artist' => 'The Midnight Echoes',
                'duration' => '3:15',
                'price' => 2.49,
                'is_private' => false,
                'file' => 'songs/sample3.mp3',
                'genres' => ['Hip Hop', 'R&B'],
            ],

            // Songs by "Jazz Fusion Masters"
            [
                'name' => 'Classical Journey',
                'artist' => 'Jazz Fusion Masters',
                'duration' => '5:30',
                'price' => 4.99,
                'is_private' => false,
                'file' => 'songs/sample4.mp3',
                'genres' => ['Classical', 'Instrumental'],
            ],
            [
                'name' => 'Jazz Fusion',
                'artist' => 'Jazz Fusion Masters',
                'duration' => '4:45',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample5.mp3',
                'genres' => ['Jazz', 'Blues'],
            ],

            // Songs by "Metal Titans"
            [
                'name' => 'Thunder and Lightning',
                'artist' => 'Metal Titans',
                'duration' => '4:15',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample6.mp3',
                'genres' => ['Metal', 'Rock'],
            ],
            [
                'name' => 'Dark Matter',
                'artist' => 'Metal Titans',
                'duration' => '5:20',
                'price' => 4.49,
                'is_private' => false,
                'file' => 'songs/sample7.mp3',
                'genres' => ['Metal', 'Alternative'],
            ],

            // Songs by "Country Roads"
            [
                'name' => 'Southern Wind',
                'artist' => 'Country Roads',
                'duration' => '3:30',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample8.mp3',
                'genres' => ['Country', 'Folk'],
            ],
            [
                'name' => 'Prairie Sunset',
                'artist' => 'Country Roads',
                'duration' => '4:10',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample9.mp3',
                'genres' => ['Country', 'Blues'],
            ],

            // Songs by "World Beats"
            [
                'name' => 'Global Rhythms',
                'artist' => 'World Beats',
                'duration' => '4:30',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample10.mp3',
                'genres' => ['World', 'Latin'],
            ],
            [
                'name' => 'Desert Wind',
                'artist' => 'World Beats',
                'duration' => '5:15',
                'price' => 4.49,
                'is_private' => false,
                'file' => 'songs/sample11.mp3',
                'genres' => ['World', 'Folk'],
            ],

            // Songs by "Electronic Dreams"
            [
                'name' => 'Digital Pulse',
                'artist' => 'Electronic Dreams',
                'duration' => '3:45',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample12.mp3',
                'genres' => ['Electronic', 'Pop'],
            ],
            [
                'name' => 'Neon Lights',
                'artist' => 'Electronic Dreams',
                'duration' => '4:20',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample13.mp3',
                'genres' => ['Electronic', 'Alternative'],
            ],

            // Songs by "Classical Masters"
            [
                'name' => 'Symphony No. 1',
                'artist' => 'Classical Masters',
                'duration' => '6:30',
                'price' => 5.99,
                'is_private' => false,
                'file' => 'songs/sample14.mp3',
                'genres' => ['Classical', 'Instrumental'],
            ],
            [
                'name' => 'Piano Sonata',
                'artist' => 'Classical Masters',
                'duration' => '5:45',
                'price' => 4.99,
                'is_private' => false,
                'file' => 'songs/sample15.mp3',
                'genres' => ['Classical', 'Instrumental'],
            ],

            // Songs by "Reggae Vibes"
            [
                'name' => 'Island Time',
                'artist' => 'Reggae Vibes',
                'duration' => '4:15',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample16.mp3',
                'genres' => ['Reggae', 'World'],
            ],
            [
                'name' => 'Sunset Reggae',
                'artist' => 'Reggae Vibes',
                'duration' => '3:55',
                'price' => 3.29,
                'is_private' => false,
                'file' => 'songs/sample17.mp3',
                'genres' => ['Reggae', 'Latin'],
            ],

            // Songs by "Blues Brothers"
            [
                'name' => 'Delta Blues',
                'artist' => 'Blues Brothers',
                'duration' => '4:30',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample18.mp3',
                'genres' => ['Blues', 'Jazz'],
            ],
            [
                'name' => 'Chicago Blues',
                'artist' => 'Blues Brothers',
                'duration' => '4:10',
                'price' => 3.79,
                'is_private' => false,
                'file' => 'songs/sample19.mp3',
                'genres' => ['Blues', 'Rock'],
            ],

            // Songs by "Hip Hop Kings"
            [
                'name' => 'Street Life',
                'artist' => 'Hip Hop Kings',
                'duration' => '3:45',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample20.mp3',
                'genres' => ['Hip Hop', 'R&B'],
            ],
            [
                'name' => 'Urban Legends',
                'artist' => 'Hip Hop Kings',
                'duration' => '4:15',
                'price' => 3.49,
                'is_private' => false,
                'file' => 'songs/sample21.mp3',
                'genres' => ['Hip Hop', 'Electronic'],
            ],

            // Songs by "Folk Tales"
            [
                'name' => 'Mountain Air',
                'artist' => 'Folk Tales',
                'duration' => '3:55',
                'price' => 2.99,
                'is_private' => false,
                'file' => 'songs/sample22.mp3',
                'genres' => ['Folk', 'Country'],
            ],
            [
                'name' => 'River Song',
                'artist' => 'Folk Tales',
                'duration' => '4:20',
                'price' => 3.29,
                'is_private' => false,
                'file' => 'songs/sample23.mp3',
                'genres' => ['Folk', 'World'],
            ],

            // Songs by "Latin Heat"
            [
                'name' => 'Salsa Nights',
                'artist' => 'Latin Heat',
                'duration' => '4:30',
                'price' => 3.99,
                'is_private' => false,
                'file' => 'songs/sample24.mp3',
                'genres' => ['Latin', 'World'],
            ],
            [
                'name' => 'Tropical Beat',
                'artist' => 'Latin Heat',
                'duration' => '4:15',
                'price' => 3.79,
                'is_private' => false,
                'file' => 'songs/sample25.mp3',
                'genres' => ['Latin', 'Reggae'],
            ],
        ];

        foreach ($songs as $songData) {
            // Create the song
            $song = Song::create([
                'name' => $songData['name'],
                'artist' => $songData['artist'],
                'duration' => $songData['duration'],
                'price' => $songData['price'],
                'is_private' => $songData['is_private'],
                'file' => $songData['file'],
                'user_id' => $artist->id,
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