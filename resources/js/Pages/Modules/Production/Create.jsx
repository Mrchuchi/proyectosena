import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Create({ auth, nextCode, products, recipes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: nextCode,
        product_id: '',
        recipe_id: '',
        quantity: '',
        planned_date: '',
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('production.store'));
    };

    // Filtrar recetas cuando se selecciona un producto
    const filteredRecipes = products && data.product_id
        ? recipes.filter(recipe => recipe.product_id === parseInt(data.product_id))
        : [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Orden de Producción</h2>}
        >
            <Head title="Nueva Orden de Producción" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-medium text-gray-700">Nueva Orden de Producción</h3>
                                        <a
                                            href={route('production.index')}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                                        >
                                            Volver
                                        </a>
                                    </div>
                                    <form onSubmit={submit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div>
                                        <InputLabel htmlFor="code" value="Código" className="block text-sm font-medium text-gray-700" />
                                        <TextInput
                                            id="code"
                                            type="text"
                                            name="code"
                                            value={data.code}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            autoComplete="off"
                                            onChange={(e) => setData('code', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.code} className="mt-2" />
                                    </div>                                <div>
                                        <InputLabel htmlFor="product_id" value="Producto" className="block text-sm font-medium text-gray-700" />
                                        <select
                                            name="product_id"
                                            id="product_id"
                                            value={data.product_id}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            onChange={(e) => {
                                                setData('product_id', e.target.value);
                                                setData('recipe_id', ''); // Reset recipe when product changes
                                            }}
                                            required
                                        >
                                            <option value="">Seleccione un producto</option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.product_id} className="mt-2" />
                                    </div>                                    <div>
                                        <InputLabel htmlFor="recipe_id" value="Receta" className="block text-sm font-medium text-gray-700" />
                                        <select
                                            name="recipe_id"
                                            id="recipe_id"
                                            value={data.recipe_id}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            onChange={(e) => setData('recipe_id', e.target.value)}
                                            required
                                            disabled={!data.product_id}
                                        >
                                            <option value="">Seleccione una receta</option>
                                            {filteredRecipes.map((recipe) => (
                                                <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.recipe_id} className="mt-2" />
                                    </div>                                    <div>
                                        <InputLabel htmlFor="quantity" value="Cantidad" className="block text-sm font-medium text-gray-700" />
                                        <TextInput
                                            id="quantity"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            name="quantity"
                                            value={data.quantity}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            autoComplete="off"
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.quantity} className="mt-2" />
                                    </div>                                    <div>
                                        <InputLabel htmlFor="planned_date" value="Fecha Planificada" className="block text-sm font-medium text-gray-700" />
                                        <TextInput
                                            id="planned_date"
                                            type="date"
                                            name="planned_date"
                                            value={data.planned_date}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            onChange={(e) => setData('planned_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.planned_date} className="mt-2" />
                                    </div>
                                </div>                                <div className="mt-6">
                                    <InputLabel htmlFor="notes" value="Notas" className="block text-sm font-medium text-gray-700" />
                                    <textarea
                                        name="notes"
                                        id="notes"
                                        value={data.notes}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        rows="4"
                                        onChange={(e) => setData('notes', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>                                        <div className="mt-6 flex justify-end space-x-4">
                                            <a
                                                href={route('production.index')}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                                            >
                                                <FaTimes className="h-5 w-5" />
                                                <span>Cancelar</span>
                                            </a>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md"
                                                disabled={processing}
                                            >
                                                <FaSave className="h-5 w-5" />
                                                <span>Crear Orden</span>
                                            </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
