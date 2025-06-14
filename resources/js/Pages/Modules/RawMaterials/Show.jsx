import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';

export default function Show({ auth, material }) {
    const [currentMaterial, setCurrentMaterial] = useState(material);
      // Estado del material y sus movimientos
    return (
        <AuthenticatedLayout
            user={auth.user}            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del Material</h2>}
        >
            <Head title={`Material - ${currentMaterial.name}`} /><div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Detalles del Material */}
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700">
                                        {currentMaterial.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Código: {currentMaterial.code}
                                    </p>
                                </div>
                                <div>
                                <Link
                                    href={route('raw-materials.edit', material.id)}
                                    className="text-primary-light hover:text-primary-light/80"
                                >
                                    <FaEdit className="h-5 w-5" />
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Descripción</dt>                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {currentMaterial.description || '-'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Unidad de Medida</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {currentMaterial.unit_measure}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Stock Actual</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        <span className={currentMaterial.current_stock <= currentMaterial.min_stock ? 'text-red-600 font-bold' : ''}>
                                            {currentMaterial.current_stock} {currentMaterial.unit_measure}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Stock Mínimo</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {currentMaterial.min_stock} {currentMaterial.unit_measure}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Precio Unitario</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        ${currentMaterial.unit_price}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Proveedor Principal</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {currentMaterial.main_supplier || '-'}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Última Compra</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {currentMaterial.last_purchase || '-'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Estado</dt>
                                    <dd className="mt-1 text-sm sm:col-span-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            currentMaterial.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {currentMaterial.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </dd>
                                </div>                            </dl>
                        </div>
                    </div>

                    {/* Botón para volver */}
                    <div className="flex justify-end">
                        <Link
                            href={route('raw-materials.index')}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Volver a la lista
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}