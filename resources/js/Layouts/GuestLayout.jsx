import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-b from-indigo-50 via-gray-50 to-gray-100">
            <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
                <Link href="/" className="inline-block">
                    <ApplicationLogo className="w-64 h-auto fill-current" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-8 py-8 bg-white shadow-xl overflow-hidden sm:rounded-xl transition-all duration-300 hover:shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
                {children}
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} Esencial Hogar. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}
