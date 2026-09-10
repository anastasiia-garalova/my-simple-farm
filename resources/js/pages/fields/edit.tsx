import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FarmOption = {
    id: number;
    name: string;
    location: string;
};

type FieldEditPageProps = {
    statuses: string[];
    farms: FarmOption[];
    field: {
        id: number;
        farm_id: number;
        name: string;
        size_hectares: string;
        soil_type: string | null;
        status: string;
    };
};

export default function FieldsEditPage({ statuses, farms, field }: FieldEditPageProps) {
    const form = useForm({
        farm_id: field.farm_id,
        name: field.name,
        size_hectares: field.size_hectares,
        soil_type: field.soil_type ?? '',
        status: field.status,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Felder', href: '/fields' },
        { title: field.name, href: `/fields/${field.id}` },
        { title: 'Bearbeiten', href: `/fields/${field.id}/edit` },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/fields/${field.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Feld bearbeiten: ${field.name}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Feld bearbeiten</CardTitle>
                            <CardDescription>Die relationale Zuordnung zum Betrieb bleibt sichtbar.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href={`/fields/${field.id}`}>Zur Detailseite</Link></Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="farm_id" className="text-sm font-medium">Betrieb</label>
                                <select id="farm_id" value={form.data.farm_id} onChange={(event) => form.setData('farm_id', Number(event.target.value))} className="w-full rounded-md border px-3 py-2">
                                    {farms.map((farm) => (
                                        <option key={farm.id} value={farm.id}>{farm.name} ({farm.location})</option>
                                    ))}
                                </select>
                                {form.errors.farm_id && <p className="text-sm text-red-600">{form.errors.farm_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input id="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="size_hectares" className="text-sm font-medium">Größe in Hektar</label>
                                <input id="size_hectares" type="number" step="0.01" min="0.01" value={form.data.size_hectares} onChange={(event) => form.setData('size_hectares', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.size_hectares && <p className="text-sm text-red-600">{form.errors.size_hectares}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="soil_type" className="text-sm font-medium">Bodenart</label>
                                <input id="soil_type" value={form.data.soil_type} onChange={(event) => form.setData('soil_type', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                {form.errors.soil_type && <p className="text-sm text-red-600">{form.errors.soil_type}</p>}
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
