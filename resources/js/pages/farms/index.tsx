import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FarmEntry = {
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
        view: boolean;
        update: boolean;
    };
};

type FarmIndexPageProps = {
    farms: FarmEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Betriebe',
        href: '/farms',
    },
];

export default function FarmsIndexPage() {
    const { farms, flash } = usePage<FarmIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Betriebe" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Betriebe</CardTitle>
                            <CardDescription>Stammdatenmodul für Betriebe als Einstieg in Phase 4.</CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/farms/create">Neuen Betrieb anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {farms.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Betriebe vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {farms.map((farm) => (
                                    <div
                                        key={farm.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{farm.name}</h3>
                                                <Badge variant="outline">{farm.status}</Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>Standort: {farm.location}</p>
                                                <p>Kontaktperson: {farm.contact_person || 'Keine Angabe'}</p>
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                <p>Erstellt von: {farm.creator.name || 'Unbekannt'}</p>
                                                <p>Angelegt am: {farm.created_at || 'Unbekannt'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {farm.can.view && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/farms/${farm.id}`}>Details</Link>
                                                </Button>
                                            )}

                                            {farm.can.update && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/farms/${farm.id}/edit`}>Bearbeiten</Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
