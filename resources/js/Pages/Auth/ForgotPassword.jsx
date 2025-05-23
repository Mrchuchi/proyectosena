import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Contraseña - Esencial Hogar" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-indigo-600 mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-gray-600 text-sm">No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para que puedas crear una nueva contraseña.</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="correo@ejemplo.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Volver al inicio de sesión
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? 'Enviando...' : 'Enviar enlace'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
