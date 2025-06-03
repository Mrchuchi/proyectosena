import { useForm, Link, router } from '@inertiajs/react';
import { FaUserPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useState } from 'react';

export default function UserList({ users, roles }) {
    const [error, setError] = useState(null);

    // Validate props
    if (!Array.isArray(users)) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700">Error: Los datos de usuarios no son válidos</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Lista de Usuarios</h3>
                <Link
                    href={route('users.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition shadow-sm"
                >
                    <FaUserPlus className="w-4 h-4" />
                    <span>Nuevo Usuario</span>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rol
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-primary/10 text-primary">
                                        {user.role ? user.role.name : 'Sin rol'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Link
                                            href={route('users.show', user.id)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                            title="Ver detalles"
                                        >
                                            <FaEye className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="text-primary hover:text-primary/80 transition-colors"
                                            title="Editar usuario"
                                        >
                                            <FaEdit className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
                                                    router.delete(route('users.destroy', user.id));
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                            title="Eliminar usuario"
                                        >
                                            <FaTrash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
