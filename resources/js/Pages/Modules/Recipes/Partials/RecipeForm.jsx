import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function RecipeForm({ recipe, nextCode, products, rawMaterials }) {
    const initialMaterials = recipe?.rawMaterials?.map(material => ({
        id: material.id,
        name: material.name,
        unit_measure: material.unit_measure,
        quantity: material.pivot.quantity
    })) || [];

    const { data, setData, post, put, processing, errors } = useForm({
        code: recipe?.code || nextCode || '',
        name: recipe?.name || '',
        description: recipe?.description || '',
        product_id: recipe?.product_id || '',
        status: recipe?.status || 'active',
        materials: initialMaterials
    });

    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [materialQuantity, setMaterialQuantity] = useState('');
    const [existingMaterials, setExistingMaterials] = useState(initialMaterials);

    useEffect(() => {
        console.log('Recipe data:', recipe);
        console.log('Current form data:', data);
    }, []);

    const addMaterial = () => {
        if (!selectedMaterial || !materialQuantity) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor selecciona una materia prima y especifica la cantidad',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido',
                customClass: {
                    container: 'font-sans'
                }
            });
            return;
        }

        const material = rawMaterials.find(m => m.id.toString() === selectedMaterial);
        
        if (parseFloat(materialQuantity) <= 0) {
            Swal.fire({
                title: 'Cantidad inválida',
                text: 'La cantidad debe ser mayor que cero',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido',
                customClass: {
                    container: 'font-sans'
                }
            });
            return;
        }

        const newMaterial = {
            id: parseInt(selectedMaterial),
            name: material.name,
            unit_measure: material.unit_measure,
            quantity: parseFloat(materialQuantity)
        };

        const updatedMaterials = [...data.materials, newMaterial];
        setData('materials', updatedMaterials);
        setExistingMaterials(updatedMaterials);
        setSelectedMaterial('');
        setMaterialQuantity('');

        Swal.fire({
            title: '¡Materia prima agregada!',
            text: `Se ha agregado ${material.name} a la receta`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                container: 'font-sans'
            }
        });
    };

    const removeMaterial = (materialId, materialName) => {
        Swal.fire({
            title: '¿Eliminar materia prima?',
            text: `¿Estás seguro de que deseas eliminar ${materialName} de la receta?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedMaterials = data.materials.filter(m => m.id !== materialId);
                setData('materials', updatedMaterials);
                setExistingMaterials(updatedMaterials);
                
                Swal.fire({
                    title: '¡Eliminada!',
                    text: `La materia prima "${materialName}" ha sido eliminada de la receta.`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    customClass: {
                        container: 'font-sans'
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.materials.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'Debe agregar al menos una materia prima a la receta',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        const formattedData = {
            ...data,
            materials: data.materials.map(m => ({
                id: m.id,
                quantity: m.quantity
            }))
        };

        Swal.fire({
            title: recipe ? '¿Actualizar receta?' : '¿Crear receta?',
            text: recipe ? 
                '¿Estás seguro de que deseas actualizar esta receta?' : 
                '¿Estás seguro de que deseas crear esta nueva receta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: recipe ? 'Sí, actualizar' : 'Sí, crear',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (recipe) {
                    put(route('recipes.update', recipe.id), formattedData, {
                        onSuccess: () => {
                            Swal.fire({
                                title: '¡Receta actualizada!',
                                text: `La receta "${data.name}" ha sido actualizada exitosamente con ${data.materials.length} materias primas.`,
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                customClass: {
                                    container: 'font-sans'
                                }
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                title: 'Error al actualizar',
                                text: 'No se pudo actualizar la receta. Por favor verifica los datos e intenta nuevamente.',
                                icon: 'error',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Entendido',
                                customClass: {
                                    container: 'font-sans'
                                }
                            });
                        }
                    });
                } else {
                    post(route('recipes.store'), formattedData, {
                        onSuccess: () => {
                            Swal.fire({
                                title: '¡Receta creada!',
                                text: `La receta "${data.name}" ha sido creada exitosamente con ${data.materials.length} materias primas.`,
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                customClass: {
                                    container: 'font-sans'
                                }
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                title: 'Error al crear',
                                text: 'No se pudo crear la receta. Por favor verifica los datos e intenta nuevamente.',
                                icon: 'error',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Entendido',
                                customClass: {
                                    container: 'font-sans'
                                }
                            });
                        }
                    });
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código de la receta */}
                <div>
                    <InputLabel htmlFor="code" value="Código" />
                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.code}
                        disabled={recipe ? true : false}
                        onChange={(e) => setData('code', e.target.value)}
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                {/* Nombre de la receta */}
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                    <InputLabel htmlFor="description" value="Descripción" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="3"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Producto */}
                <div>
                    <InputLabel htmlFor="product_id" value="Producto" />
                    <select
                        id="product_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        value={data.product_id}
                        onChange={(e) => setData('product_id', e.target.value)}
                    >
                        <option value="">Seleccionar producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.product_id} className="mt-2" />
                </div>

                {/* Estado */}
                <div>
                    <InputLabel htmlFor="status" value="Estado" />
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </div>

            {/* Materias Primas */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Materias Primas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <select
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                        >
                            <option value="">Seleccionar materia prima</option>
                            {rawMaterials.map((material) => (
                                <option 
                                    key={material.id} 
                                    value={material.id}
                                    disabled={data.materials.some(m => m.id === material.id)}
                                >
                                    {material.name} ({material.unit_measure})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <TextInput
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="Cantidad"
                            className="w-full"
                            value={materialQuantity}
                            onChange={(e) => setMaterialQuantity(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md w-full justify-center"
                            onClick={addMaterial}
                        >
                            <FaPlus className="mr-2" />
                            Agregar
                        </button>
                    </div>
                </div>

                {/* Lista de materias primas */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Materia Prima
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unidad
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.materials.map((material, index) => (
                                <tr key={material.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {material.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {material.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {material.unit_measure}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            type="button"
                                            onClick={() => removeMaterial(material.id, material.name)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.materials.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay materias primas agregadas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4">
                <Link
                    href={route('recipes.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition ease-in-out duration-150"
                >
                    <FaArrowLeft className="mr-2" />
                    Volver
                </Link>

                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition ease-in-out duration-150"
                    disabled={processing}
                >
                    <FaSave className="mr-2" />
                    {recipe ? 'Actualizar' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}