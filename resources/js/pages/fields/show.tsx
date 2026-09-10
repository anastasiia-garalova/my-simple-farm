import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type FieldShowPageProps = {
    field: {
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
            update: boolean;
        };
    };
    flash?: {
        success?: string;
    };
};

export default function FieldsShowPage() {
    const { field, flash } = usePage<FieldShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Felder', href: '/fields' },
        { title: field.name, href: `/fields/${field.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={field.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{field.name}</CardTitle>
                                <Badge variant="outline">{field.status}</Badge>
                            </div>
                            <CardDescription>Detailansicht eines Feldes.</CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline"><Link href="/fields">Zur Übersicht</Link></Button>
                            {field.can.update && <Button asChild variant="outline"><Link href={`/fields/${field.id}/edit`}>Bearbeiten</Link></Button>}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Betrieb</p>
                                <p className="text-sm text-muted-foreground">{field.farm.name || 'Unbekannt'}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Standort des Betriebs</p>
                                <p className="text-sm text-muted-foreground">{field.farm.location || 'Unbekannt'}</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Größe</p>
                                <p className="text-sm text-muted-foreground">{field.size_hectares} ha</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Bodenart</p>
                                <p className="text-sm text-muted-foreground">{field.soil_type || 'Keine Angabe'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
