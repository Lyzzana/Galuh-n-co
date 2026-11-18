<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_products' => Product::count(),
                'active_products' => Product::where('is_active', true)->count(),
                'total_inquiries' => Inquiry::count(),
                'new_inquiries' => Inquiry::where('status', 'new')->count(),
            ],
            'recent_inquiries' => Inquiry::latest()
                ->take(5)
                ->get()
                ->map(fn (Inquiry $i) => [
                    'id' => $i->id,
                    'name' => $i->name,
                    'company' => $i->company,
                    'estimated_quantity' => $i->estimated_quantity,
                    'needed_date' => $i->needed_date->format('d M Y'),
                    'status' => $i->status,
                ]),
        ]);
    }
}
