import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function PageTransition({ children }) {
    const { url } = usePage();
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        setShouldAnimate(true);
        return () => setShouldAnimate(false);
    }, [url]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={url}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
