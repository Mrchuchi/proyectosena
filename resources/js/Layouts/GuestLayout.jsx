import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useTransition } from '@/Components/TransitionProvider';

export default function Guest({ children }) {
    const { setDirection } = useTransition();

    const handleNavigation = (path) => {
        const currentPath = window.location.pathname;
        setDirection(path === '/' || path < currentPath ? 'backward' : 'forward');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 via-primary/80 to-primary-light/50">
            <div className="fixed top-0 left-0 right-0 flex justify-center -mb-6 z-50">
                <Link href="/" onClick={() => handleNavigation('/')}>
                    <ApplicationLogo className="w-auto h-32 sm:h-36 md:h-40" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-40 px-6 py-6 bg-white shadow-xl rounded-lg mx-4 transform-gpu">
                {children}
            </div>
        </div>
    );
}
