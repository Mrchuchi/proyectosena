import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaSpinner, FaArrowLeft } from 'react-icons/fa';

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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="mb-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#004d99]/10 text-[#004d99] rounded-full"
                    >
                        <FaEnvelope className="w-8 h-8" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-[#004d99] mb-2">¿Olvidaste tu contraseña?</h2>
                    <p className="text-gray-600 text-sm px-4">
                        No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para que puedas crear una nueva contraseña.
                    </p>
                </div>

                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center"
                    >
                        {status}
                    </motion.div>
                )}

                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <div>
                        <InputLabel htmlFor="email" value="Correo Electrónico" className="text-[#004d99]" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full transition-all duration-200 focus:ring-2 focus:ring-[#004d99]"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center pt-2">
                        <Link
                            href={route('login')}
                            className="flex items-center justify-center text-sm text-gray-600 hover:text-[#004d99] transition-colors duration-200"
                        >
                            <FaArrowLeft className="mr-2" />
                            Volver al inicio de sesión
                        </Link>

                        <PrimaryButton
                            className="w-full sm:w-auto justify-center py-3 px-6 bg-[#004d99] hover:bg-[#0066cc] transition-all duration-200"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Enviando...
                                </span>
                            ) : (
                                'Enviar enlace'
                            )}
                        </PrimaryButton>
                    </div>
                </motion.form>
            </motion.div>
        </GuestLayout>
    );
}
