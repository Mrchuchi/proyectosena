import { useEffect, useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import GuestLayout from '@/Layouts/GuestLayout';

export default function VerifyCode({ email, status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        email: email
    });

    const [focusedInput, setFocusedInput] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.verify-code'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar Código - Esencial Hogar" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full"
                        >
                            <FaShieldAlt className="w-8 h-8" />
                        </motion.div>
                        <div className="ml-4 text-left">
                            <h2 className="text-2xl font-bold text-primary">Verificación de Código</h2>
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mt-1">
                                {email}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Hemos enviado un código de verificación a tu correo electrónico. 
                        Por favor, revisa tu bandeja de entrada.
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
                    className="w-full max-w-xl mx-auto"
                >
                    <div className="relative mb-4">
                        <TextInput
                            id="code"
                            type="text"
                            name="code"
                            value={data.code}
                            maxLength="6"
                            className={`mt-1 block w-full text-center text-3xl tracking-[1em] py-3 font-mono
                                ${focusedInput ? 'ring-2 ring-primary border-primary' : ''}
                                transition-all duration-200`}
                            isFocused={true}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setData('code', value);
                            }}
                            onFocus={() => setFocusedInput(true)}
                            onBlur={() => setFocusedInput(false)}
                            placeholder="······"
                        />
                        
                        <div className="absolute inset-x-0 -bottom-2 flex justify-center space-x-2">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-1 rounded-full transition-all duration-200 ${
                                        i < (data.code?.length || 0)
                                            ? 'bg-primary'
                                            : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>

                        <InputError message={errors.code} className="mt-4 text-center" />
                    </div>

                    <div className="flex items-center justify-between mt-6 gap-4">
                        <Link
                            href={route('password.request')}
                            className="flex items-center justify-center text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                        >
                            <FaArrowLeft className="mr-2" />
                            Solicitar nuevo código
                        </Link>

                        <PrimaryButton
                            className="flex-1 justify-center py-3 bg-primary hover:bg-primary-dark transition-all duration-200"
                            disabled={processing || data.code.length !== 6}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Verificando...
                                </span>
                            ) : (
                                'Verificar'
                            )}
                        </PrimaryButton>
                    </div>
                </motion.form>
            </motion.div>
        </GuestLayout>
    );
}
