import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type RegionCropEntry = {
    id: number;
    region_id: number;
    crop_id: number;
    region_name: string;
    crop_name: string;
    can: {
        update: boolean;
    };
};

type RegionCropsIndexPageProps = {
    regionCrops: RegionCropEntry[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Regionen & Kulturen', href: '/region-crops' },
];

export default function RegionCropsIndexPage() {
    const { regionCrops } = usePage<RegionCropsIndexPageProps>().props;

    const targetRegions = [
        'Zentrum und Süden',
        'Norden und Nordwesten',
        'Osten'
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Regionen & Kulturen" />

            <div className="mx-auto w-full max-w-7xl p-6 space-y-8">
                
                {/* Заглавный баннер с картинкой и акцентным цветом */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-emerald-100 bg-emerald-950/5 shadow-sm">
                    {/* Фоновое изображение (Аграрная эстетика Германии) */}
                    <img 
                        src="https://unsplash.com" 
                        alt="German Fields" 
                        className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay select-none pointer-events-none"
                    />
                    
                    {/* Градиентное размытие для мягкости */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-transparent" />
                    
                    {/* Текстовое содержимое баннера */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                Stammdaten
                            </span>
                            <h1 className="text-2xl font-bold tracking-tight text-emerald-950">Kulturen nach Regionen</h1>
                            <p className="text-sm text-emerald-800/80">
                                Verwaltung und Zuordnung der landwirtschaftlichen Fruchtarten in Deutschland.
                            </p>
                        </div>
                        
                        {/* Акцентная кнопка */}
                        <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors mt-4 sm:mt-0">
                            <Link href="/region-crops/create">Neue Kultur zuweisen</Link>
                        </Button>
                    </div>
                </div>

                {/* Минималистичная трехколоночная структура */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-100/60">
                    {targetRegions.map((regionName, index) => {
                        const cropsInRegion = regionCrops.filter(item => item.region_name === regionName);

                        return (
                            <div key={regionName} className={`space-y-4 ${index > 0 ? 'md:pl-6' : ''} ${index > 0 ? 'pt-6 md:pt-0' : ''}`}>
                                
                                {/* Заголовок региона с цветовым акцентом на количестве записей */}
                                <div className="flex items-baseline justify-between border-b border-emerald-50/60 pb-2">
                                    <h2 className="font-semibold text-base text-stone-800 tracking-tight">{regionName}</h2>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                        {cropsInRegion.length}
                                    </span>
                                </div>

                                {/* Плоский список культур */}
                                <ul className="space-y-1.5">
                                    {cropsInRegion.length === 0 ? (
                                        <li className="text-sm text-stone-400 italic pt-2">Keine Zuweisungen</li>
                                    ) : (
                                        cropsInRegion.map((regionCrop) => (
                                            <li 
                                                key={regionCrop.id} 
                                                className="group flex items-center justify-between py-1 px-2 rounded-md hover:bg-emerald-50/40 text-sm text-stone-600 hover:text-stone-900 transition-all"
                                            >
                                                <span>{regionCrop.crop_name}</span>
                                                
                                                {regionCrop.can.update && (
                                                    <Link 
                                                        href={`/region-crops/${regionCrop.id}/edit`}
                                                        className="text-xs font-medium text-emerald-600 hover:text-emerald-800 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        Bearbeiten
                                                    </Link>
                                                )}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
