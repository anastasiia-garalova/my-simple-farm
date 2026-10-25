import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CropEntry = {
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
        view: boolean;
        update: boolean;
    };
};

type CropIndexPageProps = {
    crops: CropEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kulturen', href: '/crops' },
];

export default function CropsIndexPage() {
    const { crops, flash } = usePage<CropIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kulturen" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Kulturen</CardTitle>
                            <CardDescription>Eigenständiges Stammdatenmodul für Pflanzen und Kulturen.</CardDescription>
                        </div>

                        <Button asChild><Link href="/crops/create">Neue Kultur anlegen</Link></Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        {crops.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Noch keine Kulturen vorhanden.</div>
                        ) : (
                            <div className="space-y-4">
                                {crops.map((crop) => (
                                    <div key={crop.id} className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{crop.name}</h3>
                                                <Badge variant="outline">{crop.status}</Badge>
                                            </div>
                                            <p className="max-w-3xl text-sm text-muted-foreground">{crop.notes || 'Keine Notizen hinterlegt.'}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            {crop.can.view && <Button asChild variant="outline"><Link href={`/crops/${crop.id}`}>Details</Link></Button>}
                                            {crop.can.update && <Button asChild variant="outline"><Link href={`/crops/${crop.id}/edit`}>Bearbeiten</Link></Button>}
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
