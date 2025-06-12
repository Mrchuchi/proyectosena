import { useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function VerifyCode({ email, status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        email: email
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.verify-code'));
    };

    return (
        <>
            <Head title="Verificar Código" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        Hemos enviado un código de verificación a tu correo electrónico. Por favor, ingrésalo a continuación para continuar con el proceso de recuperación de contraseña.
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <TextInput
                                id="code"
                                type="text"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="Ingresa el código de 6 dígitos"
                            />

                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                Verificar Código
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
