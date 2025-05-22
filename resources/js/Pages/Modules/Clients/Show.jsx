import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

export default function Show({ auth, client }) {
    const handleDelete = () => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            router.delete(route('clients.destroy', client.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del Cliente</h2>}
        >
            <Head title="Detalles del Cliente" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-700">Información del Cliente</h3>
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('clients.edit', client.id)}
                                        className="text-yellow-600 hover:text-yellow-900"
                                        title="Editar"
                                    >
                                        <FaEdit className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="text-red-600 hover:text-red-900"
                                        title="Eliminar"
                                    >
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Código</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.code}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.name}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Tipo de Documento</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.document_type || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Número de Documento</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.document_number || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Correo Electrónico</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.email || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.phone || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.address || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Ciudad</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            {client.city || '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Estado</dt>
                                        <dd className="mt-1 text-sm sm:col-span-2">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {client.status === 'active' ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={route('clients.index')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    <FaArrowLeft className="h-5 w-5" />
                                    <span>Volver</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
