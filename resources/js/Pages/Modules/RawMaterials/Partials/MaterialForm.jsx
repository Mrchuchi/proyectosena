import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

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

        Swal.fire({
            title: material ? '¿Actualizar material?' : '¿Crear material?',
            text: material ? 
                '¿Estás seguro de que deseas actualizar esta materia prima?' : 
                '¿Estás seguro de que deseas crear esta nueva materia prima?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: material ? 'Sí, actualizar' : 'Sí, crear',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (material) {
                    put(route('raw-materials.update', material.id));
                } else {
                    post(route('raw-materials.store'));
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código y Nombre */}
                <div className="space-y-2">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código *</label>
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre *</label>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Nombre del material"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Descripción */}
                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="3"
                        placeholder="Descripción detallada del material"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Unidad de Medida y Proveedor */}
                <div className="space-y-2">
                    <label htmlFor="unit_measure" className="block text-sm font-medium text-gray-700">Unidad de Medida *</label>
                    <select
                        id="unit_measure"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
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
                    <label htmlFor="main_supplier" className="block text-sm font-medium text-gray-700">Proveedor Principal</label>
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
                    <label htmlFor="min_stock" className="block text-sm font-medium text-gray-700">Stock Mínimo *</label>
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
                    <label htmlFor="current_stock" className="block text-sm font-medium text-gray-700">Stock Actual *</label>
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
                    <label htmlFor="unit_price" className="block text-sm font-medium text-gray-700">Precio Unitario *</label>
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
                    <label htmlFor="last_purchase" className="block text-sm font-medium text-gray-700">Última Compra</label>
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
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado *</label>
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    <FaArrowLeft className="h-5 w-5" />
                    <span>Volver</span>
                </Link>
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                    disabled={processing}
                >
                    <FaSave className="h-5 w-5" />
                    <span>{processing ? 'Guardando...' : material ? 'Actualizar' : 'Crear'}</span>
                </button>
            </div>
        </form>
    );
}