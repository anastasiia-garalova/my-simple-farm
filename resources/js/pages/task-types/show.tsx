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

type TaskTypeShowPageProps = {
    taskType: {
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
            update: boolean;
        };
    };
    flash?: {
        success?: string;
    };
};

export default function TaskTypesShowPage() {
    const { taskType, flash } = usePage<TaskTypeShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Arten von Aufgaben', href: '/task-types' },
        { title: taskType.name, href: `/task-types/${taskType.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={taskType.name} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{taskType.name}</CardTitle>
                                <Badge variant="outline">
                                    {taskType.status}
                                </Badge>
                                <Badge variant="secondary">
                                    {taskType.category}
                                </Badge>
                            </div>
                            <CardDescription>
                                Detailansicht der Art von Aufgaben.
                            </CardDescription>
                        </div>

                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/task-types">Zur Übersicht</Link>
                            </Button>
                            {taskType.can.update && (
                                <Button asChild variant="outline">
                                    <Link
                                        href={`/task-types/${taskType.id}/edit`}
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
                                <p className="text-sm font-medium">Kategorie</p>
                                <p className="text-sm text-muted-foreground">
                                    {taskType.category}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Status</p>
                                <p className="text-sm text-muted-foreground">
                                    {taskType.status}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Einheit</p>
                                <p className="text-sm text-muted-foreground">
                                    {taskType.default_unit}
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">
                                    Erstellt von
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {taskType.creator.name || 'Unbekannt'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
