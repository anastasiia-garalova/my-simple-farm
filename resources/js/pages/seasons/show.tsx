import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SeasonShowPageProps = {
    season: {
        id: number;
        name: string;
        year: number;
        starts_on: string | null;
        ends_on: string | null;
        status: string;
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

export default function SeasonsShowPage() {
    const { season, flash } = usePage<SeasonShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Saisons', href: '/seasons' },
        { title: `${season.name} ${season.year}`, href: `/seasons/${season.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${season.name} ${season.year}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{season.name} {season.year}</CardTitle>
                                <Badge variant="outline">{season.status}</Badge>
                            </div>
                            <CardDescription>Detailansicht einer Saison.</CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline"><Link href="/seasons">Zur Übersicht</Link></Button>
                            {season.can.update && <Button asChild variant="outline"><Link href={`/seasons/${season.id}/edit`}>Bearbeiten</Link></Button>}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Startdatum</p>
                                <p className="text-sm text-muted-foreground">{season.starts_on || 'Unbekannt'}</p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Enddatum</p>
                                <p className="text-sm text-muted-foreground">{season.ends_on || 'Unbekannt'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
