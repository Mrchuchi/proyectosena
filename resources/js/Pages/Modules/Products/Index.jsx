import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { FaSearch, FaEdit, FaEye, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Index({ auth, products = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(route('products.index'), { search: query }, {
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
        Swal.fire({
            title: '¿Eliminar producto?',
            text: '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('products.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Producto eliminado!',
                            text: 'El producto ha sido eliminado exitosamente.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Aceptar',
                            customClass: {
                                container: 'font-sans'
                            }
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo eliminar el producto. Por favor intente nuevamente.',
                            icon: 'error',
                            confirmButtonColor: '#3085d6', 
                            confirmButtonText: 'Aceptar',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Productos</h2>}
        >
            <Head title="Productos" />

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center flex-1 gap-4">
                                    <h3 className="text-lg font-medium">Lista de Productos</h3>
                                    <div className="flex-1 max-w-md">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 pr-10"
                                                placeholder="Buscar por código, nombre, descripción o categoría..."
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
                                    href={route('products.create')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md"
                                >
                                    <FaPlus className="h-5 w-5" />
                                    <span>Nuevo Producto</span>
                                </Link>
                            </div>

                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="text-xs sm:text-sm">
                                            <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Código</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products?.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{product.code}</td>
                                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{product.name}</td>
                                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{product.category}</td>
                                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{product.size}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`text-sm ${product.current_stock <= product.min_stock ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                                        {product.current_stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {product.status === 'active' ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={route('products.show', product.id)}
                                                            className="text-secondary hover:text-secondary/80"
                                                            title="Ver detalles"
                                                        >
                                                            <FaEye className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="text-primary-light hover:text-primary-light/80"
                                                            title="Editar"
                                                        >
                                                            <FaEdit className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-700"
                                                            title="Eliminar"
                                                        >
                                                            <FaTrash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {products?.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No se encontraron productos
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