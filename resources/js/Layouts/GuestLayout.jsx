import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center -space-y-4 bg-gradient-to-br from-primary/90 via-primary/80 to-primary-light/50">
            <div className="-mb-6">
                <Link href="/">
                    <ApplicationLogo className="w-auto h-32 sm:h-36 md:h-40" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6 py-6 bg-white shadow-xl rounded-lg mx-4">
                {children}
            </div>
        </div>
    );
}
