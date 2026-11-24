<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LandingContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingContentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/landing-content', [
            'contents' => LandingContent::getGroupedContents(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contents' => ['required', 'array'],
            'contents.*.section' => ['required', 'string', 'max:100'],
            'contents.*.key' => ['required', 'string', 'max:100'],
            'contents.*.value' => ['nullable', 'string'],
            'contents.*.type' => ['nullable', 'string', 'max:50'],
        ]);

        /** @var array<int, array{section: string, key: string, value?: string|null, type?: string|null}> $entries */
        $entries = $validated['contents'];

        foreach ($entries as $entry) {
            LandingContent::updateOrCreate(
                [
                    'section' => $entry['section'],
                    'key' => $entry['key'],
                ],
                [
                    'value' => $entry['value'] ?? null,
                    'type' => $entry['type'] ?? 'text',
                ],
            );
        }

        return back()->with('success', 'Konten landing page berhasil diperbarui.');
    }
}
