import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MovementForm from './Partials/MovementForm';
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        setMovements(initialMovements);
    }, [initialMovements]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        router.get(route('movements.index'), filters, {
            preserveState: true,
            preserveScroll: true,
            only: ['movements']
        });
    };

    const handleNewMovement = (newMovement) => {
        if (shouldIncludeMovement(newMovement)) {
            setMovements(prev => ({
                ...prev,
                data: [newMovement, ...prev.data].slice(0, prev.per_page)
            }));
        }
    };

    const shouldIncludeMovement = (movement) => {        // Check if the movement matches current filters
        if (filters.type && movement.type !== filters.type) return false;
        if (filters.item_type && movement.item_type.toLowerCase() !== filters.item_type) return false;
        if (filters.item_id && movement.item?.id != filters.item_id) return false;
        if (filters.date_from && new Date(movement.date) < new Date(filters.date_from)) return false;
        if (filters.date_to && new Date(movement.date) > new Date(filters.date_to)) return false;        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesItem = movement.item &&
                (movement.item.name.toLowerCase().includes(searchLower) ||
                 movement.item.code.toLowerCase().includes(searchLower));
            if (!matchesItem) return false;
        }
        return true;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entradas/Salidas</h2>}
        >
            <Head title="Entradas/Salidas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Formulario de Registro */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Registrar Nuevo Movimiento</h3>
                            <MovementForm 
                                products={products} 
                                clients={clients}
                                rawMaterials={rawMaterials}
                                onSuccess={handleNewMovement}
                            />
                        </div>
                    </div>

                    {/* Filtros de Búsqueda */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
                            </div>
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <select
                                        name="item_type"
                                        className="rounded-md w-full border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
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
                                        className="rounded-md w-full border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
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
                                    className="rounded-md w-full border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                />

                                <select
                                    name="type"
                                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los tipos</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="salida">Salida</option>
                                </select>

                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        name="date_from"
                                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={filters.date_from}
                                        onChange={handleFilterChange}
                                    />
                                    <input
                                        type="date"
                                        name="date_to"
                                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={filters.date_to}
                                        onChange={handleFilterChange}
                                    />
                                </div>

                                <div className="md:col-span-5 flex justify-end">
                                    <button
                                        onClick={applyFilters}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md transition-colors duration-200"
                                    >
                                        Aplicar Filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
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
                                            <tr key={movement.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {movement.item?.code}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {movement.item?.name}
                                                    </div>
                                                    <div className="text-xs text-primary-light">
                                                        {movement.item_type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        movement.type === 'entrada'
                                                            ? 'bg-green-100 text-green-800'
                                                            : movement.type === 'salida'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {movement.type === 'entrada' ? 'Entrada' : movement.type === 'salida' ? 'Salida' : movement.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {movement.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movement.previous_stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                                        {movements.data.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                                    No hay movimientos registrados
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            {movements.links && (
                                <div className="mt-4">
                                    <nav className="flex items-center justify-between">
                                        <div className="flex-1 flex justify-between">
                                            {movements.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                                                        link.active
                                                            ? 'bg-primary text-white'
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