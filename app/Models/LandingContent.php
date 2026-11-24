<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingContent extends Model
{
    protected $fillable = [
        'section',
        'key',
        'value',
        'type',
    ];

    /**
     * Mengambil seluruh konten landing page terkelompok berdasarkan section.
     *
     * @return array<string, array<string, string|null>>
     */
    public static function getGroupedContents(): array
    {
        return self::query()
            ->get()
            ->groupBy('section')
            ->map(fn ($items) => $items->pluck('value', 'key')->toArray())
            ->toArray();
    }
}
