import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaBoxes, FaIndustry, FaExclamationTriangle, FaDollarSign } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(amount);
};

export default function Dashboard({ auth, stats, lowStockMaterials, pendingOrders, inProgressOrders, topProducts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inicio</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Estadísticas Principales */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="group bg-secondary overflow-hidden shadow-lg rounded-lg p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                                    <FaDollarSign className="h-8 w-8 text-white transform transition-transform group-hover:rotate-12" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-white/80">Valor Total Inventario</p>
                                    <p className="text-2xl font-semibold text-white">{formatCurrency(stats.totalValue)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-primary overflow-hidden shadow-lg rounded-lg p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                                    <FaBoxes className="h-8 w-8 text-white transform transition-transform group-hover:rotate-12" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-white/80">Total Productos</p>
                                    <p className="text-2xl font-semibold text-white">{stats.totalProducts}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-amber-500 overflow-hidden shadow-lg rounded-lg p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                                    <FaIndustry className="h-8 w-8 text-white transform transition-transform group-hover:rotate-12" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-white/80">Total Materiales</p>
                                    <p className="text-2xl font-semibold text-white">{stats.totalMaterials}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-red-600 overflow-hidden shadow-lg rounded-lg p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                                    <FaExclamationTriangle className="h-8 w-8 text-white transform transition-transform group-hover:rotate-12" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-white/80">Materiales Bajos</p>
                                    <p className="text-2xl font-semibold text-white">{stats.lowStockCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Materiales con Bajo Stock */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Materiales con Bajo Stock
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Actual</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Mínimo</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {lowStockMaterials.map((material) => (
                                                <tr key={material.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {material.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                                                        {material.current_stock} {material.unit_measure}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {material.min_stock} {material.unit_measure}
                                                    </td>
                                                </tr>
                                            ))}
                                            {lowStockMaterials.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                        No hay materiales con bajo stock
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Órdenes de Producción Activas */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Órdenes de Producción Activas
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {[...inProgressOrders, ...pendingOrders].map((order) => (
                                                <tr key={order.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {order.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.product.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            order.status === 'in_progress' 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {order.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {inProgressOrders.length === 0 && pendingOrders.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                        No hay órdenes de producción activas
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Productos Principales */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg lg:col-span-2">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Productos Principales
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Actual</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Mínimo</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {topProducts.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {product.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {product.name}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                                                        product.current_stock <= product.min_stock 
                                                            ? 'text-red-600 font-semibold' 
                                                            : 'text-gray-900'
                                                    }`}>
                                                        {product.current_stock}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {product.min_stock}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(product.price)}
                                                    </td>
                                                </tr>
                                            ))}
                                            {topProducts.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                        No hay productos registrados
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
            </div>
        </AuthenticatedLayout>
    );
}
