<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(): Response
    {
        $inquiries = Inquiry::query()
            ->latest()
            ->get()
            ->map(function ($inquiry) {
                return [
                    'id'                    => $inquiry->id,
                    'name'                  => $inquiry->name,
                    'company'               => $inquiry->company,
                    'email'                 => $inquiry->email,
                    'whatsapp_number'       => $inquiry->whatsapp_number,
                    'estimated_quantity'    => $inquiry->estimated_quantity,
                    'budget_per_package'    => $inquiry->budget_per_package,
                    'needed_date'           => $inquiry->needed_date->format('Y-m-d'),
                    'needed_date_formatted' => $inquiry->needed_date->translatedFormat('d M Y'),
                    'notes'                 => $inquiry->notes,
                    'status'                => $inquiry->status,
                    'created_at'            => $inquiry->created_at->translatedFormat('d M Y, H:i'),
                ];
            });

        return Inertia::render('admin/inquiry/index', [
            'inquiries' => $inquiries,
        ]);
    }

    public function update(UpdateInquiryRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update([
            'status' => $request->validated()['status'],
        ]);

        return back()->with('success', 'Status inquiry berhasil diperbarui.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return back()->with('success', 'Inquiry berhasil dihapus.');
    }
}
