import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FieldOption = {
    id: number;
    name: string;
    farm_name: string | null;
    farm_location: string | null;
};

type CropOption = {
    id: number;
    name: string;
};

type SeasonOption = {
    id: number;
    name: string;
    year: number;
};

type AssignmentCreatePageProps = {
    statuses: string[];
    fields: FieldOption[];
    crops: CropOption[];
    seasons: SeasonOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Zuordnungen', href: '/field-crop-assignments' },
    { title: 'Anlegen', href: '/field-crop-assignments/create' },
];

export default function FieldCropAssignmentsCreatePage({ statuses, fields, crops, seasons }: AssignmentCreatePageProps) {
    const form = useForm({
        field_id: fields[0]?.id ?? 0,
        crop_id: crops[0]?.id ?? 0,
        season_id: seasons[0]?.id ?? 0,
        status: statuses[0] ?? 'planned',
        planned_area_hectares: '',
        notes: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/field-crop-assignments');
    };

    const missingDependencies = fields.length === 0 || crops.length === 0 || seasons.length === 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Zuordnung anlegen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Feld-Kultur-Zuordnung anlegen</CardTitle>
                            <CardDescription>Hier verbindet ihr Feld, Kultur und Saison in einem Planungsdatensatz.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href="/field-crop-assignments">Zur Übersicht</Link></Button>
                    </CardHeader>

                    <CardContent>
                        {missingDependencies ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Bitte legt zuerst mindestens ein Feld, eine Kultur und eine Saison an.</div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="field_id" className="text-sm font-medium">Feld</label>
                                    <select id="field_id" value={form.data.field_id} onChange={(event) => form.setData('field_id', Number(event.target.value))} className="w-full rounded-md border px-3 py-2">
                                        {fields.map((field) => (
                                            <option key={field.id} value={field.id}>{field.name} ({field.farm_name})</option>
                                        ))}
                                    </select>
                                    {form.errors.field_id && <p className="text-sm text-red-600">{form.errors.field_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="crop_id" className="text-sm font-medium">Kultur</label>
                                    <select id="crop_id" value={form.data.crop_id} onChange={(event) => form.setData('crop_id', Number(event.target.value))} className="w-full rounded-md border px-3 py-2">
                                        {crops.map((crop) => (
                                            <option key={crop.id} value={crop.id}>{crop.name}</option>
                                        ))}
                                    </select>
                                    {form.errors.crop_id && <p className="text-sm text-red-600">{form.errors.crop_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="season_id" className="text-sm font-medium">Saison</label>
                                    <select id="season_id" value={form.data.season_id} onChange={(event) => form.setData('season_id', Number(event.target.value))} className="w-full rounded-md border px-3 py-2">
                                        {seasons.map((season) => (
                                            <option key={season.id} value={season.id}>{season.name} {season.year}</option>
                                        ))}
                                    </select>
                                    {form.errors.season_id && <p className="text-sm text-red-600">{form.errors.season_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <select id="status" value={form.data.status} onChange={(event) => form.setData('status', event.target.value)} className="w-full rounded-md border px-3 py-2">
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                    {form.errors.status && <p className="text-sm text-red-600">{form.errors.status}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="planned_area_hectares" className="text-sm font-medium">Geplante Fläche in Hektar</label>
                                    <input id="planned_area_hectares" type="number" step="0.01" min="0.01" value={form.data.planned_area_hectares} onChange={(event) => form.setData('planned_area_hectares', event.target.value)} className="w-full rounded-md border px-3 py-2" />
                                    {form.errors.planned_area_hectares && <p className="text-sm text-red-600">{form.errors.planned_area_hectares}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="notes" className="text-sm font-medium">Notizen</label>
                                    <textarea id="notes" value={form.data.notes} onChange={(event) => form.setData('notes', event.target.value)} className="min-h-24 w-full rounded-md border px-3 py-2" />
                                    {form.errors.notes && <p className="text-sm text-red-600">{form.errors.notes}</p>}
                                </div>

                                <Button type="submit" disabled={form.processing}>Zuordnung speichern</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
