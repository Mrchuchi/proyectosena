import { Link, Head } from '@inertiajs/react';
import { FaWhatsapp, FaInstagram, FaBox, FaHeart, FaStar } from 'react-icons/fa';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import '@/../../resources/css/swiper-custom.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Esencial Hogar - Calidez en tu vida" />
            
            <div className="min-h-screen bg-gradient-to-b from-white to-primary-light/5">
                {/* Barra de navegación */}
                <nav className="bg-primary/80 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex-shrink-0 flex items-center">
                                <ApplicationLogo className="h-14 w-auto" />
                            </div>
                            <div className="sm:flex sm:space-x-8 items-center">
                                <a href="#productos" className="text-primary-light hover:text-white px-3 py-2 text-sm font-medium transition-colors">Productos</a>
                                <a href="#contacto" className="text-primary-light hover:text-white px-3 py-2 text-sm font-medium transition-colors">Contacto</a>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative bg-transparent overflow-hidden mt-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 md:mt-12 lg:mt-16 lg:px-8 xl:mt-20">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
                                        <span className="block">Calidez y Confort</span>
                                        <span className="block text-secondary">para tu Hogar</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Descubre nuestra línea premium de productos para el hogar, diseñados para brindarte el mejor confort y la mayor comodidad.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a href="#productos" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors md:py-4 md:text-lg md:px-10">
                                                Ver Productos
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a href="#contacto" className="w-full flex items-center justify-center px-8 py-3 border border-secondary text-base font-medium rounded-md text-secondary hover:text-white hover:bg-secondary transition-colors md:py-4 md:text-lg md:px-10">
                                                Contactar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="flex items-center justify-center h-full mt-8 sm:mt-10 lg:mt-0">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                speed={600}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true
                                }}
                                modules={[Autoplay, Pagination]}
                                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 max-w-lg lg:max-w-xl"
                            >
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                                        src="images/pillow-1.jpg" 
                                        alt="Almohada premium" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                                        src="images/pillow-2.jpg" 
                                        alt="Almohada de plumas" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                                        src="images/pillow-3.jpg" 
                                        alt="Almohada ortopédica" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                                        src="images/pillow-4.jpg" 
                                        alt="Almohada de memory foam" 
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
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
                            <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Características</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary sm:text-4xl">
                                La mejor calidad para tu hogar
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <FaBox className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-primary">Materiales Premium</h3>
                                        <p className="mt-2 text-base text-gray-600">
                                            Utilizamos los mejores materiales para garantizar la durabilidad y comodidad de nuestros productos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <FaHeart className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-primary">Diseño con Amor</h3>
                                        <p className="mt-2 text-base text-gray-600">
                                            Cada producto está diseñado pensando en tu confort y el de tu familia.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <FaStar className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-primary">Calidad Garantizada</h3>
                                        <p className="mt-2 text-base text-gray-600">
                                            Todos nuestros productos pasan por rigurosos controles de calidad.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Contacto */}
                <footer className="bg-primary" id="contacto">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
                                <p className="text-primary-light mb-4">¿Tienes alguna pregunta? No dudes en contactarnos.</p>
                                <div className="flex space-x-6">
                                    <a href="https://wa.me/1234567890" className="text-primary-light hover:text-white transition-colors">
                                        <FaWhatsapp className="h-6 w-6" />
                                    </a>
                                    <a href="https://instagram.com/esencialhogar" className="text-primary-light hover:text-white transition-colors">
                                        <FaInstagram className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0">
                                <h2 className="text-2xl font-bold text-white mb-4">Horario de Atención</h2>
                                <p className="text-primary-light">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                <p className="text-primary-light">Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-primary-light/20 pt-8">
                            <p className="text-base text-primary-light text-center">
                                &copy; 2024 Esencial Hogar. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
