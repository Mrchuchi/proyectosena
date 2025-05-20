import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovementForm({ onSuccess }) {
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: '',
        quantity: '',
        type: 'entrada',
        reason: '',
        client_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, clientsResponse] = await Promise.all([
                    axios.get(route('api.products')),
                    axios.get(route('api.clients'))
                ]);
                setProducts(productsResponse.data);
                setClients(clientsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('movements.store', data.product_id), {
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
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Movimiento</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Producto</label>
                            <select
                                id="product_id"
                                name="product_id"
                                value={data.product_id}
                                onChange={e => setData('product_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
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
