import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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

type Option = { id: number; name: string };

type PageProps = {
    harvestLoss: {
        id: number;
        harvest_id: number;
        quantity: number | null; // decimal из базы
        unit: string;
        loss_type: string | null;
        reason: string | null;
        recorded_at: string | null; // YYYY-MM-DD
    };
    harvests: Option[];
    loss_types: string[];
    reasons: string[];
    units: string[];
};

export default function HarvestLossEditPage({
    harvestLoss,
    harvests,
    units,
    loss_types,
    reasons,
}: PageProps) {
    const form = useForm({
        harvest_id: harvestLoss.harvest_id || harvests[0]?.id || 0,
        quantity:
            harvestLoss.quantity !== null && harvestLoss.quantity !== undefined
                ? harvestLoss.quantity.toFixed(2)
                : '0.00',
        unit: harvestLoss?.unit ?? units[0],
        loss_type: harvestLoss.loss_type || loss_types[0] || '',
        reason: harvestLoss.reason || reasons[0] || '',
        recorded_at: harvestLoss.recorded_at || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernteverluste', href: '/harvest-losses' },
        { title: 'Bearbeiten', href: `/harvest-losses/${harvestLoss.id}/edit` },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/harvest-losses/${harvestLoss.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernteverlust bearbeiten" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernteverlust bearbeiten</CardTitle>
                            <CardDescription>
                                Ändern Sie Menge, Art des Verlustes und Grund
                            </CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href="/harvest-losses">Zur Übersicht</Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Harvest */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Ernte
                                </label>
                                <select
                                    value={form.data.harvest_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'harvest_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {harvests.map((h) => (
                                        <option key={h.id} value={h.id}>
                                            {h.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.harvest_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.harvest_id}
                                    </p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Menge
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={form.data.quantity}
                                    onChange={(e) =>
                                        form.setData('quantity', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.quantity && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.quantity}
                                    </p>
                                )}
                            </div>

                            {/* Unit */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="unit"
                                    className="text-sm font-medium"
                                >
                                    Einheit
                                </label>
                                <select
                                    id="unit"
                                    value={form.data.unit}
                                    onChange={(e) =>
                                        form.setData('unit', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {units.map((u) => (
                                        <option key={u} value={u}>
                                            {u}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.unit && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.unit}
                                    </p>
                                )}
                            </div>

                            {/* Loss Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Art des Verlustes
                                </label>
                                <select
                                    value={form.data.loss_type}
                                    onChange={(e) =>
                                        form.setData(
                                            'loss_type',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {loss_types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.loss_type && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.loss_type}
                                    </p>
                                )}
                            </div>

                            {/* Reason */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Grund
                                </label>
                                <select
                                    value={form.data.reason}
                                    onChange={(e) =>
                                        form.setData('reason', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {reasons.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.reason && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.reason}
                                    </p>
                                )}
                            </div>

                            {/* Recorded At */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Datum
                                </label>
                                <input
                                    type="date"
                                    value={form.data.recorded_at || ''}
                                    onChange={(e) =>
                                        form.setData(
                                            'recorded_at',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.recorded_at && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.recorded_at}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={form.processing}>
                                Änderungen speichern
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
