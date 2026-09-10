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
    harvestLosses: {
        quantity: number | null;
        unit: string | null;
    }[];
    fieldCropAssignment: {
        field: { name: string; farm: { name: string } };
        crop: { name: string };
        season: { year: number };
    };
    creator: { name: string; email: string };
    can: { view: boolean; update: boolean };
};

type HarvestsIndexPageProps = {
    harvests: HarvestEntry[];
    statuses: string[];
    flash?: { success?: string };
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Ernten', href: '/harvests' }];

export default function HarvestsIndexPage() {
    const { harvests, flash } = usePage<HarvestsIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernten" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernten</CardTitle>
                            <CardDescription>Übersicht aller Erntevorgänge.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/harvests/create">Neue Ernte anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {harvests.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Ernten vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {harvests.map((harvest) => (
                                    <div
                                        key={harvest.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm"
                                    >
                                        {/* Заголовок и статус */}
                                        <div className="flex flex-wrap items-center justify-between">
                                            <h3 className="text-lg font-semibold">{harvest.name}</h3>
                                            <Badge variant="outline">{harvest.status}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {harvest.fieldCropAssignment.field.name} /{' '}
                                            {harvest.fieldCropAssignment.field.farm.name} /{' '}
                                            {harvest.fieldCropAssignment.crop.name} /{' '}
                                            {harvest.fieldCropAssignment.season.year}
                                        </p>

                                        {/* Две колонки: Harvest Entries и Harvest Losses */}
                                        <div className="mt-3 grid grid-cols-2 gap-6">
                                            {/* Harvest Entries */}
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium">Harvest Entries</h4>
                                                <table className="w-full border border-gray-200 text-sm rounded-md">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="border-b px-2 py-1 text-left">Quantity</th>
                                                        <th className="border-b px-2 py-1 text-left">Unit</th>
                                                        <th className="border-b px-2 py-1 text-left">Quality Note</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {harvest.harvestEntries.map((entry, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50">
                                                            <td className="border-b px-2 py-1">{entry.quantity ?? '-'}</td>
                                                            <td className="border-b px-2 py-1">{entry.unit ?? '-'}</td>
                                                            <td className="border-b px-2 py-1">{entry.quality_note ?? '-'}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Harvest Losses */}
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium">Harvest Losses</h4>
                                                <table className="w-full border border-gray-200 text-sm rounded-md">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="border-b px-2 py-1 text-left">Quantity</th>
                                                        <th className="border-b px-2 py-1 text-left">Unit</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {harvest.harvestLosses.map((loss, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50">
                                                            <td className="border-b px-2 py-1">{loss.quantity ?? '-'}</td>
                                                            <td className="border-b px-2 py-1">{loss.unit ?? '-'}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Кнопки */}
                                        <div className="mt-2 flex gap-2">
                                            {harvest.can.view && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/harvests/${harvest.id}`}>Details</Link>
                                                </Button>
                                            )}
                                            {harvest.can.update && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/harvests/${harvest.id}/edit`}>Bearbeiten</Link>
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
