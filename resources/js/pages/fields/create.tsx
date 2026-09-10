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

type FieldCreatePageProps = {
    statuses: string[];
    farms: FarmOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Felder', href: '/fields' },
    { title: 'Anlegen', href: '/fields/create' },
];

export default function FieldsCreatePage({ statuses, farms }: FieldCreatePageProps) {
    const form = useForm({
        farm_id: farms[0]?.id ?? 0,
        name: '',
        size_hectares: '',
        soil_type: '',
        status: statuses[0] ?? 'available',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/fields');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feld anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Feld anlegen</CardTitle>
                            <CardDescription>Ein Feld wird immer einem Betrieb zugeordnet.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href="/fields">Zur Übersicht</Link></Button>
                    </CardHeader>

                    <CardContent>
                        {farms.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Bitte legt zuerst mindestens einen Betrieb an.</div>
                        ) : (
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

                                <Button type="submit" disabled={form.processing}>Feld speichern</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
