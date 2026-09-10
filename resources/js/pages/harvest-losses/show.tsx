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

type PageProps = {
    harvestLoss: {
        id: number;
        loss_type: string | null;
        quantity: string;
        unit: string;
        reason: string | null;
        recorded_at: string | null;
        harvest: { id: number | null; name: string | null };
        creator: {
            id: number | null;
            name: string | null;
            email: string | null;
        };
        can: { update: boolean };
    };
    flash?: { success?: string };
};

export default function HarvestLossShowPage() {
    const { harvestLoss, flash } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernte Verluste', href: '/harvest-losses' },
        {
            title: `Verlust: ${harvestLoss.quantity} ${harvestLoss.unit}`,
            href: `/harvest-losses/${harvestLoss.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`Ernte Verlust: ${harvestLoss.quantity}${harvestLoss.unit}`}
            />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>
                                    {harvestLoss.quantity}
                                    {harvestLoss.unit} ({harvestLoss.loss_type})
                                </CardTitle>
                                <Badge variant="outline">
                                    {harvestLoss.reason}
                                </Badge>
                            </div>
                            <CardDescription>
                                Details zu diesem Ernteverlust
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/harvest-losses">
                                    Zur Übersicht
                                </Link>
                            </Button>
                            {harvestLoss.can.update && (
                                <Button asChild variant="outline">
                                    <Link
                                        href={`/harvest-losses/${harvestLoss.id}/edit`}
                                    >
                                        Bearbeiten
                                    </Link>
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
                                <p className="text-sm font-medium">Ernte</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestLoss.harvest.name || 'Unbekannt'}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Erfasst von
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestLoss.creator.name || 'Unbekannt'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestLoss.creator.email || ''}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Datum</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestLoss.recorded_at || '—'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
