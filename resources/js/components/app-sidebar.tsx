import { Link } from '@inertiajs/react';
import {
    AlertTriangle,
    BookOpen,
    Building2,
    CalendarRange,
   // CheckSquare,
    ClipboardList,
    FileText,
    FolderGit2,
    KeyRound,
    Layers,
    LayoutGrid,
    Link2,
    Map,
    MapPinned,
    Sprout,
    SquareCheckBig,
    Users,
    Wheat,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Permissions Demo',
        href: '/teaching/permissions',
        icon: KeyRound,
    },
    {
        title: 'Work Items',
        href: '/work-items',
        icon: SquareCheckBig,
    },
    {
        title: 'Betriebe',
        href: '/farms',
        icon: Building2,
    },
    {
        title: 'Regionen',
        href: '/regions',
        icon: MapPinned,
    },
        {
        title: 'Regionen und Kulturen',
        href: '/region-crops',
        icon: MapPinned,
    },
    {
        title: 'Felder',
        href: '/fields',
        icon: Map,
    },
    {
        title: 'Kulturen',
        href: '/crops',
        icon: Sprout,
    },
    {
        title: 'Saisons',
        href: '/seasons',
        icon: CalendarRange,
    },
    {
        title: 'Zuordnungen',
        href: '/field-crop-assignments',
        icon: Link2,
    },
    {
        title: 'Arten von Aufgaben',
        href: '/task-types',
        icon: SquareCheckBig,
    },
    {
        title: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
    },
    {
        title: 'Kombinierte Tasks',
        href: '/combined-tasks',
        icon: Layers,
    },
    {
        title: 'Ernten',
        href: '/harvests',
        icon: Wheat,
    },
    {
        title: 'Ernteteams',
        href: '/harvest-teams',
        icon: Users,
    },
    {
        title: 'Ernteerfassungen',
        href: '/harvest-entries',
        icon: FileText, // команды
    },
    {
        title: 'Ernteverluste',
        href: '/harvest-losses',
        icon: AlertTriangle, // предупреждение / потери
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
