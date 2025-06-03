import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { FaSearch, FaEdit, FaEye, FaTrash } from 'react-icons/fa';

export default function Index({ auth, materials, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(route('raw-materials.index'), { search: query }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        debouncedSearch(query);
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este material?')) {
            router.delete(route('raw-materials.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Materia Prima</h2>}
        >
            <Head title="Materia Prima" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center flex-1 gap-4">
                                    <h3 className="text-lg font-medium text-gray-700">Lista de Materias Primas</h3>
                                    <div className="flex-1 max-w-md">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 pr-10"
                                                placeholder="Buscar por código, nombre, descripción o proveedor..."
                                                value={search}
                                                onChange={handleSearchChange}
                                            />
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <FaSearch className="text-gray-400" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={route('raw-materials.create')}
                                    className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md"
                                >
                                    Nuevo Material
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {materials?.map((material) => (
                                            <tr key={material.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className={`${material.current_stock <= material.min_stock ? 'text-red-600 font-semibold' : ''}`}>
                                                        {material.current_stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.unit_measure}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${material.unit_price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        material.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {material.status === 'active' ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('raw-materials.show', material.id)}
                                                            className="text-secondary hover:text-secondary/80"
                                                            title="Ver detalles"
                                                        >
                                                            <FaEye className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('raw-materials.edit', material.id)}
                                                            className="text-primary-light hover:text-primary-light/80"
                                                            title="Editar"
                                                        >
                                                            <FaEdit className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(material.id)}
                                                            className="text-red-600 hover:text-red-700"
                                                            title="Eliminar"
                                                        >
                                                            <FaTrash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {materials?.length === 0 && (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No se encontraron materiales
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