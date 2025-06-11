import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaEdit, FaEye, FaPlay, FaCheck } from 'react-icons/fa';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, orders = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('production.index'), { search: value, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        router.get(route('production.index'), { search, status: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };    const validateMaterials = (order) => {
        if (!order.recipe || !order.recipe.rawMaterials) {
            console.error('La orden no tiene receta o materiales:', order);
            return { valid: false, insufficientMaterials: [] };
        }

        const insufficientMaterials = order.recipe.rawMaterials.filter(material => {
            const required = material.pivot.quantity * order.quantity;
            return material.current_stock < required;
        });

        return {
            valid: insufficientMaterials.length === 0,
            insufficientMaterials
        };
    };
    
    const handleStart = (order) => {
        const { valid, insufficientMaterials } = validateMaterials(order);

        if (!valid) {
            const materialsList = insufficientMaterials.map(material => {
                const required = material.pivot.quantity * order.quantity;
                const missing = required - material.current_stock;
                return `<li class="mb-2">
                    <span class="font-medium text-gray-900">${material.name}</span>
                    <div class="text-sm mt-1">
                        <div>Necesario: <span class="font-medium">${required} ${material.unit_measure}</span></div>
                        <div>Stock actual: <span class="font-medium">${material.current_stock} ${material.unit_measure}</span></div>
                        <div class="text-red-600 font-medium">Faltante: ${missing} ${material.unit_measure}</div>
                    </div>
                </li>`;
            }).join('');
            
            Swal.fire({
                title: 'Stock Insuficiente',
                html: `
                    <div class="text-left">
                        <p class="mb-4">No hay suficientes materias primas para iniciar esta producción:</p>
                        <ul class="list-none">
                            ${materialsList}
                        </ul>
                        <p class="mt-4 text-sm text-gray-600">Por favor, verifica el stock de materias primas antes de continuar.</p>
                    </div>
                `,
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#3085d6',
                customClass: {
                    container: 'font-sans',
                    htmlContainer: 'break-words'
                }
            });
            return;
        }

        Swal.fire({
            title: '¿Iniciar producción?',
            html: `
                <div class="text-left">
                    <p>¿Estás seguro de que deseas iniciar esta orden de producción?</p>
                    <p class="mt-2 text-sm text-gray-600">
                        Se descontarán los materiales del inventario al iniciar la producción.
                    </p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, iniciar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('production.start', order.id), {}, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Producción iniciada!',
                            text: 'La orden de producción se ha iniciado exitosamente.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            customClass: { container: 'font-sans' }
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo iniciar la orden de producción. Por favor, intenta de nuevo.',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            customClass: { container: 'font-sans' }
                        });
                    }
                });
            }
        });
    };

    const handleComplete = (orderId) => {
        Swal.fire({
            title: '¿Completar producción?',
            html: `
                <div class="text-left">
                    <p>¿Estás seguro de que deseas completar esta orden de producción?</p>
                    <p class="mt-2 text-sm text-gray-600">
                        El producto terminado se agregará al inventario al completar la producción.
                    </p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, completar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('production.complete', orderId), {}, {
                    onSuccess: () => {
                        Swal.fire({
                            title: '¡Producción completada!',
                            text: 'La orden de producción se ha completado exitosamente.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            customClass: { container: 'font-sans' }
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo completar la orden de producción. Por favor, intenta de nuevo.',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            customClass: { container: 'font-sans' }
                        });
                    }
                });
            }
        });
    };

    const statusColors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'in_progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        'pending': 'Pendiente',
        'in_progress': 'En Progreso',
        'completed': 'Completada',
        'cancelled': 'Cancelada',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Órdenes de Producción</h2>}
        >
            <Head title="Órdenes de Producción" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex-1 flex items-center space-x-4">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <FaSearch />
                                </span>
                                <TextInput
                                    type="text"
                                    name="search"
                                    value={search}
                                    className="rounded-none rounded-r-md focus:border-primary focus:ring focus:ring-primary/20"
                                    placeholder="Buscar por código o producto..."
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <select
                                value={status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                            >
                                <option value="">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="in_progress">En Progreso</option>
                                <option value="completed">Completada</option>
                                <option value="cancelled">Cancelada</option>
                            </select>
                        </div>
                        <Link
                            href={route('production.create')}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                        >
                            Nueva Orden
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Planificada</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.data && orders.data.map((order) => (                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.planned_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                                            {statusLabels[order.status]}
                                        </span>
                                    </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('production.show', order.id)}
                                                            className="text-secondary hover:text-secondary/80"
                                                        >
                                                            <FaEye className="h-5 w-5" />
                                                        </Link>
                                                        {order.status === 'pending' && (
                                                            <button
                                                                onClick={() => handleStart(order)}
                                                                className="text-primary-light hover:text-primary-light/80"
                                                            >
                                                                <FaPlay className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                        {order.status === 'in_progress' && (
                                                            <button
                                                                onClick={() => handleComplete(order.id)}
                                                                className="text-primary hover:text-primary/80"
                                                            >
                                                                <FaCheck className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!orders.data || orders.data.length === 0) && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    No hay órdenes de producción registradas
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
