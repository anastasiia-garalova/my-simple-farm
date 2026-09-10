import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type TaskShowPageProps = {
    task: {
        id: number;
        title: string;
        field?: string;
        season?: string;
        task_type?: string;
        combined_task?: string;
        status: string;
        planned_for?: string | null;
        notes?: string | null;
        creator: {
            id?: number;
            name?: string;
        };
        can?: {
            update: boolean;
        };
    };
    flash?: { success?: string };
};

export default function TaskShowPage() {
    const { task, flash } = usePage<TaskShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: '/tasks' },
        { title: task.title, href: `/tasks/${task.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={task.title} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{task.title}</CardTitle>
                                <Badge variant="outline">{task.status}</Badge>
                                {task.task_type && (
                                    <Badge variant="secondary">
                                        {task.task_type}
                                    </Badge>
                                )}
                            </div>
                            <CardDescription>
                                Detailansicht der Task
                            </CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/tasks">Zur Übersicht</Link>
                            </Button>

                            {task.can?.update && (
                                <Button asChild variant="outline">
                                    <Link href={`/tasks/${task.id}/edit`}>
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
                                <p className="text-sm font-medium">Feld</p>
                                <p className="text-sm text-muted-foreground">
                                    {task.field || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Saison</p>
                                <p className="text-sm text-muted-foreground">
                                    {task.season || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Task Type
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.task_type || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Combined Task
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.combined_task || 'Keine'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Geplant für
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.planned_for || 'Nicht gesetzt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Erstellt von
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.creator.name || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4 md:col-span-2">
                                <p className="text-sm font-medium">Notizen</p>
                                <p className="text-sm text-muted-foreground">
                                    {task.notes || 'Keine Notizen'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
