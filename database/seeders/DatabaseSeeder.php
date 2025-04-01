<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Regular User
        User::factory()->create([
            "name" => "Regular User",
            "email" => "user@example.com",
            "password" => bcrypt("password"),
            "role" => "user",
        ]);

        // Create Artist User
        User::factory()->create([
            "name" => "Artist User",
            "email" => "artist@example.com",
            "password" => bcrypt("password"),
            "role" => "artist",
        ]);

        // Create Admin User
        User::factory()->create([
            "name" => "Admin User",
            "email" => "admin@example.com",
            "password" => bcrypt("password"),
            "role" => "admin",
        ]);

        // Seed genres
        $this->call(GenreSeeder::class);

        // Seed sample songs
        $this->call(SongSeeder::class);
    }
}
