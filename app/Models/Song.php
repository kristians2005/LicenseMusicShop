<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'artist',
        'duration',
    ];

    public function files(): HasMany
    {
        return $this->hasMany(SongFile::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'song_genre');
    }
}