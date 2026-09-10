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

type HarvestOption = { id: number; name: string };
type UnitOption = string;
type QualityNoteOption = string;

type PageProps = {
    harvests: HarvestOption[];
    units: UnitOption[];
    quality_notes: QualityNoteOption[];
    harvestEntry?: {
        id: number;
        harvest_id: number;
        quantity: string;
        unit: string;
        quality_note: string;
        recorded_at: string;
    };
};

export default function HarvestEntryFormPage({
    harvests,
    units,
    quality_notes,
    harvestEntry,
}: PageProps) {
    const isEdit = !!harvestEntry;

    const form = useForm({
        harvest_id: harvestEntry?.harvest_id ?? harvests[0]?.id ?? 0,
        quantity: harvestEntry?.quantity ?? '',
        unit: harvestEntry?.unit ?? units[0],
        quality_note: harvestEntry?.quality_note ?? quality_notes[0],
        recorded_at: harvestEntry?.recorded_at ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernte Einträge', href: '/harvest-entries' },
        {
            title: isEdit ? 'Bearbeiten' : 'Erstellen',
            href: isEdit
                ? `/harvest-entries/${harvestEntry?.id}/edit`
                : '/harvest-entries/create',
        },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEdit) form.patch(`/harvest-entries/${harvestEntry?.id}`);
        else form.post('/harvest-entries');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={
                    isEdit
                        ? 'Ernte Eintrag bearbeiten'
                        : 'Neuen Ernte Eintrag anlegen'
                }
            />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>
                                {isEdit
                                    ? 'Ernte Eintrag bearbeiten'
                                    : 'Neuen Eintrag anlegen'}
                            </CardTitle>
                            <CardDescription>
                                Erfassung von Menge, Einheit und Qualität
                            </CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href="/harvest-entries">Zur Übersicht</Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Harvest select */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="harvest_id"
                                    className="text-sm font-medium"
                                >
                                    Ernte
                                </label>
                                <select
                                    id="harvest_id"
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
                                <label
                                    htmlFor="quantity"
                                    className="text-sm font-medium"
                                >
                                    Menge
                                </label>
                                <input
                                    id="quantity"
                                    type="text"
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

                            {/* Quality Note */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="quality_note"
                                    className="text-sm font-medium"
                                >
                                    Qualität
                                </label>
                                <select
                                    id="quality_note"
                                    value={form.data.quality_note}
                                    onChange={(e) =>
                                        form.setData(
                                            'quality_note',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {quality_notes.map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.quality_note && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.quality_note}
                                    </p>
                                )}
                            </div>

                            {/* Recorded At */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="recorded_at"
                                    className="text-sm font-medium"
                                >
                                    Datum
                                </label>
                                <input
                                    id="recorded_at"
                                    type="date"
                                    value={form.data.recorded_at}
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
                                {isEdit
                                    ? 'Änderungen speichern'
                                    : 'Eintrag erstellen'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
