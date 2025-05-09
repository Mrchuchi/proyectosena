import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function RecipeForm({ recipe, nextCode, products, rawMaterials }) {
    const { data, setData, post, put, processing, errors } = useForm({
        code: nextCode || recipe?.code || '',
        name: recipe?.name || '',
        description: recipe?.description || '',
        product_id: recipe?.product_id || '',
        status: recipe?.status || 'active',
        materials: recipe?.rawMaterials?.map(material => ({
            id: material.id,
            quantity: material.pivot.quantity
        })) || []
    });

    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [materialQuantity, setMaterialQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (recipe) {
            put(route('recipes.update', recipe.id));
        } else {
            post(route('recipes.store'));
        }
    };

    const addMaterial = () => {
        if (!selectedMaterial || !materialQuantity || materialQuantity <= 0) return;

        const materialExists = data.materials.some(m => m.id === parseInt(selectedMaterial));
        if (materialExists) {
            alert('Este material ya está en la receta');
            return;
        }

        setData('materials', [
            ...data.materials,
            { id: parseInt(selectedMaterial), quantity: parseFloat(materialQuantity) }
        ]);

        setSelectedMaterial('');
        setMaterialQuantity('');
    };

    const removeMaterial = (materialId) => {
        setData('materials', data.materials.filter(m => m.id !== materialId));
    };

    const getMaterialInfo = (materialId) => {
        return rawMaterials.find(m => m.id === materialId);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código y Nombre */}
                <div className="space-y-2">
                    <InputLabel htmlFor="code" value="Código *" className="text-gray-700" />
                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100"
                        value={data.code}
                        disabled={true}
                        required
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="name" value="Nombre *" className="text-gray-700" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Nombre de la receta"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Producto y Estado */}
                <div className="space-y-2">
                    <InputLabel htmlFor="product_id" value="Producto *" className="text-gray-700" />
                    <select
                        id="product_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.product_id}
                        onChange={(e) => setData('product_id', e.target.value)}
                        required
                    >
                        <option value="">Seleccione un producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.product_id} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="status" value="Estado *" className="text-gray-700" />
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        required
                    >
                        <option value="active">Activa</option>
                        <option value="inactive">Inactiva</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                {/* Descripción */}
                <div className="space-y-2 md:col-span-2">
                    <InputLabel htmlFor="description" value="Descripción" className="text-gray-700" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="3"
                        placeholder="Descripción detallada de la receta"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
            </div>

            {/* Materiales */}
            <div className="mt-6 space-y-4">
                <h4 className="text-lg font-medium text-gray-700">Materiales</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                        >
                            <option value="">Seleccione un material</option>
                            {rawMaterials.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <TextInput
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full"
                            placeholder="Cantidad"
                            value={materialQuantity}
                            onChange={(e) => setMaterialQuantity(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={addMaterial}
                            className="mt-1 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Agregar Material
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    {errors.materials && <InputError message={errors.materials} className="mt-2" />}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.materials.map((material, index) => {
                                const materialInfo = getMaterialInfo(material.id);
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{materialInfo?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{material.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{materialInfo?.unit_measure}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => removeMaterial(material.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {data.materials.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No hay materiales agregados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Link
                    href={route('recipes.index')}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Guardando...' : recipe ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
}