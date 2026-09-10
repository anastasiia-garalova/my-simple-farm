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

type TaskCreatePageProps = {
    statuses: string[];
    fields: { id: number; name: string }[];
    seasons: { id: number; name: string }[];
    taskTypes: { id: number; name: string }[];
    combinedTasks: { id: number; name: string }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tasks', href: '/tasks' },
    { title: 'Erstellen', href: '/tasks/create' },
];

export default function TaskCreatePage({
    statuses,
    fields,
    seasons,
    taskTypes,
    combinedTasks,
}: TaskCreatePageProps) {
    const form = useForm({
        title: '',
        field_id: fields[0]?.id || '',
        season_id: seasons[0]?.id || '',
        task_type_id: taskTypes[0]?.id || '',
        combined_task_id: combinedTasks[0]?.id || '',
        planned_for: '',
        status: statuses[0] || '',
        notes: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post('/tasks');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Neue Task anlegen" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Neue Task anlegen</CardTitle>
                        <CardDescription>Fülle alle Felder aus</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label>Title</label>
                                <input
                                    value={form.data.title}
                                    onChange={(e) =>
                                        form.setData('title', e.target.value)
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                />
                            </div>
                            <div>
                                <label>Field</label>
                                <select
                                    value={form.data.field_id}
                                    onChange={(e) =>
                                        form.setData('field_id', e.target.value)
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                >
                                    {fields.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Season</label>
                                <select
                                    value={form.data.season_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'season_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                >
                                    {seasons.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Task Type</label>
                                <select
                                    value={form.data.task_type_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'task_type_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                >
                                    {taskTypes.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Combined Task (optional)</label>
                                <select
                                    value={form.data.combined_task_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'combined_task_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                >
                                    <option value="">Keine</option>
                                    {combinedTasks.map((ct) => (
                                        <option key={ct.id} value={ct.id}>
                                            {ct.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Status</label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData('status', e.target.value)
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Planned For</label>
                                <input
                                    type="datetime-local"
                                    value={form.data.planned_for}
                                    onChange={(e) =>
                                        form.setData(
                                            'planned_for',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                />
                            </div>
                            <div>
                                <label>Notes</label>
                                <textarea
                                    value={form.data.notes}
                                    onChange={(e) =>
                                        form.setData('notes', e.target.value)
                                    }
                                    className="w-full rounded-md border px-2 py-1"
                                />
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
