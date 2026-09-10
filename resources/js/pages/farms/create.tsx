import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FarmCreatePageProps = {
    statuses: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Betriebe',
        href: '/farms',
    },
    {
        title: 'Anlegen',
        href: '/farms/create',
    },
];

export default function FarmsCreatePage({ statuses }: FarmCreatePageProps) {
    const form = useForm({
        name: '',
        location: '',
        contact_person: '',
        status: statuses[0] ?? 'active',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/farms');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Betrieb anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Betrieb anlegen</CardTitle>
                            <CardDescription>Ein erster fachlicher Stammdatensatz.</CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href="/farms">Zur Übersicht</Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium">Standort</label>
                                <input
                                    id="location"
                                    value={form.data.location}
                                    onChange={(event) => form.setData('location', event.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.location && <p className="text-sm text-red-600">{form.errors.location}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact_person" className="text-sm font-medium">Kontaktperson</label>
                                <input
                                    id="contact_person"
                                    value={form.data.contact_person}
                                    onChange={(event) => form.setData('contact_person', event.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.contact_person && <p className="text-sm text-red-600">{form.errors.contact_person}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-medium">Status</label>
                                <select
                                    id="status"
                                    value={form.data.status}
                                    onChange={(event) => form.setData('status', event.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {form.errors.status && <p className="text-sm text-red-600">{form.errors.status}</p>}
                            </div>

                            <Button type="submit" disabled={form.processing}>Betrieb speichern</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
