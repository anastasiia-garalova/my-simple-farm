import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SeasonEntry = {
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
        view: boolean;
        update: boolean;
    };
};

type SeasonIndexPageProps = {
    seasons: SeasonEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Saisons', href: '/seasons' },
];

export default function SeasonsIndexPage() {
    const { seasons, flash } = usePage<SeasonIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Saisons" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Saisons</CardTitle>
                            <CardDescription>Planungsmodul mit Zeit- und Statuslogik.</CardDescription>
                        </div>

                        <Button asChild><Link href="/seasons/create">Neue Saison anlegen</Link></Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                        )}

                        {seasons.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">Noch keine Saisons vorhanden.</div>
                        ) : (
                            <div className="space-y-4">
                                {seasons.map((season) => (
                                    <div key={season.id} className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{season.name} {season.year}</h3>
                                                <Badge variant="outline">{season.status}</Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>Beginn: {season.starts_on || 'Unbekannt'}</p>
                                                <p>Ende: {season.ends_on || 'Unbekannt'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {season.can.view && <Button asChild variant="outline"><Link href={`/seasons/${season.id}`}>Details</Link></Button>}
                                            {season.can.update && <Button asChild variant="outline"><Link href={`/seasons/${season.id}/edit`}>Bearbeiten</Link></Button>}
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
