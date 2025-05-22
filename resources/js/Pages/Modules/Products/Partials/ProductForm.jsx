import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

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
        if (product) {
            put(route('products.update', product.id));
        } else {
            post(route('products.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
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
                        placeholder="Nombre del producto"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Tamaño y Categoría */}
                <div className="space-y-2">
                    <InputLabel htmlFor="size" value="Tamaño *" className="text-gray-700" />
                    <select
                        id="size"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    <InputLabel htmlFor="category" value="Categoría *" className="text-gray-700" />
                    <select
                        id="category"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

                {/* Stock y Precio */}
                <div className="space-y-2">
                    <InputLabel htmlFor="min_stock" value="Stock Mínimo *" className="text-gray-700" />
                    <TextInput
                        id="min_stock"
                        type="number"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.min_stock}
                        onChange={(e) => setData('min_stock', e.target.value)}
                        required
                        min="0"
                    />
                    <InputError message={errors.min_stock} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="current_stock" value="Stock Actual *" className="text-gray-700" />
                    <TextInput
                        id="current_stock"
                        type="number"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.current_stock}
                        onChange={(e) => setData('current_stock', e.target.value)}
                        required
                        min="0"
                    />
                    <InputError message={errors.current_stock} className="mt-2" />
                </div>

                {/* Precio y Estado */}
                <div className="space-y-2">
                    <InputLabel htmlFor="price" value="Precio *" className="text-gray-700" />
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            $
                        </span>
                        <TextInput
                            id="price"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full pl-7 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <InputError message={errors.price} className="mt-2" />
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
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
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
                        placeholder="Descripción detallada del producto"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Link
                    href={route('products.index')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    <FaArrowLeft className="h-5 w-5" />
                    <span>Volver</span>
                </Link>
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={processing}
                >
                    <FaSave className="h-5 w-5" />
                    <span>{processing ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}</span>
                </button>
            </div>
        </form>
    );
}