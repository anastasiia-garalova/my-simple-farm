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

type FieldCropAssignmentOption = {
    id: number;
    label: string; // объединяем field, farm, crop, season
};

type HarvestCreatePageProps = {
    statuses: string[];
    fieldCropAssignments: FieldCropAssignmentOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ernten', href: '/harvests' },
    { title: 'Anlegen', href: '/harvests/create' },
];

export default function HarvestsCreatePage({
    statuses,
    fieldCropAssignments,
}: HarvestCreatePageProps) {
    const form = useForm({
        field_crop_assignment_id: fieldCropAssignments[0]?.id ?? 0,
        name: '',
        started_at: '',
        ended_at: '',
        status: statuses[0] ?? 'planned',
        notes: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/harvests');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernte anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Neue Ernte anlegen</CardTitle>
                        <CardDescription>
                            Verknüpft mit Feld, Kultur und Saison.
                        </CardDescription>
                        <Button asChild variant="outline">
                            <Link href="/harvests">Zur Übersicht</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {fieldCropAssignments.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Bitte legt zuerst mindestens ein
                                Feld-Kultur-Saison-Zuordnung an.
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="field_crop_assignment_id"
                                        className="text-sm font-medium"
                                    >
                                        Feld / Kultur / Saison
                                    </label>
                                    <select
                                        id="field_crop_assignment_id"
                                        value={
                                            form.data.field_crop_assignment_id
                                        }
                                        onChange={(e) =>
                                            form.setData(
                                                'field_crop_assignment_id',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        {fieldCropAssignments.map((fca) => (
                                            <option key={fca.id} value={fca.id}>
                                                {fca.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium"
                                    >
                                        Name der Ernte
                                    </label>
                                    <input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="started_at"
                                            className="text-sm font-medium"
                                        >
                                            Beginn
                                        </label>
                                        <input
                                            type="date"
                                            id="started_at"
                                            value={form.data.started_at}
                                            onChange={(e) =>
                                                form.setData(
                                                    'started_at',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-md border px-3 py-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="ended_at"
                                            className="text-sm font-medium"
                                        >
                                            Ende
                                        </label>
                                        <input
                                            type="date"
                                            id="ended_at"
                                            value={form.data.ended_at}
                                            onChange={(e) =>
                                                form.setData(
                                                    'ended_at',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-md border px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="status"
                                        className="text-sm font-medium"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={form.data.status}
                                        onChange={(e) =>
                                            form.setData(
                                                'status',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="notes"
                                        className="text-sm font-medium"
                                    >
                                        Notizen
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={form.data.notes}
                                        onChange={(e) =>
                                            form.setData(
                                                'notes',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    Ernte speichern
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
