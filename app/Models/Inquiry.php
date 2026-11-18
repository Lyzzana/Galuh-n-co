<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
