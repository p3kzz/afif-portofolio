import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, activeTab = 'dashboard' }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sidebar navigation items
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-pie', routeName: 'admin.dashboard' },
        { id: 'profile', label: 'Portfolio Profile', icon: 'fas fa-user-circle', routeName: 'admin.profile.index' },
        { id: 'projects', label: 'Projects Showcase', icon: 'fas fa-briefcase', routeName: 'admin.projects.index' },
        { id: 'skills', label: 'Tech Stack', icon: 'fas fa-laptop-code', routeName: 'admin.skills.index' },
        { id: 'credentials', label: 'Credentials', icon: 'fas fa-graduation-cap', routeName: 'admin.credentials.index' },
        { id: 'blogs', label: 'Blog Journal', icon: 'fas fa-newspaper', routeName: 'admin.blogs.index' },
        { id: 'comments', label: 'Comments Ledger', icon: 'fas fa-comments', routeName: 'admin.comments.index' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F7] font-sans antialiased overflow-x-hidden relative flex">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#007AFF]/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#5856d6]/5 blur-[120px] pointer-events-none"></div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#151516]/60 backdrop-blur-xl border-r border-white/[0.06] py-8 px-6 fixed h-full z-20">
                {/* Brand Logo */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-gradient-to-tr from-[#007AFF] to-[#5856d6] rounded-xl flex items-center justify-center shadow-lg shadow-[#007AFF]/20">
                        <i className="fas fa-terminal text-lg text-white"></i>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-wider uppercase text-white">Console</h2>
                        <span className="text-[10px] text-[#86868B] font-medium tracking-widest uppercase">Admin Gateway</span>
                    </div>
                </div>

                {/* Profile Widget */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF2D20] to-[#FF9500] flex items-center justify-center font-bold text-white text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-neutral-400 font-medium capitalize mt-0.5">{user.role || 'Administrator'}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={route(item.routeName)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#007AFF] to-[#007AFF]/80 text-white shadow-md shadow-[#007AFF]/15'
                                        : 'text-[#86868B] hover:text-white hover:bg-white/[0.03]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <i className={`${item.icon} text-[14px] transition-transform duration-200 group-hover:scale-110`}></i>
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                        isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-[#86868B]'
                                    }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section - Profile Settings & Logout */}
                <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                    <Link
                        href={route('admin.settings')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                            activeTab === 'settings'
                                ? 'bg-white/[0.08] text-white'
                                : 'text-[#86868B] hover:text-white hover:bg-white/[0.03]'
                        }`}
                    >
                        <i className="fas fa-user-cog text-[14px]"></i>
                        <span>System Settings</span>
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-[#FF453A] hover:bg-[#FF453A]/10 transition-all duration-200 text-left"
                    >
                        <i className="fas fa-sign-out-alt text-[14px]"></i>
                        <span>Terminate Session</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#151516]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6 z-30">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-tr from-[#007AFF] to-[#5856d6] rounded-lg flex items-center justify-center">
                        <i className="fas fa-terminal text-sm text-white"></i>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Admin Console</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center justify-center text-white"
                >
                    <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-25 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                        className="absolute top-16 left-0 right-0 bg-[#151516] border-b border-white/[0.06] py-6 px-6 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF2D20] to-[#FF9500] flex items-center justify-center font-bold text-white text-sm">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">{user.name}</p>
                                <p className="text-[10px] text-neutral-400 capitalize">{user.role || 'Administrator'}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = activeTab === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={route(item.routeName)}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                                            isActive
                                                ? 'bg-[#007AFF] text-white'
                                                : 'text-[#86868B] hover:text-white hover:bg-white/[0.03]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={item.icon}></i>
                                            <span>{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="pt-4 border-t border-white/[0.06] flex gap-3">
                            <Link
                                href={route('admin.settings')}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold bg-white/[0.04] text-white border border-white/[0.06]"
                            >
                                <i className="fas fa-user-cog"></i>
                                <span>Settings</span>
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold bg-[#FF453A]/10 text-[#FF453A] border border-[#FF453A]/20"
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 min-h-screen flex flex-col lg:pl-64 pt-16 lg:pt-0 relative z-10">
                {/* Top Header */}
                <header className="hidden lg:flex items-center justify-between h-20 px-8 border-b border-white/[0.06] bg-[#0A0A0B]/30 backdrop-blur-md">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white capitalize">{activeTab} Interface</h1>
                        <p className="text-[10px] text-[#86868B] font-semibold uppercase tracking-wider mt-0.5">Core operations & system metrics</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Live Server Indicator */}
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse"></span>
                            <span className="text-[10px] font-bold text-[#30D158] uppercase tracking-wider">System Live</span>
                        </div>

                        {/* Current Date/Time */}
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">System Time</p>
                            <p className="text-xs font-semibold text-white mt-0.5">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Sub-header for mobile view title */}
                <div className="lg:hidden px-6 pt-6 pb-2">
                    <h1 className="text-lg font-bold tracking-tight text-white capitalize">{activeTab} Interface</h1>
                    <p className="text-[10px] text-[#86868B] font-semibold uppercase tracking-wider mt-0.5">Core operations & metrics</p>
                </div>

                {/* Page Content View */}
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
