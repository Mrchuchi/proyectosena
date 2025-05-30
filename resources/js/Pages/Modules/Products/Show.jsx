import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

export default function Show({ auth, product }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del Producto</h2>}
        >
            <Head title="Detalles del Producto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Información del Producto</h3>
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                    >
                                        <FaEdit className="h-5 w-5" />
                                        <span>Editar</span>
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        <FaArrowLeft className="h-5 w-5" />
                                        <span>Volver</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-medium text-gray-700 mb-3">Información Básica</h4>
                                    <dl className="grid grid-cols-1 gap-2">
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Código:</dt>
                                            <dd className="text-sm text-gray-900">{product.code}</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Nombre:</dt>
                                            <dd className="text-sm text-gray-900">{product.name}</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Tamaño:</dt>
                                            <dd className="text-sm text-gray-900">{product.size}</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Categoría:</dt>
                                            <dd className="text-sm text-gray-900">{product.category}</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Estado:</dt>
                                            <dd>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.status === 'active' ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-medium text-gray-700 mb-3">Información de Inventario</h4>
                                    <dl className="grid grid-cols-1 gap-2">
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Stock Actual:</dt>
                                            <dd className={`text-sm ${product.current_stock <= product.min_stock ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                                {product.current_stock} unidades
                                            </dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Stock Mínimo:</dt>
                                            <dd className="text-sm text-gray-900">{product.min_stock} unidades</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Precio:</dt>
                                            <dd className="text-sm text-gray-900">${product.price}</dd>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <dt className="text-sm font-medium text-gray-500">Valor Total en Inventario:</dt>
                                            <dd className="text-sm text-gray-900">${(product.current_stock * product.price)}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-medium text-gray-700 mb-3">Descripción</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-line">
                                        {product.description || 'No hay descripción disponible.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}