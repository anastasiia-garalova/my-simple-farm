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

type TaskType = { id: number; name: string };
type Task = { id: number; name: string; status: string };

type CombinedTaskShowPageProps = {
    combinedTask: {
        id: number;
        name: string;
        description?: string;
        status: string;
        task_types: TaskType[];
        tasks: Task[];
        creator: { id?: number; name?: string };
        can?: { update: boolean };
    };
    flash?: { success?: string };
};


function getStatusBadgeClass(status: string) {
    switch (status) {
        case 'planned':
            return 'bg-yellow-100 text-yellow-800';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'сompleted':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-black text-white';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default function CombinedTaskShowPage() {
    const { combinedTask, flash } = usePage<CombinedTaskShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kombinierte Tasks', href: '/combined-tasks' },
        {
            title: combinedTask.name,
            href: `/combined-tasks/${combinedTask.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={combinedTask.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{combinedTask.name}</CardTitle>

                                <Badge
                                    className={getStatusBadgeClass(
                                        combinedTask.status,
                                    )}
                                >
                                    {combinedTask.status}
                                </Badge>

                                {/* Task Types */}
                                {combinedTask.task_types.map((t) => (
                                    <Badge key={t.id} variant="secondary">
                                        {t.name}
                                    </Badge>
                                ))}


                            </div>

                            <CardDescription>
                                Detailansicht der kombinierten Task
                            </CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/combined-tasks">
                                    Zur Übersicht
                                </Link>
                            </Button>

                            {combinedTask.can?.update && (
                                <Button asChild variant="outline">
                                    <Link
                                        href={`/combined-tasks/${combinedTask.id}/edit`}
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
                            <div className="rounded-lg border p-4 md:col-span-2">
                                <p className="text-sm font-medium">
                                    Beschreibung
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {combinedTask.description || 'Keine'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Erstellt von
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {combinedTask.creator.name || 'Unbekannt'}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4 md:col-span-2">
                                <p className="text-sm font-medium">Aufgaben</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {combinedTask.tasks.length > 0 ? (
                                        combinedTask.tasks.map((t) => (
                                            <Link
                                                key={t.id}
                                                href={`/tasks/${t.id}`}
                                            >
                                                <Badge
                                                    className={getStatusBadgeClass(
                                                        t.status,
                                                    )}
                                                >
                                                    {t.name}
                                                </Badge>
                                            </Link>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground">
                                            Keine Aufgaben
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
