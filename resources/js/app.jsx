import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import TransitionProvider from '@/Components/TransitionProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Envolver App con TransitionProvider
        const Wrapped = () => (
            <App {...props}>
                {({ Component, key, props: pageProps }) => (
                    <TransitionProvider>
                        <Component key={key} {...pageProps} />
                    </TransitionProvider>
                )}
            </App>
        );

        root.render(<Wrapped />);
    },
    progress: {
        color: '#4B5563',
        delay: 0,
    },
});
