import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type RegionEntry = {
    id: number;
    name: string;
    description: string | null;
    contact_person: string | null;
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

type RegionIndexPageProps = {
    regions: RegionEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Regionen',
        href: '/regions',
    },
];

export default function RegionsIndexPage() {
    const { regions, flash } = usePage<RegionIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Regionen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Regionen</CardTitle>
                        </div>

                        <Button asChild>
                            <Link href="/regions/create">Neue Region anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {regions.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Regionen vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {regions.map((region) => (
                                    <div
                                        key={region.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <CardTitle>{region.name}</CardTitle>
                                            </div>
                                            <CardDescription>{region.description || 'Keine Beschreibung hinterlegt.'}</CardDescription>
                                        </div>

                                        <div className="flex gap-2">

                                            {region.can.update && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/regions/${region.id}/edit`}>Bearbeiten</Link>
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
