import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FaPlay, FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Show({ auth, order }) {
    useEffect(() => {
        console.log('Order data:', order);
    }, [order]);

    if (!order || !order.product || !order.recipe) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Error" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-red-600">
                                Error cargando los datos de la orden. Por favor, inténtelo de nuevo.
                            </div>
                            <div className="p-6 border-t">
                                <Link
                                    href={route('production.index')}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Volver al listado
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const handleStart = () => {
        if (window.confirm('¿Estás seguro de que deseas iniciar esta orden de producción?')) {
            router.post(route('production.start', order.id));
        }
    };

    const handleComplete = () => {
        if (window.confirm('¿Estás seguro de que deseas completar esta orden de producción?')) {
            router.post(route('production.complete', order.id));
        }
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ver Orden de Producción</h2>}
        >
            <Head title="Ver Orden de Producción" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-6">
                                <Link
                                    href={route('production.index')}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Volver
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">Información General</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Código</h4>
                                            <p className="mt-1 text-sm text-gray-900">{order.code}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Estado</h4>
                                            <p className="mt-1">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                                                    {statusLabels[order.status]}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Producto</h4>
                                            <p className="mt-1 text-sm text-gray-900">{order.product.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Receta</h4>
                                            <p className="mt-1 text-sm text-gray-900">{order.recipe.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Cantidad</h4>
                                            <p className="mt-1 text-sm text-gray-900">{order.quantity}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700">Fecha Planificada</h4>
                                            <p className="mt-1 text-sm text-gray-900">{order.planned_date}</p>
                                        </div>
                                        {order.start_date && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Fecha de Inicio</h4>
                                                <p className="mt-1 text-sm text-gray-900">{order.start_date}</p>
                                            </div>
                                        )}
                                        {order.end_date && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Fecha de Finalización</h4>
                                                <p className="mt-1 text-sm text-gray-900">{order.end_date}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">Materiales Requeridos</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad Necesaria</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {order.recipe.rawMaterials.map((material) => (
                                                    <tr key={material.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {(material.pivot.quantity * order.quantity).toFixed(2)} {material.unit_measure}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={`${material.current_stock < (material.pivot.quantity * order.quantity) ? 'text-red-600' : 'text-green-600'} font-medium`}>
                                                                {material.current_stock} {material.unit_measure}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {order.notes && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium text-gray-700 mb-4">Notas</h3>
                                            <p className="text-sm text-gray-900 whitespace-pre-line">{order.notes}</p>
                                        </div>
                                    )}

                                    {order.status === 'pending' && (
                                        <div className="mt-6">
                                            <button
                                                onClick={handleStart}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                <FaPlay className="h-5 w-5" />
                                                <span>Iniciar Producción</span>
                                            </button>
                                        </div>
                                    )}

                                    {order.status === 'in_progress' && (
                                        <div className="mt-6">
                                            <button
                                                onClick={handleComplete}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                            >
                                                <FaCheck className="h-5 w-5" />
                                                <span>Completar Producción</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
