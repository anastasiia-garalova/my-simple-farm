import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Member = {
    id: number;
    name: string;
    email: string;
};

type HarvestTeamEntry = {
    id: number;
    name: string;
    lead_person: string;
    status: string;
    members: Member[];
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

type HarvestTeamsIndexPageProps = {
    harvestTeams: HarvestTeamEntry[];
    statuses: string[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ernte-Teams', href: '/harvest-teams' },
];

export default function HarvestTeamsIndexPage() {
    const { harvestTeams, flash } = usePage<HarvestTeamsIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ernte-Teams" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernte-Teams</CardTitle>
                            <CardDescription>Verwaltung aller Teams mit Status- und Mitgliederübersicht.</CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/harvest-teams/create">Neues Team anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {harvestTeams.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Ernte-Teams vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {harvestTeams.map((team) => (
                                    <div
                                        key={team.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{team.name}</h3>
                                                <Badge variant="outline">{team.status}</Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>Leitung: {team.lead_person}</p>
                                                <p>
                                                    Mitglieder:{' '}
                                                    {team.members.map((m) => m.name).join(', ') || 'Keine'}
                                                </p>
                                                <p>
                                                    Erstellt von: {team.creator.name || 'Unbekannt'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {team.can.view && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/harvest-teams/${team.id}`}>Details</Link>
                                                </Button>
                                            )}
                                            {team.can.update && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/harvest-teams/${team.id}/edit`}>Bearbeiten</Link>
                                                </Button>
                                            )}
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
