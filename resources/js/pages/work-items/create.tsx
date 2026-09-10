import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CreateWorkItemPageProps = {
    statuses: string[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Work Items',
        href: '/work-items',
    },
    {
        title: 'Anlegen',
        href: '/work-items/create',
    },
];

export default function CreateWorkItemPage() {
    const { statuses, flash } = usePage<CreateWorkItemPageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        status: 'draft',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/work-items', {
            onSuccess: () => reset('title', 'description'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Work Item anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Neues Work Item anlegen</CardTitle>
                        <CardDescription>
                            Diese Seite dient als Übung für Form Request, Service, Enum und
                            geschützte Web-Routen.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button asChild variant="outline">
                                <Link href="/work-items">Zur Übersicht</Link>
                            </Button>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titel</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(event) => setData('title', event.target.value)}
                                    placeholder="Zum Beispiel: Feldbegehung vorbereiten"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Beschreibung</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) => setData('description', event.target.value)}
                                    placeholder="Kurze Beschreibung der Aufgabe"
                                    className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(event) => setData('status', event.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Speichere...' : 'Work Item speichern'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
