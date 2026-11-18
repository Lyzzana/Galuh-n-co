<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', 'string', 'in:new,contacted,closed'],
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' => 'Status harus diisi.',
            'status.in'       => 'Status tidak valid. Pilih: new, contacted, atau closed.',
        ];
    }
}
