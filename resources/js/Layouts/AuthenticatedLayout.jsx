import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useTransition } from '@/Components/TransitionProvider';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { setDirection } = useTransition();

    const handleNavigation = (path) => {
        const currentPath = window.location.pathname;
        setDirection(path === '/' || path < currentPath ? 'backward' : 'forward');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-primary/80 border-b border-primary/20">
                <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-none flex items-center">
                            <Link href="/" onClick={() => handleNavigation('/')}>
                                <ApplicationLogo className="block h-14 w-auto" />
                            </Link>
                        </div>

                        <div className="flex-1 flex justify-center items-center">
                            <div className="hidden lg:flex lg:-my-px mx-auto text-sm lg:text-base">
                                <div className="flex flex-wrap justify-center gap-x-2 xl:gap-x-4 2xl:gap-x-6">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')} 
                                        className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                        Inicio
                                    </NavLink>
                                <NavLink href={route('clients.index')} active={route().current('clients.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Clientes
                                </NavLink>
                                <NavLink href={route('raw-materials.index')} active={route().current('raw-materials.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Materia Prima
                                </NavLink>
                                <NavLink href={route('products.index')} active={route().current('products.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Productos
                                </NavLink>
                                <NavLink href={route('recipes.index')} active={route().current('recipes.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Recetas
                                </NavLink>
                                <NavLink href={route('production.index')} active={route().current('production.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Producción
                                </NavLink>
                                <NavLink href={route('inventory.index')} active={route().current('inventory.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Inventario
                                </NavLink>
                                <NavLink href={route('movements.index')} active={route().current('movements.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Entradas/Salidas
                                </NavLink>
                                <NavLink href={route('users.index')} active={route().current('users.*')} 
                                    className="text-primary-light hover:text-white whitespace-nowrap px-2 py-1" activeClassName="text-white border-secondary-accent">
                                    Usuarios
                                </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-primary-light focus:outline-none transition-colors duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')} className="text-primary hover:bg-primary-light/10">
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-primary hover:bg-primary-light/10">
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-primary-light hover:text-white hover:bg-primary-light/10 focus:outline-none focus:bg-primary-light/10 focus:text-white transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden bg-primary-light/5 max-h-[calc(100vh-5rem)] overflow-y-auto'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10 transition-colors duration-200"
                            activeClassName="bg-primary text-white">
                            Inicio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('clients.index')} active={route().current('clients.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Clientes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('raw-materials.index')} active={route().current('raw-materials.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Materia Prima
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('products.index')} active={route().current('products.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Productos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('recipes.index')} active={route().current('recipes.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Recetas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('production.index')} active={route().current('production.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Producción
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('inventory.index')} active={route().current('inventory.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Inventario
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('movements.index')} active={route().current('movements.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Entradas/Salidas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}
                            className="text-primary-light hover:text-white hover:bg-primary-light/10"
                            activeClassName="bg-primary text-white">
                            Usuarios
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-primary-light/20">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.name}</div>
                            <div className="font-medium text-sm text-primary-light">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} 
                                className="text-primary-light hover:text-white hover:bg-primary-light/10">
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button"
                                className="text-primary-light hover:text-white hover:bg-primary-light/10">
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
