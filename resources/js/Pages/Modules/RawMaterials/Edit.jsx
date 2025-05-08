import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import MaterialForm from './Partials/MaterialForm';

export default function Edit({ auth, material }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Materia Prima</h2>}
        >
            <Head title="Editar Materia Prima" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Editar Material</h3>
                                <Link
                                    href={route('raw-materials.index')}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Volver
                                </Link>
                            </div>
                            <MaterialForm material={material} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}