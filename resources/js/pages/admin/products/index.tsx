import { Head, router, useForm } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { cn } from '@/utils';

const EVENT_CATEGORIES = [
    'Lebaran',
    'Natal',
    'Imlek',
    'Wedding',
    'Corporate',
    'All Occasion',
] as const;

type Product = {
    id: number;
    name: string;
    category: string;
    event_category: string;
    season_tag: string | null;
    is_best_seller: boolean;
    short_description: string;
    contents: string[];
    price_from: number;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
};

type PageProps = { products: Product[] };

type ProductFormData = {
    name: string;
    category: string;
    event_category: string;
    season_tag: string;
    is_best_seller: boolean;
    short_description: string;
    contents: string;
    price_from: string;
    sort_order: string;
    is_active: boolean;
    image: File | null;
};

export default function ProductsIndex({ products }: PageProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

    const { data, setData, processing, errors, reset } =
        useForm<ProductFormData>({
            name: '',
            category: '',
            event_category: 'All Occasion',
            season_tag: '',
            is_best_seller: false,
            short_description: '',
            contents: '',
            price_from: '',
            sort_order: '0',
            is_active: true,
            image: null,
        });

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.event_category.toLowerCase().includes(search.toLowerCase()),
    );

    const openCreate = () => {
        reset();
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            category: product.category,
            event_category: product.event_category || 'All Occasion',
            season_tag: product.season_tag ?? '',
            is_best_seller: product.is_best_seller,
            short_description: product.short_description,
            contents: product.contents.join('\n'),
            price_from: product.price_from.toString(),
            sort_order: product.sort_order.toString(),
            is_active: product.is_active,
            image: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contentsArray = data.contents
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);
        const payload = new FormData();
        payload.append('name', data.name);
        payload.append('category', data.category);
        payload.append('event_category', data.event_category);
        if (data.season_tag.trim() !== '') {
            payload.append('season_tag', data.season_tag.trim());
        }
        payload.append('is_best_seller', data.is_best_seller ? '1' : '0');
        payload.append('short_description', data.short_description);
        contentsArray.forEach((item) => payload.append('contents[]', item));
        payload.append('price_from', data.price_from);
        payload.append('sort_order', data.sort_order);
        payload.append('is_active', data.is_active ? '1' : '0');
        if (data.image) payload.append('image', data.image);

        const opts = {
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                reset();
                toast.success(
                    editingProduct
                        ? 'Produk diperbarui.'
                        : 'Produk ditambahkan.',
                );
            },
        };
        if (editingProduct) {
            payload.append('_method', 'PUT');
            router.post(
                ProductController.update(editingProduct.id).url,
                payload,
                opts,
            );
        } else {
            router.post(ProductController.store().url, payload, opts);
        }
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(ProductController.destroy(deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteTarget(null);
                toast.success('Produk dihapus.');
            },
        });
    };

    return (
        <>
            <Head title="Manajemen Produk" />

            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">
                        Daftar Produk
                    </h1>
                    <Button onClick={openCreate} className="gap-2 rounded-xl">
                        <PlusIcon className="size-4" />
                        Tambah Produk
                    </Button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-emerald-800 px-5 py-4 text-white shadow-sm">
                        <p className="text-xs font-medium opacity-80">
                            Total Produk
                        </p>
                        <p className="mt-1 text-3xl font-bold">
                            {products.length}
                        </p>
                    </div>
                    <div className="rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-sm">
                        <p className="text-xs font-medium opacity-80">Aktif</p>
                        <p className="mt-1 text-3xl font-bold">
                            {products.filter((p) => p.is_active).length}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                        <p className="text-xs font-medium text-gray-500">
                            Nonaktif
                        </p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">
                            {products.filter((p) => !p.is_active).length}
                        </p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3">
                    <div className="flex max-w-xs flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                        <SearchIcon className="size-4 shrink-0 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari produk..."
                            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                    </div>
                    <span className="text-xs text-gray-400">
                        {filtered.length} produk
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60">
                                    <th className="w-14 px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Foto
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Harga Mulai
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Urutan
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-12 text-center text-sm text-gray-400"
                                        >
                                            {search
                                                ? 'Tidak ada hasil yang cocok.'
                                                : 'Belum ada produk.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="transition-colors hover:bg-gray-50/60"
                                        >
                                            <td className="px-4 py-3">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="size-11 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex size-11 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                                                        ?
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">
                                                    {product.name}
                                                </p>
                                                <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                                                    {product.short_description}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <p>{product.category}</p>
                                                <div className="mt-1 flex flex-wrap gap-1">
                                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
                                                        {product.event_category}
                                                    </span>
                                                    {product.season_tag && (
                                                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                                                            {product.season_tag}
                                                        </span>
                                                    )}
                                                    {product.is_best_seller && (
                                                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                                                            Best Seller
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">
                                                {formatRupiah(
                                                    product.price_from,
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-600">
                                                {product.sort_order}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                                                        product.is_active
                                                            ? 'bg-green-50 text-green-700'
                                                            : 'bg-gray-100 text-gray-500',
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            'size-1.5 rounded-full',
                                                            product.is_active
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-400',
                                                        )}
                                                    />
                                                    {product.is_active
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEdit(product)
                                                        }
                                                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                                    >
                                                        <PencilIcon className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                product,
                                                            )
                                                        }
                                                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                    >
                                                        <Trash2Icon className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal tambah/edit */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        id="product-form"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="grid gap-1.5">
                            <Label htmlFor="name">Nama Produk</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Hampers Premium A"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="category">Kategori</Label>
                            <Input
                                id="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                placeholder="Corporate Gift"
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="grid gap-1.5">
                                <Label htmlFor="event_category">
                                    Event / Momen
                                </Label>
                                <select
                                    id="event_category"
                                    value={data.event_category}
                                    onChange={(e) =>
                                        setData(
                                            'event_category',
                                            e.target.value,
                                        )
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                    {EVENT_CATEGORIES.map((ev) => (
                                        <option key={ev} value={ev}>
                                            {ev}
                                        </option>
                                    ))}
                                </select>
                                {errors.event_category && (
                                    <p className="text-sm text-red-500">
                                        {errors.event_category}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="season_tag">
                                    Tag Season (Opsional)
                                </Label>
                                <Input
                                    id="season_tag"
                                    value={data.season_tag}
                                    onChange={(e) =>
                                        setData('season_tag', e.target.value)
                                    }
                                    placeholder="cth. Ramadan 2026"
                                />
                                {errors.season_tag && (
                                    <p className="text-sm text-red-500">
                                        {errors.season_tag}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="short_description">
                                Deskripsi Singkat
                            </Label>
                            <Textarea
                                id="short_description"
                                value={data.short_description}
                                onChange={(e) =>
                                    setData('short_description', e.target.value)
                                }
                                rows={3}
                                placeholder="Deskripsi 1–2 kalimat..."
                            />
                            {errors.short_description && (
                                <p className="text-sm text-red-500">
                                    {errors.short_description}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="contents">
                                Isi Produk{' '}
                                <span className="font-normal text-gray-400">
                                    (satu per baris)
                                </span>
                            </Label>
                            <Textarea
                                id="contents"
                                value={data.contents}
                                onChange={(e) =>
                                    setData('contents', e.target.value)
                                }
                                rows={4}
                                placeholder={
                                    'Kue kering\nCoklat impor\nMug eksklusif'
                                }
                            />
                            {errors['contents'] && (
                                <p className="text-sm text-red-500">
                                    {errors['contents']}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="price_from">
                                    Harga Mulai (Rp)
                                </Label>
                                <Input
                                    id="price_from"
                                    type="number"
                                    min={0}
                                    value={data.price_from}
                                    onChange={(e) =>
                                        setData('price_from', e.target.value)
                                    }
                                    placeholder="150000"
                                />
                                {errors.price_from && (
                                    <p className="text-sm text-red-500">
                                        {errors.price_from}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="sort_order">Urutan</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData('sort_order', e.target.value)
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="image">
                                Foto Produk{' '}
                                {editingProduct && (
                                    <span className="font-normal text-gray-400">
                                        (kosongkan jika tidak diganti)
                                    </span>
                                )}
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/jpg,image/jpeg,image/png,image/webp"
                                onChange={(e) =>
                                    setData(
                                        'image',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                            {editingProduct?.image_url && !data.image && (
                                <img
                                    src={editingProduct.image_url}
                                    alt="Foto saat ini"
                                    className="mt-1 h-20 w-auto rounded-lg object-cover"
                                />
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(c) =>
                                        setData('is_active', Boolean(c))
                                    }
                                />
                                <Label htmlFor="is_active">
                                    Tampilkan di katalog
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_best_seller"
                                    checked={data.is_best_seller}
                                    onCheckedChange={(c) =>
                                        setData('is_best_seller', Boolean(c))
                                    }
                                />
                                <Label htmlFor="is_best_seller">
                                    Produk Best Seller
                                </Label>
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            form="product-form"
                            disabled={processing}
                        >
                            {processing
                                ? 'Menyimpan...'
                                : editingProduct
                                  ? 'Simpan'
                                  : 'Tambah'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete dialog */}
            <Dialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Hapus Produk?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">
                        Produk{' '}
                        <span className="font-medium text-gray-900">
                            {deleteTarget?.name}
                        </span>{' '}
                        akan dihapus permanen beserta fotonya.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                        >
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
}

ProductsIndex.layout = undefined;
