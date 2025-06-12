import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';

const TransitionContext = createContext({
    direction: 'forward',
    setDirection: () => {},
});

export const useTransition = () => useContext(TransitionContext);

// Rutas donde queremos transiciones
const TRANSITION_ROUTES = ['/', '/login', '/register', '/forgot-password'];

const shouldAnimate = (path) => TRANSITION_ROUTES.includes(path);

const pageVariants = {
    initial: (direction) => ({
        opacity: 0,
        scale: direction === 'forward' ? 1.1 : 0.9,
    }),
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
        }
    },
    exit: (direction) => ({
        opacity: 0,
        scale: direction === 'forward' ? 0.9 : 1.1,
        transition: {
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
        }
    })
};

export default function TransitionProvider({ children }) {
    const [direction, setDirection] = useState('forward');
    const currentPath = window.location.pathname;
    
    // Escuchar los eventos de navegación de Inertia
    router.on('before', (event) => {
        if (shouldAnimate(currentPath) || shouldAnimate(event.detail.visit.url.pathname)) {
            window.scrollTo(0, 0);
        }
    });

    // Solo aplicar animación si estamos en o vamos a una ruta de transición
    const shouldAnimateCurrentPath = shouldAnimate(currentPath);

    return (
        <TransitionContext.Provider value={{ direction, setDirection }}>
            {shouldAnimateCurrentPath ? (
                <div className="transition-container">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={currentPath}
                            custom={direction}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="page-content"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            ) : (
                children
            )}
        </TransitionContext.Provider>
    );
}
