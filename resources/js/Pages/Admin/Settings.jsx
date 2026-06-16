import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings() {
    const user = usePage().props.auth.user;

    // 1. Profile Information Form
    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    // 2. Password Update Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            onSuccess: () => alert('Account profile details updated successfully.'),
            preserveScroll: true
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            onSuccess: () => {
                passwordForm.reset();
                alert('Account password updated successfully.');
            },
            onError: (err) => {
                if (err.current_password) {
                    alert('Error: ' + err.current_password);
                } else if (err.password) {
                    alert('Error: ' + err.password);
                } else {
                    alert('Error updating password. Please verify input parameters.');
                }
            },
            preserveScroll: true
        });
    };

    return (
        <AdminLayout activeTab="settings">
            <Head title="Account Settings & Security" />

            <div className="space-y-8 max-w-2xl">
                {/* Section 1: Profile Details */}
                <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 lg:p-8 space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile Information</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Update your account's profile name and email address</p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Name</label>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                required
                            />
                            {profileForm.errors.name && <p className="text-red-500 text-[10px]">{profileForm.errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                required
                            />
                            {profileForm.errors.email && <p className="text-red-500 text-[10px]">{profileForm.errors.email}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="bg-[#007AFF] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-all disabled:opacity-40"
                        >
                            {profileForm.processing ? 'Saving Details...' : 'Save Profile Details'}
                        </button>
                    </form>
                </div>

                {/* Section 2: Password Update */}
                <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 lg:p-8 space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Update Password</h3>
                        <p className="text-[10px] text-[#86868B] uppercase tracking-wider mt-0.5">Ensure your account is using a secure password to protect dashboard access</p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Current Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                required
                            />
                            {passwordForm.errors.current_password && <p className="text-red-500 text-[10px]">{passwordForm.errors.current_password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">New Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                required
                            />
                            {passwordForm.errors.password && <p className="text-red-500 text-[10px]">{passwordForm.errors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Confirm Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                required
                            />
                            {passwordForm.errors.password_confirmation && <p className="text-red-500 text-[10px]">{passwordForm.errors.password_confirmation}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="bg-[#007AFF] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-all disabled:opacity-40"
                        >
                            {passwordForm.processing ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
