<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SongFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'song_id',
        'path',
    ];

    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}