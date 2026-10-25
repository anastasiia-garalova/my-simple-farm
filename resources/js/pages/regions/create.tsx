
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Regionen',
        href: '/regions',
    },
    {
        title: 'Region anlegen',
        href: '/regions/create',
    },
];

export default function RegionsCreatePage() {
    const form = useForm({
        name: '',
        description: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/regions');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Region anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Region anlegen</CardTitle>
                            <CardDescription>Ein erster fachlicher Stammdatensatz.</CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href="/regions">Zur Übersicht</Link>
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
                                <label htmlFor="description" className="text-sm font-medium">Beschreibung</label>
                                <input
                                    id="description"
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.description && <p className="text-sm text-red-600">{form.errors.description}</p>}
                            </div>

                            <Button type="submit" disabled={form.processing}>Region speichern</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
