import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FarmShowPageProps = {
    farm: {
        id: number;
        name: string;
        location: string;
        contact_person: string | null;
        status: string;
        created_at: string | null;
        creator: {
            id: number | null;
            name: string | null;
            email: string | null;
        };
        can: {
            update: boolean;
        };
    };
    flash?: {
        success?: string;
    };
};

export default function FarmsShowPage() {
    const { farm, flash } = usePage<FarmShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Betriebe', href: '/farms' },
        { title: farm.name, href: `/farms/${farm.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={farm.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{farm.name}</CardTitle>
                                <Badge variant="outline">{farm.status}</Badge>
                            </div>
                            <CardDescription>Detailansicht eines Betriebs.</CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/farms">Zur Übersicht</Link>
                            </Button>

                            {farm.can.update && (
                                <Button asChild variant="outline">
                                    <Link href={`/farms/${farm.id}/edit`}>Bearbeiten</Link>
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Standort</p>
                                <p className="text-sm text-muted-foreground">{farm.location}</p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Kontaktperson</p>
                                <p className="text-sm text-muted-foreground">{farm.contact_person || 'Keine Angabe'}</p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Erstellt von</p>
                                <p className="text-sm text-muted-foreground">{farm.creator.name || 'Unbekannt'}</p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Angelegt am</p>
                                <p className="text-sm text-muted-foreground">{farm.created_at || 'Unbekannt'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
