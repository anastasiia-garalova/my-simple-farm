import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type HarvestEntry = {
    id: number;
    quantity: string;
    unit: string;
    quality_note: string;
    recorded_at: string | null;
    harvest: {
        id: number | null;
        name: string | null;
    };
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

type PageProps = {
    harvestEntrys: HarvestEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ernte Einträge', href: '/harvest-entries' },
];

export default function HarvestEntriesIndexPage() {
    const { harvestEntrys, flash } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernte Einträge" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernte Einträge</CardTitle>
                            <CardDescription>
                                Erfasste Erntemengen mit Qualität und Einheit.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/harvest-entries/create">
                                Neuen Eintrag anlegen
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {harvestEntrys.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Einträge vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {harvestEntrys.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {entry.quantity}{' '}
                                                    {entry.unit}
                                                </h3>
                                                <Badge variant="outline">
                                                    {entry.quality_note}
                                                </Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    Ernte:{' '}
                                                    {entry.harvest.name ||
                                                        'Unbekannt'}
                                                </p>
                                                <p>
                                                    Datum:{' '}
                                                    {entry.recorded_at || '—'}
                                                </p>
                                                <p>
                                                    Erstellt von:{' '}
                                                    {entry.creator.name ||
                                                        'Unbekannt'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {entry.can.view && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/harvest-entries/${entry.id}`}
                                                    >
                                                        Details
                                                    </Link>
                                                </Button>
                                            )}

                                            {entry.can.update && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/harvest-entries/${entry.id}/edit`}
                                                    >
                                                        Bearbeiten
                                                    </Link>
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
