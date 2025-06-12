import { Link } from '@inertiajs/react';
import { useTransition } from '@/Components/TransitionProvider';

export default function NavLink({ active = false, className = '', children, href, ...props }) {
    const { setDirection } = useTransition();

    const handleNavigation = () => {
        const currentPath = window.location.pathname;
        setDirection(href === '/' || href < currentPath ? 'backward' : 'forward');
    };

    return (
        <Link
            href={href}
            {...props}
            onClick={handleNavigation}
            className={
                'nav-link inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 ' +
                (active
                    ? 'border-secondary-accent text-white border-b-2'
                    : 'border-transparent text-primary-light hover:text-white hover:border-secondary') +
                (className ? ' ' + className : '')
            }
        >
            {children}
        </Link>
    );
}
