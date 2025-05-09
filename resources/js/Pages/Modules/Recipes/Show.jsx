import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, recipe }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ver Receta</h2>}
        >
            <Head title="Ver Receta" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <Link
                                    href={route('recipes.index')}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Volver
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Información General</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Código:</label>
                                            <p className="mt-1">{recipe.code}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                                            <p className="mt-1">{recipe.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Producto:</label>
                                            <p className="mt-1">{recipe.product.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Estado:</label>
                                            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                recipe.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {recipe.status === 'active' ? 'Activa' : 'Inactiva'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Materias Primas</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Material
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Cantidad
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {recipe.rawMaterials.map((material) => (
                                                    <tr key={material.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {material.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {material.pivot.quantity} {material.unit_measure}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {recipe.rawMaterials.length === 0 && (
                                                    <tr>
                                                        <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                                            No hay materias primas registradas
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {recipe.notes && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Notas</h3>
                                    <p className="whitespace-pre-line">{recipe.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}