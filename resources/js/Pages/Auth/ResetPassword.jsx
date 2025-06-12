import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaLock, FaSpinner, FaArrowLeft } from 'react-icons/fa';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Restablecer Contraseña - Esencial Hogar" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="mb-6 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#004d99]/10 text-[#004d99] rounded-full"
                    >
                        <FaLock className="w-8 h-8" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-[#004d99] mb-2">Nueva Contraseña</h2>
                    <p className="text-gray-600 text-sm px-4">
                        Ingresa y confirma tu nueva contraseña para restablecer el acceso a tu cuenta
                    </p>
                </div>

                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="email" value="Correo Electrónico" className="text-[#004d99]" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-50/80"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                            disabled
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Nueva Contraseña" className="text-[#004d99]" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full transition-all duration-200 focus:ring-2 focus:ring-[#004d99]"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmar Nueva Contraseña" className="text-[#004d99]" />
                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full transition-all duration-200 focus:ring-2 focus:ring-[#004d99]"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="md:col-span-2 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:space-x-4 pt-2">
                        <Link
                            href={route('login')}
                            className="flex items-center justify-center text-sm text-gray-600 hover:text-[#004d99] transition-colors duration-200"
                        >
                            <FaArrowLeft className="mr-2" />
                            Volver al inicio de sesión
                        </Link>

                        <PrimaryButton
                            className="justify-center py-3 px-6 transition-all duration-200 hover:bg-[#0066cc] bg-[#004d99]"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Guardando...
                                </span>
                            ) : (
                                'Guardar nueva contraseña'
                            )}
                        </PrimaryButton>
                    </div>
                </motion.form>
            </motion.div>
        </GuestLayout>
    );
}
