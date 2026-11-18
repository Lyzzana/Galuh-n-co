<x-mail::message>
# Inquiry Corporate Baru - Galuh & Co.

Halo Admin, ada pengajuan penawarana hampers corporate baru melalui website Galuh & Co. Berikut detailnya:

- **Nama PIC:** {{ $inquiry->name }}
- **Perusahaan:** {{ $inquiry->company }}
- **Email:** {{ $inquiry->email }}
- **Nomor WhatsApp:** {{ $inquiry->whatsapp_number }}
- **Perkiraan Jumlah:** {{ $inquiry->estimated_quantity }}
- **Anggaran per Paket:** {{ $inquiry->budget_per_package }}
- **Tanggal Dibutuhkan:** {{ $inquiry->needed_date }}
- **Catatan:** 
    {{ $inquiry->notes ?: '-'}}

<x-mail::button :url="''">
Lihat di Dahsboard Admin
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
