import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function Inventory({ auth, products, rawMaterials, stats, filters }) {
    const [activeTab, setActiveTab] = useState('products');
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [showLowStock, setShowLowStock] = useState(filters?.lowStock || false);
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    const debouncedSearch = debounce((value) => {
        router.get(route('inventory.index'), {
            search: value,
            lowStock: showLowStock,
            status: statusFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    useEffect(() => {
        router.get(route('inventory.index'), {
            search: searchTerm,
            lowStock: showLowStock,
            status: statusFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [showLowStock, statusFilter]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario</h2>}
        >
            <Head title="Inventario" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Valor Total</h3>
                            <p className="mt-2 text-3xl font-bold text-green-600">{formatCurrency(stats.total_value)}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Productos Bajos</h3>
                            <p className="mt-2 text-3xl font-bold text-amber-600">{stats.low_stock_items}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Productos</h3>
                            <p className="mt-2 text-3xl font-bold text-blue-600">{stats.total_products}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900">Total Materias</h3>
                            <p className="mt-2 text-3xl font-bold text-purple-600">{stats.total_materials}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Resumen de Inventario</h2>
                        <Link
                            href={route('inventory.movements')}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                        >
                            Ver Movimientos
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por código o nombre..."
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex gap-4">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="active">Activos</option>
                                    <option value="inactive">Inactivos</option>
                                </select>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={showLowStock}
                                        onChange={(e) => setShowLowStock(e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Solo stock bajo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`${
                                        activeTab === 'products'
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Productos ({products.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('materials')}
                                    className={`${
                                        activeTab === 'materials'
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Materias Primas ({rawMaterials.length})
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Tables */}
                    {activeTab === 'products' ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.code}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${product.is_low_stock ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                                        {product.current_stock}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.min_stock}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(product.price)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(product.total_value)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {product.status === 'active' ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Materias Primas</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {rawMaterials.map((material) => (
                                                <tr key={material.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.code}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.name}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${material.is_low_stock ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                                        {material.current_stock}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.min_stock}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.unit_measure}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(material.unit_price)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(material.total_value)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            material.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {material.status === 'active' ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}