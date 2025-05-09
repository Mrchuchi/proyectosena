import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import debounce from 'lodash/debounce';

export default function Index({ auth, clients = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = debounce((query) => {
        router.get(route('clients.index'), { search: query }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, 300);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        debouncedSearch(query);
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            router.delete(route('clients.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
        >
            <Head title="Clientes" />            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center flex-1 gap-4">
                                    <h3 className="text-lg font-medium">Lista de Clientes</h3>
                                    <div className="flex-1 max-w-md">
                                        <input
                                            type="text"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="Buscar por código, nombre, documento o email..."
                                            value={search}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                                <Link
                                    href={route('clients.create')}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                                >
                                    Nuevo Cliente
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {clients.map((client) => (
                                            <tr key={client.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {client.document_type && client.document_number ? 
                                                        `${client.document_type} ${client.document_number}` : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.email || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.phone || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{client.city || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {client.status === 'active' ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            href={route('clients.show', client.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Ver
                                                        </Link>
                                                        <Link
                                                            href={route('clients.edit', client.id)}
                                                            className="text-yellow-600 hover:text-yellow-900"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(client.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {clients.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                                    No hay clientes registrados
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}