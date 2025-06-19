<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'artist',
        'duration',
        'is_private',
        'price',
        'cover',
        'file',
        'user_id',
    ];

    protected $casts = [
        'is_private' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'song_genre');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function buyers()
    {
        return $this->belongsToMany(User::class, 'purchases');
    }

}