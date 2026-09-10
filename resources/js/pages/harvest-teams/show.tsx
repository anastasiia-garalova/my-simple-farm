import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Member = {
    id: number;
    name: string;
    email: string;
};

type HarvestTeamShowPageProps = {
    harvestTeam: {
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
            update: boolean;
        };
    };
    flash?: {
        success?: string;
    };
};

export default function HarvestTeamShowPage() {
    const { harvestTeam, flash } = usePage<HarvestTeamShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernte-Teams', href: '/harvest-teams' },
        { title: harvestTeam.name, href: `/harvest-teams/${harvestTeam.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={harvestTeam.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{harvestTeam.name}</CardTitle>
                                <Badge variant="outline">
                                    {harvestTeam.status}
                                </Badge>
                            </div>
                            <CardDescription>
                                Detailansicht eines Ernte-Teams.
                            </CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/harvest-teams">Zur Übersicht</Link>
                            </Button>
                            {harvestTeam.can.update && (
                                <Button asChild variant="outline">
                                    <Link
                                        href={`/harvest-teams/${harvestTeam.id}/edit`}
                                    >
                                        Bearbeiten
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Leitung</p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestTeam.lead_person || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Erstellt von
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {harvestTeam.creator.name || 'Unbekannt'} (
                                    {harvestTeam.creator.email || '-'})
                                </p>
                            </div>

                            <div className="rounded-lg border p-4 md:col-span-2">
                                <p className="text-sm font-medium">
                                    Mitglieder
                                </p>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                    {harvestTeam.members.length > 0
                                        ? harvestTeam.members.map((m) => (
                                              <li key={m.id}>
                                                  {m.name} ({m.email})
                                              </li>
                                          ))
                                        : 'Keine Mitglieder'}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
