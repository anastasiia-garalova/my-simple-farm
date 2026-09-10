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

type AssignmentEditPageProps = {
    statuses: string[];
    fields: FieldOption[];
    crops: CropOption[];
    seasons: SeasonOption[];
    assignment: {
        id: number;
        field_id: number;
        crop_id: number;
        season_id: number;
        status: string;
        planned_area_hectares: string;
        notes: string | null;
    };
};

export default function FieldCropAssignmentsEditPage({ statuses, fields, crops, seasons, assignment }: AssignmentEditPageProps) {
    const form = useForm({
        field_id: assignment.field_id,
        crop_id: assignment.crop_id,
        season_id: assignment.season_id,
        status: assignment.status,
        planned_area_hectares: assignment.planned_area_hectares,
        notes: assignment.notes ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Zuordnungen', href: '/field-crop-assignments' },
        { title: `Zuordnung ${assignment.id}`, href: `/field-crop-assignments/${assignment.id}` },
        { title: 'Bearbeiten', href: `/field-crop-assignments/${assignment.id}/edit` },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/field-crop-assignments/${assignment.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Zuordnung bearbeiten: ${assignment.id}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Zuordnung bearbeiten</CardTitle>
                            <CardDescription>Feld, Kultur, Saison und Status können angepasst werden.</CardDescription>
                        </div>

                        <Button asChild variant="outline"><Link href={`/field-crop-assignments/${assignment.id}`}>Zur Detailseite</Link></Button>
                    </CardHeader>

                    <CardContent>
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

                            <Button type="submit" disabled={form.processing}>Änderungen speichern</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
