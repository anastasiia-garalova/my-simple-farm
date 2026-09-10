import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FieldEntry = {
    id: number;
    name: string;
    size_hectares: string;
    soil_type: string | null;
    status: string;
    created_at: string | null;
    farm: {
        id: number | null;
        name: string | null;
        location: string | null;
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

type FieldIndexPageProps = {
    fields: FieldEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Felder', href: '/fields' },
];

export default function FieldsIndexPage() {
    const { fields, flash } = usePage<FieldIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Felder" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Felder</CardTitle>
                            <CardDescription>Erstes relationales Fachmodul mit Bezug zu Betrieben.</CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/fields/create">Neues Feld anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        {fields.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Noch keine Felder vorhanden.</div>
                        ) : (
                            <div className="space-y-4">
                                {fields.map((field) => (
                                    <div key={field.id} className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{field.name}</h3>
                                                <Badge variant="outline">{field.status}</Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>Betrieb: {field.farm.name || 'Unbekannt'}</p>
                                                <p>Standort: {field.farm.location || 'Unbekannt'}</p>
                                                <p>Größe: {field.size_hectares} ha</p>
                                                <p>Bodenart: {field.soil_type || 'Keine Angabe'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {field.can.view && <Button asChild variant="outline"><Link href={`/fields/${field.id}`}>Details</Link></Button>}
                                            {field.can.update && <Button asChild variant="outline"><Link href={`/fields/${field.id}/edit`}>Bearbeiten</Link></Button>}
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
