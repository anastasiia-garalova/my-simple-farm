import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type AssignmentShowPageProps = {
    assignment: {
        id: number;
        status: string;
        planned_area_hectares: string;
        notes: string | null;
        created_at: string | null;
        field: {
            id: number | null;
            name: string | null;
            size_hectares: string | null;
            farm: {
                id: number | null;
                name: string | null;
                location: string | null;
            };
        };
        crop: {
            id: number | null;
            name: string | null;
            category: string | null;
        };
        season: {
            id: number | null;
            name: string | null;
            year: number | null;
            starts_on: string | null;
            ends_on: string | null;
        };
        creator: {
            id: number | null;
            name: string | null;
            email: string | null;
        };
        can: {
            update: boolean;
        };
    };
    flash?: {
        success?: string;
    };
};

export default function FieldCropAssignmentsShowPage() {
    const { assignment, flash } = usePage<AssignmentShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Zuordnungen', href: '/field-crop-assignments' },
        { title: `Zuordnung ${assignment.id}`, href: `/field-crop-assignments/${assignment.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Zuordnung ${assignment.id}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>Zuordnung {assignment.id}</CardTitle>
                                <Badge variant="outline">{assignment.status}</Badge>
                            </div>
                            <CardDescription>Detailansicht der Planungszuordnung.</CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline"><Link href="/field-crop-assignments">Zur Übersicht</Link></Button>
                            {assignment.can.update && <Button asChild variant="outline"><Link href={`/field-crop-assignments/${assignment.id}/edit`}>Bearbeiten</Link></Button>}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Feld</p>
                                <p className="text-sm text-muted-foreground">{assignment.field.name || 'Unbekannt'}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Betrieb</p>
                                <p className="text-sm text-muted-foreground">{assignment.field.farm.name || 'Unbekannt'}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Kultur</p>
                                <p className="text-sm text-muted-foreground">{assignment.crop.name || 'Unbekannt'}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Saison</p>
                                <p className="text-sm text-muted-foreground">{assignment.season.name || 'Unbekannt'} {assignment.season.year || ''}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Geplante Fläche</p>
                                <p className="text-sm text-muted-foreground">{assignment.planned_area_hectares} ha</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Notizen</p>
                                <p className="text-sm text-muted-foreground">{assignment.notes || 'Keine Notizen hinterlegt.'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
