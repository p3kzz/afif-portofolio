<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['user_id', 'name', 'comment', 'rating', 'is_approved'];

    protected $casts = [
        'is_approved' => 'boolean',
        'rating' => 'integer',
    ];

    // Relasi opsional ke User (Breeze Auth) jika komentar ditulis oleh user yang login
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
