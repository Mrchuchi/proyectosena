import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function InventoryMovements({ auth, movements, filters }) {
    const [showAdjustModal, setShowAdjustModal] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        quantity: '',
        type: 'entrada',
        reason: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('inventory.adjust', selectedMaterial.id), {
            onSuccess: () => {
                reset();
                setShowAdjustModal(false);
            },
        });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'entrada':
                return 'text-green-600 bg-green-100';
            case 'salida':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-blue-600 bg-blue-100';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movimientos de Inventario</h2>}
        >
            <Head title="Movimientos de Inventario" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar</label>
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        value={filters.search || ''}
                                        onChange={(e) => window.location.href = route('inventory.movements', { ...filters, search: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Código o nombre..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={filters.type || ''}
                                        onChange={(e) => window.location.href = route('inventory.movements', { ...filters, type: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Todos</option>
                                        <option value="entrada">Entrada</option>
                                        <option value="salida">Salida</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date_from" className="block text-sm font-medium text-gray-700">Desde</label>
                                    <input
                                        type="date"
                                        name="date_from"
                                        id="date_from"
                                        value={filters.date_from || ''}
                                        onChange={(e) => window.location.href = route('inventory.movements', { ...filters, date_from: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date_to" className="block text-sm font-medium text-gray-700">Hasta</label>
                                    <input
                                        type="date"
                                        name="date_to"
                                        id="date_to"
                                        value={filters.date_to || ''}
                                        onChange={(e) => window.location.href = route('inventory.movements', { ...filters, date_to: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Movements Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Anterior</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Nuevo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {movements.data.map((movement) => (
                                            <tr key={movement.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{movement.material.code}</div>
                                                    <div className="text-sm text-gray-500">{movement.material.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(movement.type)}`}>
                                                        {movement.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.previous_stock}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.new_stock}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.reason}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.user}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ajustar stock */}
            {showAdjustModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Ajustar Stock</h3>
                                            <div className="mt-2">
                                                <div className="mb-4">
                                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
                                                    <select
                                                        id="type"
                                                        name="type"
                                                        value={data.type}
                                                        onChange={e => setData('type', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option value="entrada">Entrada</option>
                                                        <option value="salida">Salida</option>
                                                    </select>
                                                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        name="quantity"
                                                        value={data.quantity}
                                                        onChange={e => setData('quantity', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                    {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo</label>
                                                    <textarea
                                                        id="reason"
                                                        name="reason"
                                                        value={data.reason}
                                                        onChange={e => setData('reason', e.target.value)}
                                                        rows="3"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    ></textarea>
                                                    {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Ajustar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAdjustModal(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
