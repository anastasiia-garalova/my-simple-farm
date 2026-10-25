import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SelectionOption = {
    id: number;
    name: string;
};

type PageProps = {
    regions: SelectionOption[];
    crops: SelectionOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Regionen und Kulturen',
        href: '/region-crops',
    },
    {
        title: 'Zuweisung anlegen',
        href: '/region-crops/create',
    },
];

export default function RegionCropsCreatePage() {
    const { regions, crops } = usePage<PageProps>().props;

    const form = useForm({
        region_id: '',
        crop_id: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/region-crops');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Region und Kultur zuweisen" />

            {/* Ограниченная по ширине центральная колонка, плоский дизайн без рамок Card */}
            <div className="mx-auto w-full max-w-2xl p-6 space-y-6">
                
                {/* Облегченный верхний блок */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-100/60 pb-4">
                    <div className="space-y-0.5">
                        <h1 className="text-xl font-semibold tracking-tight text-stone-800">Region und Kultur zuweisen</h1>
                        <p className="text-sm text-muted-foreground">Wählen Sie eine Region und die dort wachsende Kultur aus.</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="border-emerald-200 text-stone-600 hover:bg-emerald-50/50">
                        <Link href="/region-crops">Zur Übersicht</Link>
                    </Button>
                </div>

                {/* Чистая форма */}
                <form onSubmit={submit} className="space-y-5 pt-2">
                    
                    {/* Выпадающий список для Регионов */}
                    <div className="space-y-1.5">
                        <label htmlFor="region_id" className="text-sm font-medium text-stone-700">Region</label>
                        <select
                            id="region_id"
                            value={form.data.region_id}
                            onChange={(event) => form.setData('region_id', event.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-background px-3 py-2 text-sm text-stone-800 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="" disabled hidden>Bitte Region auswählen...</option>
                            {regions?.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                        {form.errors.region_id && <p className="text-sm text-red-600">{form.errors.region_id}</p>}
                    </div>

                    {/* Выпадающий список для Культур */}
                    <div className="space-y-1.5">
                        <label htmlFor="crop_id" className="text-sm font-medium text-stone-700">Kultur (Fruchtart)</label>
                        <select
                            id="crop_id"
                            value={form.data.crop_id}
                            onChange={(event) => form.setData('crop_id', event.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-background px-3 py-2 text-sm text-stone-800 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="" disabled hidden>Bitte Kultur auswählen...</option>
                            {crops?.map((crop) => (
                                <option key={crop.id} value={crop.id}>
                                    {crop.name}
                                </option>
                            ))}
                        </select>
                        {form.errors.crop_id && <p className="text-sm text-red-600">{form.errors.crop_id}</p>}
                    </div>

                    {/* Панель кнопок с акцентным цветом на сохранении */}
                    <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                        <Button 
                            type="submit" 
                            disabled={form.processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                        >
                            Speichern
                        </Button>
                        <Button asChild variant="ghost" className="text-stone-500 hover:text-stone-800">
                            <Link href="/region-crops">Abbrechen</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
