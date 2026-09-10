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

type HarvestLoss = {
    id: number;
    loss_type: string | null;
    quantity: string;
    unit: string;
    reason: string | null;
    recorded_at: string | null;
    harvest: { id: number | null; name: string | null };
    creator: { id: number | null; name: string | null; email: string | null };
    can: { view: boolean; update: boolean };
};

type PageProps = {
    harvestLosses: HarvestLoss[];
    flash?: { success?: string };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ernte Verluste', href: '/harvest-losses' },
];

export default function HarvestLossIndexPage() {
    const { harvestLosses, flash } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernte Verluste" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernte Verluste</CardTitle>
                            <CardDescription>
                                Erfasste Verluste der Ernte.
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/harvest-losses/create">
                                Neuen Verlust anlegen
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {harvestLosses.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Verluste vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {harvestLosses.map((loss) => (
                                    <div
                                        key={loss.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {loss.quantity}
                                                    {loss.unit}({loss.loss_type}
                                                    )
                                                </h3>
                                                <Badge variant="outline">
                                                    {loss.reason}
                                                </Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    Ernte:{' '}
                                                    {loss.harvest.name ||
                                                        'Unbekannt'}
                                                </p>
                                                <p>
                                                    Datum:{' '}
                                                    {loss.recorded_at || '—'}
                                                </p>
                                                <p>
                                                    Erfasst von:{' '}
                                                    {loss.creator.name ||
                                                        'Unbekannt'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {loss.can.view && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/harvest-losses/${loss.id}`}
                                                    >
                                                        Details
                                                    </Link>
                                                </Button>
                                            )}
                                            {loss.can.update && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/harvest-losses/${loss.id}/edit`}
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
