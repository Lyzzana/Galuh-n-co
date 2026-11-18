<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
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
            'company' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:20'],
            'estimated_quantity' => ['required', 'integer'],
            'budget_per_package' => ['required', 'integer'],
            'needed_date' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
            //Honeypot anti-spam: field jebakan yang harus selalu kosong, jika diisi maka dianggap spam
            'website' => ['nullable', 'string', 'max:255', 'prohibited'],
        ];
    }

    public function message(): array 
    {
        return [
            'name.required' => 'Nama harus diisi.',
            'company.required' => 'Perusahaan harus diisi.',
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Format email tidak valid.',
            'whatsapp_number.required' => 'Nomor WhatsApp harus diisi.',
            'estimated_quantity.required' => 'Perkiraan jumlah harus diisi.',
            'budget_per_package.required' => 'Anggaran per paket harus diisi.',
            'needed_date.required' => 'Tanggal dibutuhkan harus diisi.',
            'needed_date.after_or_equal' => 'Tanggal Kebutuha tidak boleh di masa lalu',
            'notes.string' => 'Catatan harus berupa teks.',
            'website.prohibited' => 'Spam detected.',
        ];
    }
}
