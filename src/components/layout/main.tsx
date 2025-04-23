/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

interface LayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto px-2 py-5 md:px-9">
                    <div className="flex items-center justify-between sm:items-stretch">
                        <div className="flex shrink-0 items-center justify-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        {/* Mobile menu button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Icon: hamburger / close */}
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    href="/"
                                    className={
                                        currentPath === '/'
                                            ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                                            : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }
                                    aria-current={currentPath === '/' ? 'page' : undefined}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className={
                                        currentPath === '/products'
                                            ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                                            : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }
                                    aria-current={currentPath === '/products' ? 'page' : undefined}
                                >
                                    Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            <Link
                                href="/"
                                className={
                                    currentPath === '/'
                                        ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                                        : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                                aria-current={currentPath === '/' ? 'page' : undefined}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className={
                                    currentPath === '/products'
                                        ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                                        : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                                aria-current={currentPath === '/products' ? 'page' : undefined}
                            >
                                Products
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <main className='px-9'>
                {children}
            </main>
        </div>
    );
}
