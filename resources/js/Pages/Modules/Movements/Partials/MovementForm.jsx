import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function MovementForm({ onSuccess }) {
    const [products, setProducts] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        material_type: 'product', // 'product' or 'raw-material'
        product_id: '',
        raw_material_id: '',
        quantity: '',
        type: 'entrada',
        reason: '',
        client_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, rawMaterialsResponse, clientsResponse] = await Promise.all([
                    axios.get(route('api.products')),
                    axios.get(route('api.raw-materials')),
                    axios.get(route('api.clients'))
                ]);
                setProducts(productsResponse.data);
                setRawMaterials(rawMaterialsResponse.data);
                setClients(clientsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);    const handleSubmit = (e) => {
        e.preventDefault();
        const id = data.material_type === 'product' ? data.product_id : data.raw_material_id;
        const route_name = data.material_type === 'product' ? 'movements.store' : 'inventory.movements.store';
        
        post(route(route_name, id), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
                <div className="p-6">                    <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Movimiento</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="material_type" className="block text-sm font-medium text-gray-700">Tipo de Material</label>
                            <select
                                id="material_type"
                                name="material_type"
                                value={data.material_type}
                                onChange={e => {
                                    setData(data => ({
                                        ...data,
                                        material_type: e.target.value,
                                        product_id: '',
                                        raw_material_id: ''
                                    }));
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="product">Producto</option>
                                <option value="raw-material">Materia Prima</option>
                            </select>
                        </div>

                        {data.material_type === 'product' && (
                            <div>
                                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Producto</label>
                                <select
                                    id="product_id"
                                    name="product_id"
                                    value={data.product_id}
                                    onChange={e => setData('product_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required={data.material_type === 'product'}
                                >
                                    <option value="">Seleccione un producto</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.code} - {product.name} (Stock: {product.current_stock})
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && <p className="mt-1 text-sm text-red-600">{errors.product_id}</p>}
                            </div>
                        )}

                        {data.material_type === 'raw-material' && (
                            <div>
                                <label htmlFor="raw_material_id" className="block text-sm font-medium text-gray-700">Materia Prima</label>
                                <select
                                    id="raw_material_id"
                                    name="raw_material_id"
                                    value={data.raw_material_id}
                                    onChange={e => setData('raw_material_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required={data.material_type === 'raw-material'}
                                >
                                    <option value="">Seleccione una materia prima</option>
                                    {rawMaterials.map(material => (
                                        <option key={material.id} value={material.id}>
                                            {material.code} - {material.name} (Stock: {material.current_stock} {material.unit_measure})
                                        </option>
                                    ))}
                                </select>
                                {errors.raw_material_id && <p className="mt-1 text-sm text-red-600">{errors.raw_material_id}</p>}
                            </div>
                        )}

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
                            <select
                                id="type"
                                name="type"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        {data.type === 'salida' && (
                            <div>
                                <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Cliente</label>
                                <select
                                    id="client_id"
                                    name="client_id"
                                    value={data.client_id}
                                    onChange={e => setData('client_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required={data.type === 'salida'}
                                >
                                    <option value="">Seleccione un cliente</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.name} - {client.document_number}
                                        </option>
                                    ))}
                                </select>
                                {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
                            </div>
                        )}

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={data.quantity}
                                onChange={e => setData('quantity', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                min="0.01"
                                step="0.01"
                                required
                            />
                            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={data.reason}
                                onChange={e => setData('reason', e.target.value)}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            ></textarea>
                            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 text-right">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {processing ? 'Registrando...' : 'Registrar Movimiento'}
                    </button>
                </div>
            </form>
        </div>
    );
}
