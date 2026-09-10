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

type TaskEntry = {
    id: number;
    title: string;
    field?: string;
    season?: string;
    task_type?: string;
    combined_task?: string;
    status: string;
    planned_for: string;
    creator: { id?: number; name?: string };
    can: { view: boolean; update: boolean };
};

type TaskIndexPageProps = {
    tasks: TaskEntry[];
    statuses: string[];
    flash?: { success?: string };
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tasks', href: '/tasks' }];

export default function TaskIndexPage() {
    const { tasks, flash } = usePage<TaskIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Tasks</CardTitle>
                            <CardDescription>
                                Liste aller Tasks mit Status, Typ und geplanten
                                Daten.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/tasks/create">Neue Task anlegen</Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {tasks.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Tasks vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {task.title}
                                                </h3>
                                                <Badge variant="outline">
                                                    {task.status}
                                                </Badge>
                                                {task.task_type && (
                                                    <Badge variant="secondary">
                                                        {task.task_type}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    Feld:{' '}
                                                    {task.field || 'Unbekannt'}
                                                </p>
                                                <p>
                                                    Saison:{' '}
                                                    {task.season || 'Unbekannt'}
                                                </p>
                                                <p>
                                                    Kombinierte Task:{' '}
                                                    {task.combined_task ||
                                                        'Keine'}
                                                </p>
                                                <p>
                                                    Geplant für:{' '}
                                                    {task.planned_for}
                                                </p>
                                                <p>
                                                    Erstellt von:{' '}
                                                    {task.creator.name ||
                                                        'Unbekannt'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {task.can.view && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/tasks/${task.id}`}
                                                    >
                                                        Details
                                                    </Link>
                                                </Button>
                                            )}
                                            {task.can.update && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/tasks/${task.id}/edit`}
                                                    >
                                                        Bearbeiten
                                                    </Link>
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
