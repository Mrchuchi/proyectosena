import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RecipeForm from './Partials/RecipeForm';

export default function Edit({ auth, recipe, products, rawMaterials }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Receta</h2>}
        >
            <Head title="Editar Receta" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <RecipeForm
                            recipe={recipe}
                            products={products}
                            rawMaterials={rawMaterials}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}