import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type WorkItemEntry = {
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
        view: boolean;
        update: boolean;
    };
};

type WorkItemIndexPageProps = {
    workItems: WorkItemEntry[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Work Items',
        href: '/work-items',
    },
];

export default function WorkItemsIndexPage() {
    const { workItems, flash } = usePage<WorkItemIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Work Items" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Work Items</CardTitle>
                            <CardDescription>
                                Diese Listenansicht dient als nächster Schritt für Policies, Listenlogik
                                und objektbezogene Freigaben.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/work-items/create">Neues Work Item</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {workItems.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Work Items vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {workItems.map((workItem) => (
                                    <div
                                        key={workItem.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{workItem.title}</h3>
                                                <Badge variant="outline">{workItem.status}</Badge>
                                            </div>

                                            <p className="max-w-3xl text-sm text-muted-foreground">
                                                {workItem.description || 'Keine Beschreibung hinterlegt.'}
                                            </p>

                                            <div className="text-xs text-muted-foreground">
                                                <p>Erstellt von: {workItem.creator.name || 'Unbekannt'}</p>
                                                <p>Angelegt am: {workItem.created_at || 'Unbekannt'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {workItem.can.view && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/work-items/${workItem.id}`}>Details</Link>
                                                </Button>
                                            )}

                                            {workItem.can.update && (
                                                <Button asChild variant="outline">
                                                    <Link href={`/work-items/${workItem.id}/edit`}>Bearbeiten</Link>
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
