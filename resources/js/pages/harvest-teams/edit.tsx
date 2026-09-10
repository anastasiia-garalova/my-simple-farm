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

type Member = {
    id: number;
    name: string;
    email: string;
};

type HarvestTeamEditPageProps = {
    statuses: string[];
    members: Member[];
    harvestTeam: {
        id: number;
        name: string;
        lead_person: string;
        status: string;
        members: number[]; // массив id участников
    };
};

export default function HarvestTeamEditPage({
    statuses,
    members,
    harvestTeam,
}: HarvestTeamEditPageProps) {
    const form = useForm({
        name: harvestTeam.name,
        lead_person: harvestTeam.lead_person,
        status: harvestTeam.status,
        members: harvestTeam.members,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ernte-Teams', href: '/harvest-teams' },
        { title: harvestTeam.name, href: `/harvest-teams/${harvestTeam.id}` },
        { title: 'Bearbeiten', href: `/harvest-teams/${harvestTeam.id}/edit` },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/harvest-teams/${harvestTeam.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Team bearbeiten: ${harvestTeam.name}`} />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Ernte-Team bearbeiten</CardTitle>
                            <CardDescription>
                                Teamname, Leitung, Mitglieder und Status können
                                aktualisiert werden.
                            </CardDescription>
                        </div>

                        <Button asChild variant="outline">
                            <Link href={`/harvest-teams/${harvestTeam.id}`}>
                                Zur Detailseite
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Teamname
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

                            {/* Lead Person */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="lead_person"
                                    className="text-sm font-medium"
                                >
                                    Leitung
                                </label>
                                <input
                                    id="lead_person"
                                    value={form.data.lead_person}
                                    onChange={(e) =>
                                        form.setData(
                                            'lead_person',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                {form.errors.lead_person && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.lead_person}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
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

                            {/* Members */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="members"
                                    className="text-sm font-medium"
                                >
                                    Mitglieder
                                </label>
                                <select
                                    id="members"
                                    multiple
                                    value={form.data.members.map(String)}
                                    onChange={(e) =>
                                        form.setData(
                                            'members',
                                            Array.from(
                                                e.target.selectedOptions,
                                                (option) =>
                                                    Number(option.value),
                                            ),
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    {members.map((member) => (
                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.name} ({member.email})
                                        </option>
                                    ))}
                                </select>
                                {form.errors.members && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.members}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={form.processing}>
                                Änderungen speichern
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
