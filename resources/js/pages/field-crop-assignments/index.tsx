import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type AssignmentEntry = {
    id: number;
    status: string;
    planned_area_hectares: string;
    notes: string | null;
    created_at: string | null;
    field: {
        id: number | null;
        name: string | null;
        farm: {
            id: number | null;
            name: string | null;
            location: string | null;
        };
    };
    crop: {
        id: number | null;
        name: string | null;
    };
    season: {
        id: number | null;
        name: string | null;
        year: number | null;
    };
    creator: {
        id: number | null;
        name: string | null;
        email: string | null;
    };
    can: {
        view: boolean;
        update: boolean;
    };
};

type AssignmentIndexPageProps = {
    assignments: AssignmentEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Zuordnungen', href: '/field-crop-assignments' },
];

export default function FieldCropAssignmentsIndexPage() {
    const { assignments, flash } = usePage<AssignmentIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feld-Kultur-Zuordnungen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Feld-Kultur-Zuordnungen</CardTitle>
                            <CardDescription>Planungsmodul für die Zuordnung von Kultur, Saison und Feld.</CardDescription>
                        </div>

                        <Button asChild><Link href="/field-crop-assignments/create">Neue Zuordnung anlegen</Link></Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        {assignments.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Noch keine Feld-Kultur-Zuordnungen vorhanden.</div>
                        ) : (
                            <div className="space-y-4">
                                {assignments.map((assignment) => (
                                    <div key={assignment.id} className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {assignment.crop.name || 'Unbekannte Kultur'} in {assignment.season.name || 'Unbekannte Saison'}
                                                </h3>
                                                <Badge variant="outline">{assignment.status}</Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>Feld: {assignment.field.name || 'Unbekannt'}</p>
                                                <p>Betrieb: {assignment.field.farm.name || 'Unbekannt'}</p>
                                                <p>Geplante Fläche: {assignment.planned_area_hectares} ha</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {assignment.can.view && <Button asChild variant="outline"><Link href={`/field-crop-assignments/${assignment.id}`}>Details</Link></Button>}
                                            {assignment.can.update && <Button asChild variant="outline"><Link href={`/field-crop-assignments/${assignment.id}/edit`}>Bearbeiten</Link></Button>}
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
