<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsB2B
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->isB2B()) {
            return redirect()
                ->route('home')
                ->with('error', 'Fitur kustomisasi 3D & Video eksklusif untuk akun Corporate (B2B).');
        }

        return $next($request);
    }
}
