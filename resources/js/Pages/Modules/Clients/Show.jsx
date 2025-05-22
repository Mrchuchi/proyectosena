import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
                                <h3 className="text-lg font-medium">Información del Cliente</h3>
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('clients.edit', client.id)}
                                        className="text-yellow-600 hover:text-yellow-900"
                                    >
                                        <FaEdit className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                    <Link
                                        href={route('clients.index')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <FaArrowLeft className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Código</p>
                                    <p className="mt-1">{client.code}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                                    <p className="mt-1">{client.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tipo de Documento</p>
                                    <p className="mt-1">{client.document_type || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Número de Documento</p>
                                    <p className="mt-1">{client.document_number || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                                    <p className="mt-1">{client.email || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                    <p className="mt-1">{client.phone || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Dirección</p>
                                    <p className="mt-1">{client.address || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Ciudad</p>
                                    <p className="mt-1">{client.city || '-'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Estado</p>
                                    <p className="mt-1">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {client.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Fecha de Registro</p>
                                    <p className="mt-1">{new Date(client.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={route('clients.index')}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    ← Volver a la lista de clientes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
