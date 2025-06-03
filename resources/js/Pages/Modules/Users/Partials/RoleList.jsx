import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function RoleList({ roles, permissions = {} }) {
    const [editingRole, setEditingRole] = useState(null);
    const [error, setError] = useState(null);
    const { data, setData, reset, processing } = useForm({
        name: '',
        description: '',
        permissions: []
    });

    const groupedPermissions = permissions || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (editingRole) {
                await axios.put(`/roles/${editingRole.id}/permissions`, data);
            } else {
                await axios.post('/roles', data);
            }

            setEditingRole(null);
            reset();
            router.reload();
        } catch (err) {
            setError(err.response?.data?.error || 'Ha ocurrido un error');
        }
    };

    const handleDelete = async (roleId) => {
        if (!confirm('¿Está seguro de que desea eliminar este rol?')) {
            return;
        }

        try {
            await axios.delete(`/roles/${roleId}`);
            router.reload();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al eliminar el rol');
        }
    };

    // Ordenar los permisos dentro de cada módulo por nombre
    Object.keys(groupedPermissions).forEach(module => {
        if (Array.isArray(groupedPermissions[module])) {
            groupedPermissions[module].sort((a, b) => a.name.localeCompare(b.name));
        }
    });

    if (!roles || !Object.keys(groupedPermissions).length) {
        return (
            <div className="p-4">
                <p className="text-gray-500">No hay roles o permisos disponibles</p>
            </div>
        );
    }

    return (
        <div>
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {editingRole ? 'Editar Rol' : 'Nuevo Rol'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 sm:text-sm"
                                    required
                                />
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-base font-medium text-gray-900 mb-4">Permisos</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Object.entries(groupedPermissions).map(([module, perms]) => (
                                    <div key={module} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                        <h5 className="text-sm font-medium text-gray-900 mb-4 capitalize">
                                            {module.replace('_', ' ')}
                                        </h5>
                                        <div className="space-y-3">
                                            {perms.map(permission => (
                                                <label key={permission.id} className="flex items-start space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.permissions.includes(permission.id)}
                                                        onChange={e => {
                                                            const value = permission.id;
                                                            setData('permissions', 
                                                                e.target.checked
                                                                    ? [...data.permissions, value]
                                                                    : data.permissions.filter(id => id !== value)
                                                            );
                                                        }}
                                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                                                    />
                                                    <span className="text-sm text-gray-700">{permission.description}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            {editingRole && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingRole(null);
                                        reset();
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20"
                                >
                                    <FaTimes className="w-5 h-5" />
                                    <span>Cancelar</span>
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md transition"
                            >
                                <FaSave className="w-5 h-5" />
                                <span>{processing ? 'Guardando...' : editingRole ? 'Actualizar' : 'Crear'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Lista de Roles</h3>
                </div>
                <div className="overflow-x-auto">
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
                                <tr key={role.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{role.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                            {role.permissions?.length || 0} permisos
                                        </span>
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
                                                className="text-primary-light hover:text-primary-light/80 transition"
                                                title="Editar rol"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(role.id)}
                                                className="text-red-600 hover:text-red-700 transition"
                                                title="Eliminar rol"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {roles.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay roles registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
