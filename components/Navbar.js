'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6 relative">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group relative flex items-center py-2"
                    >
                        <span className="text-2xl font-space-grotesk font-bold text-white/90 transition-colors group-hover:text-white">
                            BetterPost
                            <span className="inline-block ml-1 text-white/70 group-hover:text-white/90 transition-colors">AI</span>
                        </span>
                        {/* Subtle hover effect */}
                        <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-white/20 transition-all duration-300"></div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <a href="https://github.com/CheefLofter/better-posts"
                            target="_blank" rel="noopener noreferrer"
                            class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                            <FaGithub className="w-5 h-5" />
                            <span>My GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;