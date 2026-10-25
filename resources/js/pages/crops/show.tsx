import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CropShowPageProps = {
    crop: {
        id: number;
        name: string;
        status: string;
        notes: string | null;
        created_at: string | null;
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

export default function CropsShowPage() {
    const { crop, flash } = usePage<CropShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kulturen', href: '/crops' },
        { title: crop.name, href: `/crops/${crop.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={crop.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{crop.name}</CardTitle>
                                <Badge variant="outline">{crop.status}</Badge>
                            </div>
                            <CardDescription>Detailansicht einer Kultur.</CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline"><Link href="/crops">Zur Übersicht</Link></Button>
                            {crop.can.update && <Button asChild variant="outline"><Link href={`/crops/${crop.id}/edit`}>Bearbeiten</Link></Button>}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">Notizen</p>
                            <p className="text-sm text-muted-foreground">{crop.notes || 'Keine Notizen hinterlegt.'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
