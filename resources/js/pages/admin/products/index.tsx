import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { dashboard } from '@/routes';

type Product = {
    id: number;
    name: string;
    category: string;
    short_description: string;
    contents: string[];
    price_from: number;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
};

type PageProps = {
    products: Product[];
};

type ProductFormData = {
    name: string;
    category: string;
    short_description: string;
    contents: string;
    price_from: string;
    sort_order: string;
    is_active: boolean;
    image: File | null;
};

export default function ProductsIndex({ products }: PageProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

    const { data, setData, post, put, processing, errors, reset } =
        useForm<ProductFormData>({
            name: '',
            category: '',
            short_description: '',
            contents: '',
            price_from: '',
            sort_order: '0',
            is_active: true,
            image: null,
        });

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

        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                reset();
                toast.success(
                    editingProduct
                        ? 'Produk berhasil diperbarui.'
                        : 'Produk berhasil ditambahkan.',
                );
            },
        };

        if (editingProduct) {
            put(ProductController.update(editingProduct.id), options);
        } else {
            post(ProductController.store(), options);
        }
    };

    const handleDelete = () => {
        if (!deleteTarget) {
            return;
        }

        router.delete(ProductController.destroy(deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteTarget(null);
                toast.success('Produk berhasil dihapus.');
            },
        });
    };

    return (
        <>
            <Head title="Manajemen Produk" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Manajemen Produk
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola produk hampers yang ditampilkan di katalog.
                        </p>
                    </div>
                    <Button onClick={openCreate} className="gap-2">
                        <PlusCircle className="size-4" />
                        Tambah Produk
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">Foto</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead className="text-right">
                                        Harga Mulai
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Urutan
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="py-10 text-center text-muted-foreground"
                                        >
                                            Belum ada produk. Tambahkan produk
                                            pertama.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="size-12 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="size-12 rounded-md bg-muted" />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                                    {product.short_description}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                {product.category}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatRupiah(
                                                    product.price_from,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {product.sort_order}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={
                                                        product.is_active
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {product.is_active
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            openEdit(product)
                                                        }
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Modal tambah / edit */}
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
                        <div className="grid gap-2">
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
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
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
                                <p className="text-sm text-destructive">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
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
                                placeholder="Deskripsi produk dalam 1–2 kalimat..."
                            />
                            {errors.short_description && (
                                <p className="text-sm text-destructive">
                                    {errors.short_description}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="contents">
                                Isi Produk{' '}
                                <span className="text-muted-foreground">
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
                                placeholder="Kue kering premium&#10;Coklat impor&#10;Mug eksklusif"
                            />
                            {errors['contents'] && (
                                <p className="text-sm text-destructive">
                                    {errors['contents']}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
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
                                    <p className="text-sm text-destructive">
                                        {errors.price_from}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sort_order">
                                    Urutan Tampil
                                </Label>
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

                        <div className="grid gap-2">
                            <Label htmlFor="image">
                                Foto Produk{' '}
                                {editingProduct && (
                                    <span className="text-muted-foreground">
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
                                <p className="text-sm text-destructive">
                                    {errors.image}
                                </p>
                            )}
                            {editingProduct?.image_url && !data.image && (
                                <img
                                    src={editingProduct.image_url}
                                    alt="Foto saat ini"
                                    className="mt-1 h-20 w-auto rounded-md object-cover"
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) =>
                                    setData('is_active', Boolean(checked))
                                }
                            />
                            <Label htmlFor="is_active">
                                Tampilkan di katalog
                            </Label>
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
                                  ? 'Simpan Perubahan'
                                  : 'Tambah Produk'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog konfirmasi hapus */}
            <Dialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Hapus Produk?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Produk{' '}
                        <span className="font-medium text-foreground">
                            {deleteTarget?.name}
                        </span>{' '}
                        akan dihapus permanen beserta fotonya. Tindakan ini
                        tidak dapat dibatalkan.
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

ProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Produk',
            href: ProductController.index(),
        },
    ],
};
