import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function MaterialForm({ material, nextCode }) {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, put, processing, errors } = useForm({
        code: nextCode || material?.code || '',
        name: material?.name || '',
        description: material?.description || '',
        unit_measure: material?.unit_measure || '',
        min_stock: material?.min_stock || 0,
        current_stock: material?.current_stock || 0,
        unit_price: material?.unit_price || 0,
        main_supplier: material?.main_supplier || '',
        last_purchase: material?.last_purchase || today,
        status: material?.status || 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (material) {
            put(route('raw-materials.update', material.id));
        } else {
            post(route('raw-materials.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código y Nombre */}
                <div className="space-y-2">
                    <InputLabel htmlFor="code" value="Código *" className="text-gray-700" />
                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100"
                        value={data.code}
                        disabled={true}
                        required
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="name" value="Nombre *" className="text-gray-700" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Nombre del material"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Descripción */}
                <div className="space-y-2 md:col-span-2">
                    <InputLabel htmlFor="description" value="Descripción" className="text-gray-700" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="3"
                        placeholder="Descripción detallada del material"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Unidad de Medida y Proveedor */}
                <div className="space-y-2">
                    <InputLabel htmlFor="unit_measure" value="Unidad de Medida *" className="text-gray-700" />
                    <select
                        id="unit_measure"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.unit_measure}
                        onChange={(e) => setData('unit_measure', e.target.value)}
                        required
                    >
                        <option value="">Seleccione una unidad</option>
                        <option value="metros">Metros</option>
                        <option value="kilogramos">Kilogramos</option>
                        <option value="unidades">Unidades</option>
                        <option value="litros">Litros</option>
                        <option value="yardas">Yardas</option>
                        <option value="piezas">Piezas</option>
                    </select>
                    <InputError message={errors.unit_measure} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="main_supplier" value="Proveedor Principal" className="text-gray-700" />
                    <TextInput
                        id="main_supplier"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.main_supplier}
                        onChange={(e) => setData('main_supplier', e.target.value)}
                        placeholder="Nombre del proveedor"
                    />
                    <InputError message={errors.main_supplier} className="mt-2" />
                </div>

                {/* Stock y Precio */}
                <div className="space-y-2">
                    <InputLabel htmlFor="min_stock" value="Stock Mínimo *" className="text-gray-700" />
                    <div className="relative">
                        <TextInput
                            id="min_stock"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.min_stock}
                            onChange={(e) => setData('min_stock', e.target.value)}
                            required
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                            {data.unit_measure}
                        </span>
                    </div>
                    <InputError message={errors.min_stock} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="current_stock" value="Stock Actual *" className="text-gray-700" />
                    <div className="relative">
                        <TextInput
                            id="current_stock"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.current_stock}
                            onChange={(e) => setData('current_stock', e.target.value)}
                            required
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                            {data.unit_measure}
                        </span>
                    </div>
                    <InputError message={errors.current_stock} className="mt-2" />
                </div>

                {/* Precio y Fecha */}
                <div className="space-y-2">
                    <InputLabel htmlFor="unit_price" value="Precio Unitario *" className="text-gray-700" />
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            $
                        </span>
                        <TextInput
                            id="unit_price"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full pl-7 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.unit_price}
                            onChange={(e) => setData('unit_price', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.unit_price} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="last_purchase" value="Última Compra" className="text-gray-700" />
                    <TextInput
                        id="last_purchase"
                        type="date"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.last_purchase}
                        onChange={(e) => setData('last_purchase', e.target.value)}
                        min={today}
                    />
                    <InputError message={errors.last_purchase} className="mt-2" />
                </div>

                {/* Estado */}
                <div className="space-y-2 md:col-span-2">
                    <InputLabel htmlFor="status" value="Estado *" className="text-gray-700" />
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        required
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Link
                    href={route('raw-materials.index')}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Guardando...' : material ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
}