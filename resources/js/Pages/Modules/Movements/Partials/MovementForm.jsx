import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

export default function MovementForm({ onSuccess, products, clients, rawMaterials }) {
    const [selectedItemType, setSelectedItemType] = useState('product');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        type: 'entrada',
        item_type: 'product',
        item_id: '',
        quantity: '',
        reason: '',
        client_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        clearErrors();

        post(route('movements.store', {
            item_type: data.item_type,
            item_id: data.item_id
        }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                if (page?.props?.flash?.success && page?.props?.flash?.newMovement) {
                    onSuccess?.(page.props.flash.newMovement);
                }
                reset();
            },
            onError: () => {
                // Los errores se manejan automáticamente por el formulario
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleItemTypeChange = (e) => {
        const type = e.target.value;
        setSelectedItemType(type);
        setData(data => ({
            ...data,
            item_type: type,
            item_id: ''
        }));
    };

    const isDisabled = processing || isSubmitting;

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Movimiento</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="item_type" className="block text-sm font-medium text-gray-700">Tipo de Ítem</label>
                            <select
                                id="item_type"
                                name="item_type"
                                value={data.item_type}
                                onChange={handleItemTypeChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isDisabled}
                                required
                            >
                                <option value="product">Producto</option>
                                <option value="raw_material">Materia Prima</option>
                            </select>
                            {errors.item_type && <p className="mt-1 text-sm text-red-600">{errors.item_type}</p>}
                        </div>

                        <div>
                            <label htmlFor="item_id" className="block text-sm font-medium text-gray-700">
                                {data.item_type === 'product' ? 'Producto' : 'Materia Prima'}
                            </label>
                            <select
                                id="item_id"
                                name="item_id"
                                value={data.item_id}
                                onChange={e => setData('item_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isDisabled}
                                required
                            >
                                <option value="">Seleccione un {data.item_type === 'product' ? 'producto' : 'materia prima'}</option>
                                {data.item_type === 'product' ? (
                                    products.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.code} - {item.name} (Stock: {item.current_stock})
                                        </option>
                                    ))
                                ) : (
                                    rawMaterials.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.code} - {item.name} (Stock: {item.current_stock})
                                        </option>
                                    ))
                                )}
                            </select>
                            {errors.item_id && <p className="mt-1 text-sm text-red-600">{errors.item_id}</p>}
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
                            <select
                                id="type"
                                name="type"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isDisabled}
                                required
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
                                    disabled={isDisabled}
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
                                disabled={isDisabled}
                                required
                                min="0.01"
                                step="0.01"
                            />
                            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo</label>
                            <input
                                type="text"
                                id="reason"
                                name="reason"
                                value={data.reason}
                                onChange={e => setData('reason', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isDisabled}
                                required
                            />
                            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={`w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        <FaSave className="h-5 w-5" />
                        <span>
                            {isDisabled ? 'Guardando...' : 'Guardar'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
