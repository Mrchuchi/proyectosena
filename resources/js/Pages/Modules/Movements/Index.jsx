import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MovementForm from './Partials/MovementForm';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Movements({ auth, movements: initialMovements, products, clients, rawMaterials }) {
    const [movements, setMovements] = useState(initialMovements);
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        date_from: '',
        date_to: '',
        item_type: '',
        item_id: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        router.get('/movements', filters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleNewMovement = (newMovement) => {
        setMovements(prev => ({
            ...prev,
            data: [newMovement, ...prev.data]
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entradas/Salidas</h2>}
        >
            <Head title="Entradas/Salidas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <MovementForm 
                                className="mb-6" 
                                products={products} 
                                clients={clients}
                                rawMaterials={rawMaterials}
                                onSuccess={handleNewMovement}
                            />
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Filters */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <select
                                        name="item_type"
                                        className="rounded-md w-full"
                                        value={filters.item_type}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Todos los items</option>
                                        <option value="product">Productos</option>
                                        <option value="raw_material">Materias Primas</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <select
                                        name="item_id"
                                        className="rounded-md w-full"
                                        value={filters.item_id}
                                        onChange={handleFilterChange}
                                        disabled={!filters.item_type}
                                    >
                                        <option value="">Seleccione un {filters.item_type === 'product' ? 'producto' : filters.item_type === 'raw_material' ? 'materia prima' : 'item'}</option>
                                        {filters.item_type === 'product' && products.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.code} - {item.name}
                                            </option>
                                        ))}
                                        {filters.item_type === 'raw_material' && rawMaterials.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.code} - {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Buscar..."
                                    className="rounded-md w-full"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                />
                                <select
                                    name="type"
                                    className="rounded-md"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los tipos</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="salida">Salida</option>
                                </select>
                                <input
                                    type="date"
                                    name="date_from"
                                    className="rounded-md"
                                    value={filters.date_from}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="date"
                                    name="date_to"
                                    className="rounded-md"
                                    value={filters.date_to}
                                    onChange={handleFilterChange}
                                />
                                <button
                                    onClick={applyFilters}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Aplicar Filtros
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tipo
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cantidad
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock Anterior
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock Nuevo
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cliente
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Usuario
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {movements.data.map((movement) => (
                                            <tr key={movement.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {movement.product.code}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {movement.product.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        movement.type === 'entrada' ? 'bg-green-100 text-green-800' :
                                                        movement.type === 'salida' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {movement.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.previous_stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.new_stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.client ? (
                                                        <div>
                                                            <div className="font-medium">{movement.client.name}</div>
                                                            <div className="text-gray-500">{movement.client.document}</div>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.user}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {movements.links && (
                                <div className="mt-4">
                                    <nav className="flex items-center justify-between">
                                        <div className="flex-1 flex justify-between">
                                            {movements.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                                                        link.active
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                    disabled={!link.url}
                                                    onClick={() => link.url && router.visit(link.url)}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}