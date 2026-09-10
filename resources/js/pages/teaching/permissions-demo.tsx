import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type DemoRoute = {
    label: string;
    href: string;
    middleware: string;
    purpose: string;
};

type PermissionsDemoProps = {
    availableRoles: string[];
    availablePermissions: string[];
    userRoles: string[];
    userPermissions: string[];
    demoRoutes: DemoRoute[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions Demo',
        href: '/teaching/permissions',
    },
];

export default function PermissionsDemo({
    availableRoles,
    availablePermissions,
    userRoles,
    userPermissions,
    demoRoutes,
}: PermissionsDemoProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions Demo" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Phase 2: Rollen und Permissions testen</CardTitle>
                        <CardDescription>
                            Diese Seite ist für den Unterricht gedacht. Hier sehen die Teilnehmenden,
                            welche Rollen und Permissions aktuell vorhanden sind und können geschützte
                            Beispielrouten direkt ausprobieren.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Aktuelle Rollen des Benutzers</h3>
                            <div className="flex flex-wrap gap-2">
                                {userRoles.length > 0 ? (
                                    userRoles.map((role) => <Badge key={role}>{role}</Badge>)
                                ) : (
                                    <Badge variant="outline">Keine Rolle zugewiesen</Badge>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Aktuelle Permissions des Benutzers</h3>
                            <div className="flex flex-wrap gap-2">
                                {userPermissions.length > 0 ? (
                                    userPermissions.map((permission) => (
                                        <Badge key={permission} variant="secondary">
                                            {permission}
                                        </Badge>
                                    ))
                                ) : (
                                    <Badge variant="outline">Keine Permission geerbt</Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projektrollen</CardTitle>
                            <CardDescription>
                                Diese Rollen wurden als Startbasis für Phase 2 angelegt.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {availableRoles.map((role) => (
                                <Badge key={role} variant="outline">
                                    {role}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Beispiel-Permissions</CardTitle>
                            <CardDescription>
                                Diese Beispielrechte machen den Unterschied zwischen Rolle und Permission
                                im Unterricht direkt sichtbar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {availablePermissions.map((permission) => (
                                <Badge key={permission} variant="secondary">
                                    {permission}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                        <CardHeader>
                            <CardTitle>Middleware live ausprobieren</CardTitle>
                            <CardDescription>
                                Jeder Link testet eine geschützte Route. Wenn die Middleware greift,
                                erscheint entweder eine Erfolgsmeldung oder eine saubere
                                &quot;403 Forbidden&quot;-Antwort.
                            </CardDescription>
                        </CardHeader>
                    <CardContent className="space-y-4">
                        {demoRoutes.map((demoRoute) => (
                            <div
                                key={demoRoute.href}
                                className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-medium">{demoRoute.label}</h3>
                                        <Badge variant="outline">{demoRoute.middleware}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{demoRoute.purpose}</p>
                                    <p className="text-xs text-muted-foreground">{demoRoute.href}</p>
                                </div>

                                <Button asChild variant="outline">
                                    <a href={demoRoute.href} target="_blank" rel="noreferrer">
                                        Route testen
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
