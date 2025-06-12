import { useEffect, useRef } from 'react';

export default function AnimateOnScroll({ children, animation = 'fade-up', className = '' }) {
    const elementRef = useRef(null);    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Añadimos un pequeño retraso para que la animación sea más suave
                    if (entry.isIntersecting) {
                        requestAnimationFrame(() => {
                            entry.target.classList.add('animate');
                        });
                    } else {
                        requestAnimationFrame(() => {
                            entry.target.classList.remove('animate');
                        });
                    }
                });
            },
            {
                threshold: 0.2, // Aumentamos el umbral para que la animación sea más notoria
                rootMargin: '0px', // Quitamos el margen para que la animación empiece justo cuando el elemento es visible
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);    const animations = {
        // Animaciones básicas con más movimiento
        'fade-up': 'opacity-0 translate-y-24 scale-95 transition-all duration-1000 ease-out will-change-transform',
        'fade-down': 'opacity-0 -translate-y-24 scale-95 transition-all duration-1000 ease-out will-change-transform',
        'fade-left': 'opacity-0 translate-x-24 scale-95 transition-all duration-1000 ease-out will-change-transform',
        'fade-right': 'opacity-0 -translate-x-24 scale-95 transition-all duration-1000 ease-out will-change-transform',
        
        // Animaciones de zoom con rotación más pronunciada
        'zoom-in': 'opacity-0 scale-50 rotate-12 transition-all duration-1000 ease-out will-change-transform',
        'zoom-out': 'opacity-0 scale-150 -rotate-12 blur-sm transition-all duration-1000 ease-out will-change-transform',
        
        // Animaciones con giro 3D mejoradas
        'flip-up': 'opacity-0 -rotate-x-90 translate-y-8 perspective-1000 transition-all duration-1200 ease-out will-change-transform',
        'flip-down': 'opacity-0 rotate-x-90 -translate-y-8 perspective-1000 transition-all duration-1200 ease-out will-change-transform',
        'flip-left': 'opacity-0 -rotate-y-90 translate-x-8 perspective-1000 transition-all duration-1200 ease-out will-change-transform',
        'flip-right': 'opacity-0 rotate-y-90 -translate-x-8 perspective-1000 transition-all duration-1200 ease-out will-change-transform',
        
        // Animaciones con rebote mejoradas
        'bounce-up': 'opacity-0 translate-y-24 transition-transform duration-1000 ease-bounce animate-bounce will-change-transform',
        'bounce-down': 'opacity-0 -translate-y-24 transition-transform duration-1000 ease-bounce animate-bounce will-change-transform',
        
        // Animaciones con escala y giro más dramáticas
        'rotate-scale': 'opacity-0 scale-0 rotate-[360deg] blur-sm transition-all duration-1000 ease-out will-change-transform',
        'swing': 'opacity-0 rotate-12 origin-top transition-all duration-1500 ease-elastic animate-swing will-change-transform',
        
        // Animaciones con deslizamiento y giro más pronunciadas
        'slide-rotate': 'opacity-0 -translate-x-full rotate-45 blur-sm transition-all duration-1000 ease-out will-change-transform',
        'tilt-in': 'opacity-0 rotate-12 skew-x-12 blur-sm transition-all duration-1000 ease-out will-change-transform',
        
        // Animaciones con efecto elástico mejoradas
        'elastic-up': 'opacity-0 translate-y-24 scale-75 transition-all duration-1200 ease-elastic will-change-transform',
        'elastic-down': 'opacity-0 -translate-y-24 scale-75 transition-all duration-1200 ease-elastic will-change-transform',
        
        // Nuevas animaciones más llamativas
        'spiral': 'opacity-0 scale-0 rotate-[720deg] blur-sm transition-all duration-1500 ease-out will-change-transform',
        'shake': 'opacity-0 animate-shake transition-all duration-1000 ease-out will-change-transform',
        'pulse': 'opacity-0 scale-95 animate-pulse transition-all duration-1000 ease-out will-change-transform',
        'float': 'opacity-0 translate-y-8 animate-float transition-all duration-1500 ease-out will-change-transform',
    };

    const animateClasses = animations[animation] || animations['fade-up'];

    return (
        <div ref={elementRef} className={`${animateClasses} ${className}`}>
            {children}
        </div>
    );
}
