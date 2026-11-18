<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\NewInquiryNotification;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        // Exclude the honeypot field from the validated data
        $data = $request->safe()->except(['website']);

        $inquiry = Inquiry::create($data);

        // Send the notification email to admin
        $adminEmail = config('services.galuh.admin_email');
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new NewInquiryNotification($inquiry));
        }

        return back()->with('success', 'Terima kasih! Permintaan penawaran kerjasama Anda telah kami terima.');
    }
}
