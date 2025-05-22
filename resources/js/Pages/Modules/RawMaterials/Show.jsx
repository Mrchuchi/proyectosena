import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaEdit } from 'react-icons/fa';
import MovementHistory from './Partials/MovementHistory';

export default function Show({ auth, material, movements }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del Material</h2>}
        >
            <Head title={`Material - ${material.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Detalles del Material */}
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {material.name}
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Código: {material.code}
                                    </p>
                                </div>
                                <Link
                                    href={route('raw-materials.edit', material.id)}
                                    className="text-yellow-600 hover:text-yellow-900"
                                >
                                    <FaEdit className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {material.description || '-'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Unidad de Medida</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {material.unit_measure}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Stock Actual</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        <span className={material.current_stock <= material.min_stock ? 'text-red-600 font-bold' : ''}>
                                            {material.current_stock} {material.unit_measure}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Stock Mínimo</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {material.min_stock} {material.unit_measure}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Precio Unitario</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        ${material.unit_price}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Proveedor Principal</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {material.main_supplier || '-'}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Última Compra</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {material.last_purchase || '-'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Estado</dt>
                                    <dd className="mt-1 text-sm sm:col-span-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            material.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {material.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Historial de Movimientos */}
                    <MovementHistory movements={movements} />

                    {/* Botón para volver */}
                    <div className="flex justify-end">
                        <Link
                            href={route('raw-materials.index')}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Volver a la lista
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}