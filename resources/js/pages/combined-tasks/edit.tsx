import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
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

type CombinedTaskEditPageProps = {
    statuses: string[];
    combinedTask: {
        id: number;
        name: string;
        description: string;
        status: string;
        task_type_ids: number[];
    };
    combinedTasks: TaskType[];
};

const breadcrumbs = (taskName: string): BreadcrumbItem[] => [
    { title: 'Kombinierte Tasks', href: '/combined-tasks' },
    { title: taskName, href: '#' },
    { title: 'Bearbeiten', href: '#' },
];

export default function CombinedTaskEditPage({
    statuses,
    combinedTask,
    combinedTasks,
}: CombinedTaskEditPageProps) {
    const form = useForm({
        name: combinedTask.name,
        description: combinedTask.description,
        status: combinedTask.status,
        task_type_ids: combinedTask.task_type_ids,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.patch(`/combined-tasks/${combinedTask.id}`);
    };

    const toggleTaskType = (id: number) => {
        if (form.data.task_type_ids.includes(id)) {
            form.setData(
                'task_type_ids',
                form.data.task_type_ids.filter((t) => t !== id),
            );
        } else {
            form.setData('task_type_ids', [...form.data.task_type_ids, id]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(combinedTask.name)}>
            <Head title={`Bearbeiten: ${combinedTask.name}`} />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Bearbeiten: {combinedTask.name}</CardTitle>
                        <CardDescription>
                            Ändere die Felder nach Bedarf
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData('name', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Beschreibung
                                </label>
                                <textarea
                                    value={form.data.description}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData('status', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.status && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Task Types */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Task Types
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {combinedTasks.map((t) => (
                                        <label
                                            key={t.id}
                                            className="flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.data.task_type_ids.includes(
                                                    t.id,
                                                )}
                                                onChange={() =>
                                                    toggleTaskType(t.id)
                                                }
                                                className="accent-blue-500"
                                            />
                                            <span className="text-sm">
                                                {t.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {form.errors.task_type_ids && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.task_type_ids}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={form.processing}>
                                Speichern
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
