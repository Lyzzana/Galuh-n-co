<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'event_category' => ['required', 'string', Rule::in(['Lebaran', 'Natal', 'Imlek', 'Wedding', 'Corporate', 'All Occasion'])],
            'season_tag' => ['nullable', 'string', 'max:100'],
            'is_best_seller' => ['boolean'],
            'short_description' => ['required', 'string', 'max:1000'],
            'contents' => ['required', 'array', 'min:1'],
            'contents.*' => ['required', 'string', 'max:255'],
            'price_from' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
