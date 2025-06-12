import { useTransition } from '@/Components/TransitionProvider';

export default function Guest({ children }) {
    const { setDirection } = useTransition();

    const handleNavigation = (path) => {
        const currentPath = window.location.pathname;
        setDirection(path === '/' || path < currentPath ? 'backward' : 'forward');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 via-primary/80 to-primary-light/50 p-6">
            <div className="w-full sm:max-w-2xl px-6 py-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl mx-4 transform hover:shadow-2xl transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
