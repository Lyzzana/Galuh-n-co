<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $cart_id
 * @property int|null $product_id
 * @property bool $is_custom_b2b
 * @property array<string, mixed>|null $custom_config
 * @property int $quantity
 * @property string $unit_price
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'is_custom_b2b',
        'custom_config',
        'quantity',
        'unit_price',
    ];

    protected function casts(): array
    {
        return [
            'is_custom_b2b' => 'boolean',
            'custom_config' => 'array',
            'quantity' => 'integer',
            'unit_price' => 'decimal:2',
        ];
    }

    /**
     * @return BelongsTo<Cart, $this>
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * @return BelongsTo<Product, $this>
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
