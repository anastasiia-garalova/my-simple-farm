import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CropCreatePageProps = {
    categories: string[];
    statuses: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kulturen', href: '/crops' },
    { title: 'Anlegen', href: '/crops/create' },
];

export default function CropsCreatePage({ categories, statuses }: CropCreatePageProps) {
    const form = useForm({
        name: '',
        category: categories[0] ?? 'grain',
        status: statuses[0] ?? 'active',
        notes: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/crops');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kultur anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Kultur anlegen</CardTitle>
                            <CardDescription>Stammdaten für Pflanzenarten und Kulturen.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href="/crops">Zur Übersicht</Link></Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input id="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium">Kategorie</label>
                                <select id="category" value={form.data.category} onChange={(event) => form.setData('category', event.target.value)} className="w-full rounded-md border px-3 py-2">
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                {form.errors.category && <p className="text-sm text-red-600">{form.errors.category}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-medium">Status</label>
                                <select id="status" value={form.data.status} onChange={(event) => form.setData('status', event.target.value)} className="w-full rounded-md border px-3 py-2">
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {form.errors.status && <p className="text-sm text-red-600">{form.errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="notes" className="text-sm font-medium">Notizen</label>
                                <textarea id="notes" value={form.data.notes} onChange={(event) => form.setData('notes', event.target.value)} className="min-h-24 w-full rounded-md border px-3 py-2" />
                                {form.errors.notes && <p className="text-sm text-red-600">{form.errors.notes}</p>}
                            </div>

                            <Button type="submit" disabled={form.processing}>Kultur speichern</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
