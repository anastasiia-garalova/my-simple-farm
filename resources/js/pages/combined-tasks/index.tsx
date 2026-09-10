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

type TaskType = { id: number; name: string; };
type Task = { id: number; title: string; status: string; };

type CombinedTaskEntry = {
    id: number;
    name: string;
    description?: string;
    status: string;
    task_types: TaskType[];
    tasks: Task[];
    creator: { id?: number; name?: string };
    can: { view: boolean; update: boolean };
};

type CombinedTaskIndexPageProps = {
    combinedTasks: CombinedTaskEntry[];
    statuses: string[];
    flash?: { success?: string };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Kombinierte Tasks', href: '/combined-tasks' },
];

function getStatusBadgeClass(status: string) {
    switch (status) {
        case 'planned':
            return 'bg-yellow-100 text-yellow-800';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-black text-white';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default function CombinedTaskIndexPage() {
    const { combinedTasks, flash } =
        usePage<CombinedTaskIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kombinierte Tasks" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Kombinierte Tasks</CardTitle>
                            <CardDescription>
                                Übersicht aller kombinierten Tasks mit Status,
                                Typen, Aufgaben und Ersteller.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/combined-tasks/create">
                                Neue kombinierte Task anlegen
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {combinedTasks.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine kombinierten Tasks vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {combinedTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {task.name}
                                                </h3>

                                                {/* Статус комбинированной задачи */}
                                                <Badge
                                                    className={getStatusBadgeClass(
                                                        task.status,
                                                    )}
                                                >
                                                    {task.status}
                                                </Badge>

                                                {/* Task Types */}
                                                {task.task_types.map((type) => (
                                                    <Badge
                                                        key={type.id}
                                                        variant="secondary"
                                                    >
                                                        {type.name}
                                                    </Badge>
                                                ))}

                                                {/* Tasks с их статусами и ссылками */}
                                                {task.tasks.length > 0 ? (
                                                    task.tasks.map((t) => (
                                                        <Link key={t.id} href={`/tasks/${t.id}`} className="inline-block">
                                                            <Badge className={getStatusBadgeClass(t.status)}>
                                                                {t.title} {/* <- здесь title вместо name */}
                                                            </Badge>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
        Keine Aufgaben
    </span>
                                                )}
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    Beschreibung:{' '}
                                                    {task.description ||
                                                        'Keine'}
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
                                                        href={`/combined-tasks/${task.id}`}
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
                                                        href={`/combined-tasks/${task.id}/edit`}
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
