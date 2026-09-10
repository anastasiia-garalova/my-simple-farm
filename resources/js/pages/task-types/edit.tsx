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

type TaskTypeEditPageProps = {
    statuses: string[];
    categories: string[];
    taskType: {
        id: number;
        name: string;
        category: string;
        default_unit: string;
        status: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Arten von Aufgaben', href: '/task-types' },
    { title: 'Bearbeiten', href: '' },
];

export default function TaskTypesEditPage({
    statuses,
    categories,
    taskType,
}: TaskTypeEditPageProps) {
    const form = useForm({
        name: taskType.name,
        category: taskType.category,
        default_unit: taskType.default_unit,
        status: taskType.status,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/task-types/${taskType.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="TaskType bearbeiten" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>TaskType bearbeiten</CardTitle>
                            <CardDescription>
                                Aktualisiere Name, Kategorie, Einheit und
                                Status.
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={`/task-types/${taskType.id}`}>
                                Zurück
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
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

                            <div className="space-y-2">
                                <label
                                    htmlFor="category"
                                    className="text-sm font-medium"
                                >
                                    Kategorie
                                </label>
                                <select
                                    id="category"
                                    value={form.data.category}
                                    onChange={(e) =>
                                        form.setData('category', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.category && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.category}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="default_unit"
                                    className="text-sm font-medium"
                                >
                                    Einheit
                                </label>
                                <input
                                    id="default_unit"
                                    value={form.data.default_unit}
                                    onChange={(e) =>
                                        form.setData(
                                            'default_unit',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.default_unit && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.default_unit}
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
