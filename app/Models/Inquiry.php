<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property Carbon $needed_date
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Inquiry extends Model
{
    protected $fillable = [
        'name',
        'company',
        'email',
        'whatsapp_number',
        'estimated_quantity',
        'budget_per_package',
        'needed_date',
        'notes',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'estimated_quantity' => 'integer',
            'budget_per_package' => 'integer',
            'needed_date' => 'date',
        ];
    }
}
