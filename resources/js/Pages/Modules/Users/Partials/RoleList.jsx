import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

export default function RoleList({ roles, permissions = {} }) {
    const [editingRole, setEditingRole] = useState(null);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        permissions: []
    });

    // Asegurarnos de que permissions es un objeto y no undefined
    const groupedPermissions = permissions || {};

    // Ordenar los permisos dentro de cada módulo por nombre
    Object.keys(groupedPermissions).forEach(module => {
        if (Array.isArray(groupedPermissions[module])) {
            groupedPermissions[module].sort((a, b) => a.name.localeCompare(b.name));
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingRole) {
            put(route('roles.update', editingRole.id), {
                onSuccess: () => {
                    setEditingRole(null);
                    reset();
                }
            });
        } else {
            post(route('roles.store'), {
                onSuccess: () => {
                    reset();
                }
            });
        }
    };

    if (!roles || !Object.keys(groupedPermissions).length) {
        return (
            <div className="p-4">
                <p className="text-gray-500">No hay roles o permisos disponibles.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingRole ? 'Editar Rol' : 'Nuevo Rol'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre del Rol
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Permisos</h4>
                        <div className="space-y-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(groupedPermissions).map(([module, permissions]) => (
                                <div key={module} className="bg-gray-50 p-4 rounded-md">
                                    <h5 className="font-medium text-gray-700 mb-2 capitalize">{module}</h5>
                                    <div className="space-y-2">
                                        {permissions.map(permission => (
                                            <label key={permission.id} className="flex items-start">
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(permission.id)}
                                                    onChange={e => {
                                                        const value = parseInt(permission.id);
                                                        setData('permissions', e.target.checked
                                                            ? [...data.permissions, value]
                                                            : data.permissions.filter(id => id !== value)
                                                        );
                                                    }}
                                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{permission.description}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        {editingRole && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingRole(null);
                                    reset();
                                }}
                                className="inline-flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FaTimes className="w-4 h-4 mr-2" />
                                Cancelar
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaSave className="w-4 h-4 mr-2" />
                            {processing ? 'Guardando...' : editingRole ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Roles</h3>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Permisos
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roles.map((role) => (
                                <tr key={role.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{role.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">
                                            {role.permissions.length} permisos
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingRole(role);
                                                    setData({
                                                        name: role.name,
                                                        description: role.description,
                                                        permissions: role.permissions.map(p => p.id)
                                                    });
                                                }}
                                                className="text-yellow-600 hover:text-yellow-900"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('¿Está seguro de que desea eliminar este rol?')) {
                                                        router.delete(route('roles.destroy', role.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
