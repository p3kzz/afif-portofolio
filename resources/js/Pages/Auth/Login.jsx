import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col justify-center items-center px-6 transition-colors duration-500 relative overflow-hidden font-sans">
            {/* Ambient animated gradient background */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#007AFF]/10 dark:bg-[#007AFF]/15 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#5856d6]/10 dark:bg-[#5856d6]/15 blur-[120px] pointer-events-none"></div>

            <Head title="Admin Authenticator" />

            <div className="w-full max-w-[420px] relative z-10 animate-fade-in">
                {/* Brand Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-14 h-14 bg-gradient-to-tr from-[#007AFF] to-[#5856d6] rounded-2xl items-center justify-center shadow-lg shadow-[#007AFF]/25 mb-4 transform hover:scale-105 transition-transform duration-300">
                        <i className="fas fa-user-shield text-2xl text-white"></i>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Gateway</h1>
                    <p className="text-xs text-[#86868B] mt-1.5">Sign in to manage systems architecture and content</p>
                </div>

                {status && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-semibold text-green-500 text-center">
                        {status}
                    </div>
                )}

                {/* Glassmorphic Login Card */}
                <div className="bg-white/85 dark:bg-[#151516]/85 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] p-8 rounded-3xl shadow-xl shadow-black/[0.02] dark:shadow-black/[0.2]">
                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase">
                                Call Sign / Email
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-3.5 text-[#86868B] text-sm pointer-events-none">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="admin@example.com"
                                    className={`w-full bg-[#F5F5F7] dark:bg-[#0A0A0A]/50 border pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 ${
                                        errors.email 
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-black/[0.08] dark:border-white/[0.08] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20'
                                    }`}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1 animate-fade-in">
                                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase">
                                    Access Token / Password
                                </label>
                                {canResetPassword && (
                                    <a
                                        href={route('password.request')}
                                        className="text-[10px] font-semibold text-[#007AFF] hover:underline"
                                    >
                                        Forgot?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute left-4 top-3.5 text-[#86868B] text-sm pointer-events-none">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="••••••••"
                                    className={`w-full bg-[#F5F5F7] dark:bg-[#0A0A0A]/50 border pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 ${
                                        errors.password 
                                            ? 'border-red-500 focus:border-red-500' 
                                            : 'border-black/[0.08] dark:border-white/[0.08] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20'
                                    }`}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1 animate-fade-in">
                                    <i className="fas fa-exclamation-circle"></i> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    className="rounded border-black/[0.1] dark:border-white/[0.1] text-[#007AFF] focus:ring-[#007AFF]/20 bg-[#F5F5F7] dark:bg-[#0A0A0A] w-4 h-4 transition-colors"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2.5 text-xs text-[#86868B] font-medium select-none">
                                    Maintain session duration
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#007AFF] text-white p-3.5 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-all transform active:scale-[0.98] shadow-md shadow-[#007AFF]/15 disabled:opacity-40 flex justify-center items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Authenticate Portal</span>
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
