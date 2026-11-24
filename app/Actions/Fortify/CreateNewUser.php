<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        /** @var array{name: string, email: string, password: string, role: string, phone: string, company_name: string|null} $validated */
        $validated = Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => $this->passwordRules(),
            'role' => ['required', 'string', Rule::in(['customer', 'b2b'])],
            'phone' => ['required', 'string', 'max:30'],
            'company_name' => ['nullable', 'required_if:role,b2b', 'string', 'max:255'],
        ])->validate();

        $companyName = $validated['role'] === 'b2b'
            ? $validated['company_name']
            : (($validated['company_name'] ?? '') !== '' ? $validated['company_name'] : null);

        return User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'is_admin' => false,
            'role' => $validated['role'],
            'phone' => $validated['phone'],
            'company_name' => $companyName,
        ]);
    }
}
