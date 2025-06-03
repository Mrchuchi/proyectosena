import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import UserList from './Partials/UserList';
import RoleList from './Partials/RoleList';
import { classNames } from '@/utils';

export default function Users({ auth, users, roles, permissions }) {
    const [activeTab, setActiveTab] = useState('users');
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Users component props:', { users, roles, permissions });
        
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
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-4 px-6 py-4" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={classNames(
                                        activeTab === 'users'
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50',
                                        'px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ease-in-out flex items-center gap-2'
                                    )}
                                >
                                    <span>Usuarios</span>
                                    <span className={classNames(
                                        activeTab === 'users' 
                                            ? 'bg-white/20' 
                                            : 'bg-gray-100 text-gray-600',
                                        'text-xs py-0.5 px-2.5 rounded-full font-semibold'
                                    )}>
                                        {users.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('roles')}
                                    className={classNames(
                                        activeTab === 'roles'
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50',
                                        'px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ease-in-out flex items-center gap-2'
                                    )}
                                >
                                    <span>Roles y Permisos</span>
                                    <span className={classNames(
                                        activeTab === 'roles' 
                                            ? 'bg-white/20' 
                                            : 'bg-gray-100 text-gray-600',
                                        'text-xs py-0.5 px-2.5 rounded-full font-semibold'
                                    )}>
                                        {roles.length}
                                    </span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                        <div className="p-6">
                            {activeTab === 'users' ? (
                                <UserList users={users} roles={roles} />
                            ) : (
                                <RoleList roles={roles} permissions={permissions} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}