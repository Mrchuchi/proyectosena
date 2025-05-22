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
            <div>
                <InputLabel htmlFor="code" value="Código" />
                <TextInput
                    id="code"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    required
                    disabled={client.id}
                />
                <InputError message={errors.code} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="name" value="Nombre" />
                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="document_type" value="Tipo de Documento" />
                    <select
                        id="document_type"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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

                <div>
                    <InputLabel htmlFor="document_number" value="Número de Documento" />
                    <TextInput
                        id="document_number"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.document_number}
                        onChange={(e) => setData('document_number', e.target.value)}
                    />
                    <InputError message={errors.document_number} className="mt-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Teléfono" />
                    <TextInput
                        id="phone"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="address" value="Dirección" />
                <TextInput
                    id="address"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                />
                <InputError message={errors.address} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="city" value="Ciudad" />
                <TextInput
                    id="city"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                />
                <InputError message={errors.city} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="status" value="Estado" />
                <select
                    id="status"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    required
                >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                </select>
                <InputError message={errors.status} className="mt-2" />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Link
                    href={route('clients.index')}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                    <FaArrowLeft className="h-5 w-5" />
                    <span>Volver</span>
                </Link>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                    disabled={processing}
                >
                    <FaSave className="h-5 w-5" />
                    <span>{client.id ? 'Actualizar Cliente' : 'Crear Cliente'}</span>
                </button>
            </div>
        </form>
    );
}
