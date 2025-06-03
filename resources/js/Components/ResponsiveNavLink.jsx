import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start px-4 py-2 border-l-4 ${
                active
                    ? 'border-secondary-accent text-white bg-primary'
                    : 'border-transparent text-primary-light hover:text-white hover:bg-primary-light/10 hover:border-secondary'
            } text-base font-medium transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
