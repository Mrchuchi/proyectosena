import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="code" value="Código" />
                                        <TextInput
                                            id="code"
                                            type="text"
                                            name="code"
                                            value={data.code}
                                            className="mt-1 block w-full"
                                            autoComplete="off"
                                            onChange={(e) => setData('code', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.code} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="product_id" value="Producto" />
                                        <select
                                            name="product_id"
                                            id="product_id"
                                            value={data.product_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="recipe_id" value="Receta" />
                                        <select
                                            name="recipe_id"
                                            id="recipe_id"
                                            value={data.recipe_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="quantity" value="Cantidad" />
                                        <TextInput
                                            id="quantity"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            name="quantity"
                                            value={data.quantity}
                                            className="mt-1 block w-full"
                                            autoComplete="off"
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.quantity} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="planned_date" value="Fecha Planificada" />
                                        <TextInput
                                            id="planned_date"
                                            type="date"
                                            name="planned_date"
                                            value={data.planned_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('planned_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.planned_date} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <InputLabel htmlFor="notes" value="Notas" />
                                    <textarea
                                        name="notes"
                                        id="notes"
                                        value={data.notes}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        onChange={(e) => setData('notes', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <a
                                        href={route('production.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancelar
                                    </a>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        disabled={processing}
                                    >
                                        Crear Orden
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
