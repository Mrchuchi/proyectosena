import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export default function ClientForm({ client = {}, onSubmit }) {
    const { data, setData, processing, errors } = useForm({
        code: client.code || '',
        name: client.name || '',
        document_type: client.document_type || '',
        document_number: client.document_number || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        status: client.status || 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código *</label>
                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        required
                        disabled={client.id}
                    />
                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre *</label>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Nombre completo del cliente"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                    <select
                        id="document_type"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.document_type}
                        onChange={(e) => setData('document_type', e.target.value)}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="NIT">NIT</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PP">Pasaporte</option>
                    </select>
                    <InputError message={errors.document_type} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="document_number" className="block text-sm font-medium text-gray-700">Número de Documento</label>
                    <TextInput
                        id="document_number"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.document_number}
                        onChange={(e) => setData('document_number', e.target.value)}
                        placeholder="Número de identificación"
                    />
                    <InputError message={errors.document_number} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="correo@ejemplo.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <TextInput
                        id="phone"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="Número de teléfono"
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Dirección completa"
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <TextInput
                        id="city"
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        placeholder="Ciudad"
                    />
                    <InputError message={errors.city} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado *</label>
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
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <Link
                    href={route('clients.index')}
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
                    <span>{processing ? 'Guardando...' : client.id ? 'Actualizar' : 'Crear'}</span>
                </button>
            </div>
        </form>
    );
}
