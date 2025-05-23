import { Link, Head } from '@inertiajs/react';
import { FaWhatsapp, FaInstagram, FaBox, FaHeart, FaStar } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
// Import custom styles
import '@/../../resources/css/swiper-custom.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Dulces Sueños - Almohadas y Edredones" />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                {/* Barra de navegación */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex-shrink-0 flex items-center">
                                <img src="/images/suenos-oriente-logo.png" alt="Sueños Oriente" className="h-16 w-auto" />
                            </div>
                            <div className="sm:flex sm:space-x-8 items-center">
                                <a href="#productos" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Productos</a>
                                <a href="#contacto" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Contacto</a>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className="block">Dulces Sueños</span>
                                        <span className="block text-indigo-600">para toda la familia</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Descubre nuestra línea premium de almohadas y rellenos, diseñados para brindarte el mejor descanso y la mayor comodidad.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a href="#productos" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                                Ver Productos
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a href="#contacto" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                                Contactar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="flex items-center justify-center h-full mt-12 sm:mt-14 md:mt-16">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true
                                }}
                                modules={[Autoplay, Pagination]}
                                className="h-16 w-full sm:h-20 md:h-24 lg:w-[30%] lg:h-[20%]"
                            >
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-contain rounded-lg" 
                                        src="images/pillow-1.jpg" 
                                        alt="Almohada premium" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-contain rounded-lg" 
                                        src="images/pillow-2.jpg" 
                                        alt="Almohada de plumas" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-contain rounded-lg" 
                                        src="images/pillow-3.jpg" 
                                        alt="Almohada ortopédica" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-contain rounded-lg" 
                                        src="images/pillow-4.jpg" 
                                        alt="Almohada de memory foam" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-contain rounded-lg" 
                                        src="images/pillow-5.jpg" 
                                        alt="Almohada especial" 
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* Características */}
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Características</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                La mejor calidad para tu hogar
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <FaBox className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Materiales Premium</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Utilizamos los mejores materiales para garantizar la durabilidad y comodidad de nuestros productos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <FaHeart className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Diseño con Amor</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Cada producto está diseñado pensando en tu confort y el de tu familia.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            <FaStar className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Calidad Garantizada</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Todos nuestros productos pasan por rigurosos controles de calidad.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Contacto */}
                <footer className="bg-gray-800" id="contacto">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
                                <p className="text-gray-300 mb-4">¿Tienes alguna pregunta? No dudes en contactarnos.</p>
                                <div className="flex space-x-6">
                                    <a href="https://wa.me/1234567890" className="text-gray-400 hover:text-white">
                                        <FaWhatsapp className="h-6 w-6" />
                                    </a>
                                    <a href="https://instagram.com/dulcessuenos" className="text-gray-400 hover:text-white">
                                        <FaInstagram className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0">
                                <h2 className="text-2xl font-bold text-white mb-4">Horario de Atención</h2>
                                <p className="text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-300">Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-700 pt-8">
                            <p className="text-base text-gray-400 text-center">
                                &copy; 2024 Dulces Sueños. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
