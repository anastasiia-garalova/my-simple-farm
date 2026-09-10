import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SeasonEditPageProps = {
    statuses: string[];
    season: {
        id: number;
        name: string;
        year: number;
        starts_on: string | null;
        ends_on: string | null;
        status: string;
    };
};

export default function SeasonsEditPage({ statuses, season }: SeasonEditPageProps) {
    const form = useForm({
        name: season.name,
        year: String(season.year),
        starts_on: season.starts_on ?? '',
        ends_on: season.ends_on ?? '',
        status: season.status,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Saisons', href: '/seasons' },
        { title: `${season.name} ${season.year}`, href: `/seasons/${season.id}` },
        { title: 'Bearbeiten', href: `/seasons/${season.id}/edit` },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/seasons/${season.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Saison bearbeiten: ${season.name}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Saison bearbeiten</CardTitle>
                            <CardDescription>Datumslogik und Status können aktualisiert werden.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href={`/seasons/${season.id}`}>Zur Detailseite</Link></Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input id="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="year" className="text-sm font-medium">Jahr</label>
                                <input id="year" type="number" value={form.data.year} onChange={(event) => form.setData('year', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.year && <p className="text-sm text-red-600">{form.errors.year}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="starts_on" className="text-sm font-medium">Startdatum</label>
                                    <input id="starts_on" type="date" value={form.data.starts_on} onChange={(event) => form.setData('starts_on', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                    {form.errors.starts_on && <p className="text-sm text-red-600">{form.errors.starts_on}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="ends_on" className="text-sm font-medium">Enddatum</label>
                                    <input id="ends_on" type="date" value={form.data.ends_on} onChange={(event) => form.setData('ends_on', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                    {form.errors.ends_on && <p className="text-sm text-red-600">{form.errors.ends_on}</p>}
                                </div>
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

                            <Button type="submit" disabled={form.processing}>Änderungen speichern</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
