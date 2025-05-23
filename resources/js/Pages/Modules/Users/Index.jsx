import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import UserList from './Partials/UserList';
import RoleList from './Partials/RoleList';

export default function Users({ auth, users, roles }) {
    const [activeTab, setActiveTab] = useState('users');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Validar que tenemos todas las props necesarias
        if (!users || !roles) {
            console.error('Missing required props:', { users, roles });
            setError('Error: Faltan datos necesarios');
            return;
        }

        // Validar la estructura de los datos
        if (!Array.isArray(users) || !Array.isArray(roles)) {
            console.error('Invalid data structure:', { users, roles });
            setError('Error: Estructura de datos inválida');
            return;
        }

        setError(null);
    }, [users, roles]);

    if (error) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Error</h2>}
            >
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Usuarios</h2>}
        >
            <Head title="Gestión de Usuarios" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="mb-4 border-b border-gray-200">
                        <nav className="-mb-px flex" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`${
                                    activeTab === 'users'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                            >
                                Usuarios
                            </button>
                            <button
                                onClick={() => setActiveTab('roles')}
                                className={`${
                                    activeTab === 'roles'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                            >
                                Roles y Permisos
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {activeTab === 'users' ? (
                                <UserList users={users} roles={roles} />
                            ) : (
                                <RoleList roles={roles} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}