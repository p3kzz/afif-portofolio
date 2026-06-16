import React from 'react';

export default function Navbar({
    profile,
    darkMode,
    setDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    navContainerRef,
    navIndicatorRef
}) {
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] z-50 transition-all">
            <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                    {/* <i className="fab fa-apple text-[#007AFF]"></i> */}
                    <span>{profile?.name || 'Afif'}</span>
                </a>

                {/* Desktop Menu */}
                <div ref={navContainerRef} className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] p-1 rounded-full relative z-10">
                    {/* Sliding Indicator */}
                    <div
                        ref={navIndicatorRef}
                        className="absolute h-[calc(100%-8px)] bg-white dark:bg-[#151516] rounded-full top-1 left-1 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-[-1]"
                    />
                    {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className={`px-4 py-1.5 text-xs font-medium rounded-full capitalize transition-all ${
                                activeSection === item
                                    ? 'text-[#1D1D1F] dark:text-[#F5F5F7]'
                                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                            }`}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#151516] flex justify-center items-center text-sm transition-transform hover:scale-105"
                        aria-label="Toggle Theme"
                    >
                        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#151516] flex justify-center items-center"
                        aria-label="Toggle Mobile Menu"
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Nav Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden w-full bg-white/95 dark:bg-[#0A0A0A]/95 border-b border-black/[0.08] dark:border-white/[0.08] p-6 flex flex-col gap-4 animate-fade-in">
                    {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium capitalize text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
