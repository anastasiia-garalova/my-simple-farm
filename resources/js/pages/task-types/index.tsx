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

type TaskTypeEntry = {
    id: number;
    name: string;
    category: string;
    default_unit: string;
    status: string;
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

type TaskTypeIndexPageProps = {
    taskTypes: TaskTypeEntry[];
    statuses: string[];
    categories: string[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Arten von Aufgaben', href: '/task-types' },
];

export default function TaskTypesIndexPage() {
    const { taskTypes, flash } = usePage<TaskTypeIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Arten von Aufgaben" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Arten von Aufgaben</CardTitle>
                            <CardDescription>
                                Liste aller Arten von Aufgaben mit Kategorie und
                                Status.
                            </CardDescription>
                        </div>

                        <Button asChild>
                            <Link href="/task-types/create">
                                Neue Art von Aufgaben anlegen
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {flash?.success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {taskTypes.length === 0 ? (
                            <div className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                                Noch keine Arten von Aufgaben vorhanden.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {taskTypes.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row lg:items-start lg:justify-between"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {task.name}
                                                </h3>
                                                <Badge variant="outline">
                                                    {task.status}
                                                </Badge>
                                                <Badge variant="secondary">
                                                    {task.category}
                                                </Badge>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    Einheit: {task.default_unit}
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
                                                        href={`/task-types/${task.id}`}
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
                                                        href={`/task-types/${task.id}/edit`}
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
