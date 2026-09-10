import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type WorkItemShowPageProps = {
    workItem: {
        id: number;
        title: string;
        description: string | null;
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
};

export default function WorkItemShowPage() {
    const { workItem } = usePage<WorkItemShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Work Items',
            href: '/work-items',
        },
        {
            title: workItem.title,
            href: `/work-items/${workItem.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={workItem.title} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{workItem.title}</CardTitle>
                                <Badge variant="outline">{workItem.status}</Badge>
                            </div>
                            <CardDescription>
                                Diese Detailseite demonstriert objektbezogene Freigaben über die
                                WorkItemPolicy.
                            </CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href="/work-items">Zur Übersicht</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {workItem.can.update && (
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link href={`/work-items/${workItem.id}/edit`}>Bearbeiten</Link>
                                </Button>
                            </div>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">Beschreibung</h3>
                            <p className="text-sm text-muted-foreground">
                                {workItem.description || 'Keine Beschreibung hinterlegt.'}
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1 text-sm">
                                <p className="font-semibold">Erstellt von</p>
                                <p className="text-muted-foreground">{workItem.creator.name || 'Unbekannt'}</p>
                                <p className="text-muted-foreground">{workItem.creator.email || 'Keine E-Mail'}</p>
                            </div>

                            <div className="space-y-1 text-sm">
                                <p className="font-semibold">Angelegt am</p>
                                <p className="text-muted-foreground">{workItem.created_at || 'Unbekannt'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
