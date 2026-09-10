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
    harvests: Option[];
    loss_types: string[];
    reasons: string[];
    units: string[];
};

export default function HarvestLossCreatePage({
    harvests,
    loss_types,
    reasons,
    units,
}: PageProps) {
    const form = useForm({
        harvest_id: harvests[0]?.id ?? 0,
        quantity: '',
        unit: units[0],
        loss_type: loss_types[0],
        reason: reasons[0],
        recorded_at: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernte Verluste', href: '/harvest-losses' },
        { title: 'Neuen Verlust anlegen', href: '/harvest-losses/create' },
    ];

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('/harvest-losses');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Neuen Ernte Verlust anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Neuen Verlust anlegen</CardTitle>
                            <CardDescription>
                                Erfassung von Verlusttyp, Grund und Menge
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
                                    className="w-full rounded-md border px-3 py-2"
                                    value={form.data.harvest_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'harvest_id',
                                            Number(e.target.value),
                                        )
                                    }
                                >
                                    {harvests.map((h) => (
                                        <option key={h.id} value={h.id}>
                                            {h.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Menge
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    step="0.01" // важно для decimal
                                    value={form.data.quantity ?? ''}
                                    onChange={(e) =>
                                        form.setData('quantity', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
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
                                    Verlusttyp
                                </label>
                                <select
                                    className="w-full rounded-md border px-3 py-2"
                                    value={form.data.loss_type}
                                    onChange={(e) =>
                                        form.setData(
                                            'loss_type',
                                            e.target.value,
                                        )
                                    }
                                >
                                    {loss_types.map((l) => (
                                        <option key={l} value={l}>
                                            {l}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Reason */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Grund
                                </label>
                                <select
                                    className="w-full rounded-md border px-3 py-2"
                                    value={form.data.reason}
                                    onChange={(e) =>
                                        form.setData('reason', e.target.value)
                                    }
                                >
                                    {reasons.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Datum
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-md border px-3 py-2"
                                    value={form.data.recorded_at}
                                    onChange={(e) =>
                                        form.setData(
                                            'recorded_at',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <Button type="submit" disabled={form.processing}>
                                Verlust anlegen
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
