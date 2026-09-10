import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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

type TaskEditPageProps = {
    statuses: string[];
    fields: { id: number; name: string }[];
    seasons: { id: number; name: string }[];
    taskTypes: { id: number; name: string }[];
    combinedTasks: { id: number; name: string }[];
    task: {
        id: number;
        title: string;
        planned_for: string;
        status: string;
        notes?: string;
        field_id: number;
        season_id: number;
        task_type_id: number;
        combined_task_id?: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tasks', href: '/tasks' },
    { title: 'Bearbeiten', href: '' },
];

export default function TaskEditPage({
    statuses,
    fields,
    seasons,
    taskTypes,
    combinedTasks,
    task,
}: TaskEditPageProps) {
    const form = useForm({
        title: task.title,
        planned_for: task.planned_for,
        status: task.status,
        notes: task.notes || '',
        field_id: task.field_id,
        season_id: task.season_id,
        task_type_id: task.task_type_id,
        combined_task_id: task.combined_task_id || '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/tasks/${task.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task bearbeiten" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Task bearbeiten</CardTitle>
                            <CardDescription>
                                Aktualisiere Titel, Status, zugeordnete
                                TaskTypes, Season, Field und Notizen.
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={`/tasks/${task.id}`}>Zurück</Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium"
                                >
                                    Titel
                                </label>
                                <input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(e) =>
                                        form.setData('title', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.title && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="field_id"
                                    className="text-sm font-medium"
                                >
                                    Field
                                </label>
                                <select
                                    id="field_id"
                                    value={form.data.field_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'field_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {fields.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.field_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.field_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="season_id"
                                    className="text-sm font-medium"
                                >
                                    Season
                                </label>
                                <select
                                    id="season_id"
                                    value={form.data.season_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'season_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {seasons.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.season_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.season_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="task_type_id"
                                    className="text-sm font-medium"
                                >
                                    Task Type
                                </label>
                                <select
                                    id="task_type_id"
                                    value={form.data.task_type_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'task_type_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {taskTypes.map((tt) => (
                                        <option key={tt.id} value={tt.id}>
                                            {tt.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.task_type_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.task_type_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="combined_task_id"
                                    className="text-sm font-medium"
                                >
                                    Combined Task (optional)
                                </label>
                                <select
                                    id="combined_task_id"
                                    value={form.data.combined_task_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'combined_task_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">Keine</option>
                                    {combinedTasks.map((ct) => (
                                        <option key={ct.id} value={ct.id}>
                                            {ct.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.combined_task_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.combined_task_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="planned_for"
                                    className="text-sm font-medium"
                                >
                                    Geplant für
                                </label>
                                <input
                                    id="planned_for"
                                    type="datetime-local"
                                    value={form.data.planned_for}
                                    onChange={(e) =>
                                        form.setData(
                                            'planned_for',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.planned_for && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.planned_for}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="status"
                                    className="text-sm font-medium"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData('status', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.status && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="notes"
                                    className="text-sm font-medium"
                                >
                                    Notizen
                                </label>
                                <textarea
                                    id="notes"
                                    value={form.data.notes}
                                    onChange={(e) =>
                                        form.setData('notes', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.notes && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.notes}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={form.processing}>
                                Aktualisieren
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
