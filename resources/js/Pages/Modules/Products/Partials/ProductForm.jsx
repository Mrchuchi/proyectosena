import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ProductForm({ product, nextCode }) {
    const { data, setData, post, put, processing, errors } = useForm({
        code: nextCode || product?.code || '',
        name: product?.name || '',
        description: product?.description || '',
        size: product?.size || '',
        category: product?.category || '',
        price: product?.price || '',
        min_stock: product?.min_stock || 0,
        current_stock: product?.current_stock || 0,
        status: product?.status || 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: product ? '¿Actualizar producto?' : '¿Crear producto?',
            text: product ? 
                '¿Estás seguro de que deseas actualizar este producto?' : 
                '¿Estás seguro de que deseas crear este nuevo producto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: product ? 'Sí, actualizar' : 'Sí, crear',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'font-sans'
            }
        }).then((result) => {                if (result.isConfirmed) {
                    if (product) {
                        put(route('products.update', product.id), {
                            onSuccess: () => {
                                Swal.fire({
                                    title: '¡Producto actualizado!',
                                    text: 'El producto ha sido actualizado exitosamente.',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
                                    customClass: {
                                        container: 'font-sans'
                                    }
                                });
                            },
                            onError: () => {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Ha ocurrido un error. Por favor revise los datos e intente nuevamente.',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
                                    customClass: {
                                        container: 'font-sans'
                                    }
                                });
                            }
                        });
                    } else {
                        post(route('products.store'), {
                            onSuccess: () => {
                                Swal.fire({
                                    title: '¡Producto creado!',
                                    text: 'El producto ha sido creado exitosamente.',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
                                    customClass: {
                                        container: 'font-sans'
                                    }
                                });
                            },
                            onError: () => {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Ha ocurrido un error. Por favor revise los datos e intente nuevamente.',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Aceptar',
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
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código *</label>
                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 bg-gray-100"
                        value={data.code}
                        disabled={true}
                        required
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre *</label>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Nombre del producto"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">Tamaño *</label>
                    <select
                        id="size"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.size}
                        onChange={(e) => setData('size', e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tamaño</option>
                        <option value="50x50">50 x 50</option>
                        <option value="45x45">45 x 45</option>
                        <option value="50x70">50 x 70</option>
                        <option value="45x65">45 x 65</option>
                        <option value="1mx50">1m x 50</option>
                    </select>
                    <InputError message={errors.size} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría *</label>
                    <select
                        id="category"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="Almohada">Almohada</option>
                        <option value="Relleno">Relleno</option>
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="min_stock" className="block text-sm font-medium text-gray-700">Stock Mínimo *</label>
                    <TextInput
                        id="min_stock"
                        type="number"
                        className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.min_stock}
                        onChange={(e) => setData('min_stock', e.target.value)}
                        required
                        min="0"
                    />
                    <InputError message={errors.min_stock} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="current_stock" className="block text-sm font-medium text-gray-700">Stock Actual *</label>
                    <TextInput
                        id="current_stock"
                        type="number"
                        className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.current_stock}
                        onChange={(e) => setData('current_stock', e.target.value)}
                        required
                        min="0"
                    />
                    <InputError message={errors.current_stock} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio *</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            $
                        </span>
                        <TextInput
                            id="price"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full pl-7 border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado *</label>
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        required
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="3"
                        placeholder="Descripción detallada del producto"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Link
                    href={route('products.index')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                    <FaArrowLeft className="h-5 w-5" />
                    <span>Volver</span>
                </Link>
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md"
                    disabled={processing}
                >
                    <FaSave className="h-5 w-5" />
                    <span>{processing ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}</span>
                </button>
            </div>
        </form>
    );
}