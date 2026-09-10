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

type HarvestShowPageProps = {
    harvest: {
        id: number;
        name: string;
        started_at: string | null;
        ended_at: string | null;
        status: string;
        notes: string | null;
        harvestEntries: {
            quantity: number | null;
            unit: string | null;
            quality_note: string | null;
        }[];
        harvestLosses: { quantity: number | null; unit: string | null }[];
        fieldCropAssignment: {
            field: {
                id: number;
                name: string;
                size_hectares: number;
                farm: { id: number; name: string; location: string };
            };
            crop: { id: number; name: string; category?: string };
            season: {
                id: number;
                name: string;
                year: number;
                starts_on?: string;
                ends_on?: string;
            };
        };
        creator: { id: number; name: string; email: string };
        can: { update: boolean };
    };
    flash?: { success?: string };
};

export default function HarvestsShowPage() {
    const { harvest, flash } = usePage<HarvestShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernten', href: '/harvests' },
        { title: harvest.name, href: `/harvests/${harvest.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={harvest.name} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{harvest.name}</CardTitle>
                                <Badge variant="outline">
                                    {harvest.status}
                                </Badge>
                            </div>
                            <CardDescription>
                                Detailansicht einer Ernte.
                            </CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/harvests">Zur Übersicht</Link>
                            </Button>
                            {harvest.can.update && (
                                <Button asChild variant="outline">
                                    <Link href={`/harvests/${harvest.id}/edit`}>
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

                        {/* Основная информация о поле, культуре и сезоне */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Betrieb</p>
                                <p className="text-sm text-muted-foreground">
                                    {
                                        harvest.fieldCropAssignment.field.farm
                                            .name
                                    }
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Standort</p>
                                <p className="text-sm text-muted-foreground">
                                    {
                                        harvest.fieldCropAssignment.field.farm
                                            .location
                                    }
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Feld</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvest.fieldCropAssignment.field.name} (
                                    {
                                        harvest.fieldCropAssignment.field
                                            .size_hectares
                                    }{' '}
                                    ha)
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Kultur</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvest.fieldCropAssignment.crop.name}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Saison</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvest.fieldCropAssignment.season.name} (
                                    {harvest.fieldCropAssignment.season.year})
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Notizen</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvest.notes ?? '-'}
                                </p>
                            </div>
                        </div>

                        {/* Harvest Entries и Harvest Losses в двух колонках */}
                        <div className="mt-4 grid grid-cols-2 gap-6">
                            {/* Harvest Entries */}
                            <div className="rounded-lg border p-4">
                                <h4 className="mb-2 text-sm font-medium">
                                    Harvest Entries
                                </h4>
                                <table className="w-full rounded-md border border-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="border-b px-2 py-1 text-left">
                                                Quantity
                                            </th>
                                            <th className="border-b px-2 py-1 text-left">
                                                Unit
                                            </th>
                                            <th className="border-b px-2 py-1 text-left">
                                                Quality Note
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {harvest.harvestEntries.map(
                                            (entry, idx) => (
                                                <tr
                                                    key={idx}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border-b px-2 py-1">
                                                        {entry.quantity ?? '-'}
                                                    </td>
                                                    <td className="border-b px-2 py-1">
                                                        {entry.unit ?? '-'}
                                                    </td>
                                                    <td className="border-b px-2 py-1">
                                                        {entry.quality_note ??
                                                            '-'}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Harvest Losses */}
                            <div className="rounded-lg border p-4">
                                <h4 className="mb-2 text-sm font-medium">
                                    Harvest Losses
                                </h4>
                                <table className="w-full rounded-md border border-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="border-b px-2 py-1 text-left">
                                                Quantity
                                            </th>
                                            <th className="border-b px-2 py-1 text-left">
                                                Unit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {harvest.harvestLosses.map(
                                            (loss, idx) => (
                                                <tr
                                                    key={idx}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border-b px-2 py-1">
                                                        {loss.quantity ?? '-'}
                                                    </td>
                                                    <td className="border-b px-2 py-1">
                                                        {loss.unit ?? '-'}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
