import { Link, Head } from '@inertiajs/react';
import { FaWhatsapp, FaInstagram, FaBox, FaHeart, FaStar, FaCheckCircle, FaUserFriends, FaRecycle, FaMedal } from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AnimateOnScroll from '@/Components/AnimateOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTransition } from '@/Components/TransitionProvider';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import '@/../../resources/css/swiper-custom.css';
import '@/../../resources/css/animations.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { setDirection } = useTransition();

    const handleAuthClick = () => {
        setDirection('forward');
    };

    return (
        <>
            <Head title="Esencial Hogar - Calidez en tu vida" />
            
            <div className="min-h-screen bg-gradient-to-b from-white to-primary-light">
                {/* Barra de navegación */}
                <nav className="bg-primary/80 shadow-lg">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                        <div className="flex justify-between h-20">
                            <div className="flex-shrink-0 flex items-center">
                                <ApplicationLogo className="h-16 w-auto" />
                            </div>
                            <div className="sm:flex sm:space-x-8 items-center">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="auth-button inline-flex items-center bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        onClick={handleAuthClick}
                                        className="auth-button inline-flex items-center bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
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
                    <div className="max-w-[1600px] mx-auto">
                        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-3xl lg:w-full lg:pb-28 xl:pb-32">
                            <main className="mt-6 mx-auto max-w-[1600px] px-4 sm:mt-8 sm:px-6 md:mt-12 lg:mt-16 lg:px-8 2xl:px-16 xl:mt-20">
                                <AnimateOnScroll animation="fade-right">
                                    <div className="sm:text-center lg:text-left">
                                        <h1 className="mb-4">
                                            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">Bienvenidos a</span>
                                            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary">Esencial Hogar</span>
                                        </h1>
                                        <AnimateOnScroll animation="fade-up" className="delay-200">
                                            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                                Creamos productos para el hogar que elevan tu comodidad al siguiente nivel. Descubre nuestra línea premium diseñada para brindarte el mejor confort.
                                            </p>
                                        </AnimateOnScroll>
                                        <AnimateOnScroll animation="fade-up" className="delay-300">
                                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                                <div className="rounded-md shadow">
                                                    <a href="#contacto" className="w-full flex items-center justify-center px-8 py-3 border border-secondary text-base font-medium rounded-md text-white bg-secondary hover:bg-white hover:text-secondary transition-colors md:py-4 md:text-lg md:px-10">
                                                        Contactar
                                                    </a>
                                                </div>
                                            </div>
                                        </AnimateOnScroll>
                                    </div>
                                </AnimateOnScroll>
                            </main>
                        </div>
                    </div>
                    <AnimateOnScroll animation="fade-left" className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
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
                    </AnimateOnScroll>
                </div>

                {/* Por qué elegirnos */}
                <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimateOnScroll animation="fade-down">
                            <div className="text-center mb-12">
                                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">Nuestra Diferencia</span>
                                <h2 className="mb-4">
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">¿Por qué deberías</span>
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary">elegirnos?</span>
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto text-lg">Nos destacamos por ofrecer productos de la más alta calidad, comprometidos con tu comodidad y satisfacción.</p>
                            </div>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            <div className="absolute inset-0 bg-primary/5 transform -skew-y-6 rounded-3xl"></div>
                            <AnimateOnScroll animation="fade-up" className="delay-100">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <MdHighQuality className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Calidad Premium</h3>
                                    <p className="text-gray-600">Los mejores materiales seleccionados para asegurar máxima calidad.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="fade-up" className="delay-200">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <FaUserFriends className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Atención Personalizada</h3>
                                    <p className="text-gray-600">Equipo dedicado a brindarte la mejor asesoría y servicio.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="fade-up" className="delay-300">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <FaRecycle className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sostenibilidad</h3>
                                    <p className="text-gray-600">Comprometidos con el medio ambiente en cada producto.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="fade-up" className="delay-400">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <FaMedal className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Experiencia</h3>
                                    <p className="text-gray-600">Años de trayectoria respaldando cada producto.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* Nuestras Marcas */}
                <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50/50">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimateOnScroll animation="fade-down">
                            <div className="text-center mb-12">
                                <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">Confían en Nosotros</span>
                                <h2 className="mb-4">
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">Fabricamos para las</span>
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary">Mejores Marcas</span>
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto text-lg">Fabricamos productos de la más alta calidad para las marcas más reconocidas del mercado</p>
                            </div>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 items-center justify-items-center">
                            <AnimateOnScroll animation="zoom-in" className="w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/spring.png" alt="Spring" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-100 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/ikea.png" alt="IKEA" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-200 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/homecenter.png" alt="HomeCenter" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-300 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/fatelares.png" alt="Fatelares" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-400 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/Falabella.png" alt="Falabella" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-500 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/exito.png" alt="Éxito" className="max-h-36 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-600 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/dollarcity.png" alt="Dollar City" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-700 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/distrihogar.png" alt="Distrihogar" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-800 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/d1.png" alt="D1" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll animation="zoom-in" className="delay-900 w-full">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center h-32">
                                    <img src="/images/brands/Comodisimos.png" alt="Comodísimos" className="max-h-28 w-auto object-contain" />
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* Características */}
                <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50/50 to-white">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimateOnScroll animation="fade-down">
                            <div className="text-center mb-12">
                                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">Nuestros Productos</span>
                                <h2 className="mb-4">
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">Lo que nos hace</span>
                                    <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary">Diferentes</span>
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto text-lg">La mejor calidad y confort para tu hogar, respaldados por nuestra experiencia y dedicación</p>
                            </div>
                        </AnimateOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            <div className="absolute inset-0 bg-secondary/5 transform -skew-y-6 rounded-3xl"></div>
                            <AnimateOnScroll animation="fade-up" className="delay-100">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full mb-4">
                                        <FaBox className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Materiales Premium</h3>
                                    <p className="text-gray-600">Utilizamos los mejores materiales para garantizar la durabilidad y comodidad de nuestros productos.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fade-up" className="delay-200">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full mb-4">
                                        <FaHeart className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Diseño con Amor</h3>
                                    <p className="text-gray-600">Cada producto está diseñado pensando en tu comodidad, con atención especial a cada detalle para asegurar tu satisfacción.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fade-up" className="delay-300">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full mb-4">
                                        <FaStar className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Calidad Garantizada</h3>
                                    <p className="text-gray-600">Todos nuestros productos pasan por rigurosos controles de calidad para asegurar tu completa satisfacción.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fade-up" className="delay-400">
                                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10 h-full">
                                    <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full mb-4">
                                        <FaCheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Confort Asegurado</h3>
                                    <p className="text-gray-600">Cada producto está probado para garantizar el máximo nivel de comodidad y durabilidad para tu hogar.</p>
                                    <div className="absolute inset-0 border-2 border-transparent hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

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
