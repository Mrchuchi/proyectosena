import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import { FaSearch, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Index({ auth, recipes, filters = {}, flash = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: '¡Éxito!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                customClass: {
                    container: 'font-sans'
                }
            });
        }
    }, [flash.success]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        router.get(route('recipes.index'), { search: term }, { preserveState: true });
    };

    const handleDelete = (recipe) => {
        Swal.fire({
            title: '¿Eliminar receta?',
            text: `¿Estás seguro de que deseas eliminar la receta "${recipe.name}"? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('recipes.destroy', recipe.id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Receta eliminada!',
                            text: `La receta "${recipe.name}" ha sido eliminada exitosamente.`,
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            customClass: {
                                container: 'font-sans'
                            }
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error al eliminar',
                            text: `No se pudo eliminar la receta "${recipe.name}". Por favor intente nuevamente.`,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Entendido',
                            customClass: {
                                container: 'font-sans'
                            }
                        });
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recetas</h2>}
        >
            <Head title="Recetas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center w-1/3">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaSearch className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                            placeholder="Buscar recetas..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                                
                                <Link
                                    href={route('recipes.create')}
                                    className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md"
                                >
                                    Nueva Receta
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Código
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Producto
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Materiales
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.isArray(recipes) && recipes.map((recipe) => (
                                            <tr key={recipe.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {recipe.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {recipe.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {recipe.product?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {recipe.rawMaterials?.length || 0} materiales
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        recipe.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {recipe.status === 'active' ? 'Activa' : 'Inactiva'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            href={route('recipes.show', recipe.id)}
                                                            className="text-secondary hover:text-secondary/80"
                                                            title="Ver detalles"
                                                        >
                                                            <FaEye className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('recipes.edit', recipe.id)}
                                                            className="text-primary-light hover:text-primary-light/80"
                                                            title="Editar"
                                                        >
                                                            <FaEdit className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(recipe)}
                                                            className="text-red-600 hover:text-red-700"
                                                            title="Eliminar"
                                                        >
                                                            <FaTrash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!recipes || recipes.length === 0) && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    No hay recetas registradas
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