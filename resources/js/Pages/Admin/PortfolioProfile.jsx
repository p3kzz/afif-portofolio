import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function PortfolioProfile({ profile, statistics, aboutCards }) {
    const [activeSubTab, setActiveSubTab] = useState('general');

    // Modals state for statistics and about cards
    const [statModalOpen, setStatModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null);

    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    const [editingAbout, setEditingAbout] = useState(null);

    // 1. General Profile Form
    const { data: profileData, setData: setProfileData, post: postProfile, processing: profileProcessing, errors: profileErrors } = useForm({
        name: profile?.name || '',
        title: profile?.title || '',
        tagline: profile?.tagline || '',
        short_introduction: profile?.short_introduction || '',
        typing_effects: profile?.typing_effects || [],
        cv_file: null,
        avatar: null,
        email: profile?.email || '',
        phone: profile?.phone || '',
        github_url: profile?.github_url || '',
        linkedin_url: profile?.linkedin_url || '',
        instagram_url: profile?.instagram_url || '',
    });

    const [newTypingEffect, setNewTypingEffect] = useState('');

    const addTypingEffect = () => {
        if (newTypingEffect.trim()) {
            setProfileData('typing_effects', [...profileData.typing_effects, newTypingEffect.trim()]);
            setNewTypingEffect('');
        }
    };

    const removeTypingEffect = (index) => {
        const filtered = profileData.typing_effects.filter((_, i) => i !== index);
        setProfileData('typing_effects', filtered);
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        postProfile(
            route('admin.profile.update'),
            {
                forceFormData: true,
                preserveScroll: true,
            }
        );
    };

    // 2. Statistics Form
    const statForm = useForm({
        label: '',
        value: '',
        order_index: 0,
    });

    const openStatAdd = () => {
        setEditingStat(null);
        statForm.reset();
        setStatModalOpen(true);
    };

    const openStatEdit = (stat) => {
        setEditingStat(stat);
        statForm.setData({
            label: stat.label,
            value: stat.value,
            order_index: stat.order_index,
        });
        setStatModalOpen(true);
    };

    const handleStatSubmit = (e) => {
        e.preventDefault();
        if (editingStat) {
            statForm.put(route('admin.profile.stats.update', editingStat.id), {
                onSuccess: () => setStatModalOpen(false)
            });
        } else {
            statForm.post(route('admin.profile.stats.store'), {
                onSuccess: () => setStatModalOpen(false)
            });
        }
    };

    const deleteStat = (id) => {
        if (confirm('Are you sure you want to delete this statistic counter?')) {
            router.delete(route('admin.profile.stats.destroy', id));
        }
    };

    // 3. About Cards Form
    const aboutForm = useForm({
        icon: '',
        title: '',
        description: '',
        order_index: 0,
    });

    const openAboutAdd = () => {
        setEditingAbout(null);
        aboutForm.reset();
        setAboutModalOpen(true);
    };

    const openAboutEdit = (card) => {
        setEditingAbout(card);
        aboutForm.setData({
            icon: card.icon,
            title: card.title,
            description: card.description,
            order_index: card.order_index,
        });
        setAboutModalOpen(true);
    };

    const handleAboutSubmit = (e) => {
        e.preventDefault();
        if (editingAbout) {
            aboutForm.put(route('admin.profile.about.update', editingAbout.id), {
                onSuccess: () => setAboutModalOpen(false)
            });
        } else {
            aboutForm.post(route('admin.profile.about.store'), {
                onSuccess: () => setAboutModalOpen(false)
            });
        }
    };

    const deleteAbout = (id) => {
        if (confirm('Are you sure you want to delete this About Card?')) {
            router.delete(route('admin.profile.about.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="profile">
            <Head title="Profile Content Settings" />

            <div className="space-y-6">
                {/* Sub-tab Navigation */}
                <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl w-fit">
                    <button
                        onClick={() => setActiveSubTab('general')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSubTab === 'general' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                            }`}
                    >
                        General Info
                    </button>
                    <button
                        onClick={() => setActiveSubTab('stats')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSubTab === 'stats' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                            }`}
                    >
                        Statistic Counters
                    </button>
                    <button
                        onClick={() => setActiveSubTab('about')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSubTab === 'about' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                            }`}
                    >
                        About Cards
                    </button>
                </div>

                {/* Sub-tab 1: General Info */}
                {activeSubTab === 'general' && (
                    <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 lg:p-8">
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData('name', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="Name"
                                        required
                                    />
                                    {profileErrors.name && <p className="text-red-500 text-[10px]">{profileErrors.name}</p>}
                                </div>

                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Professional Title</label>
                                    <input
                                        type="text"
                                        value={profileData.title}
                                        onChange={(e) => setProfileData('title', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="Fullstack Developer | AI Researcher"
                                        required
                                    />
                                    {profileErrors.title && <p className="text-red-500 text-[10px]">{profileErrors.title}</p>}
                                </div>

                                {/* Tagline Input */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Tagline</label>
                                    <input
                                        type="text"
                                        value={profileData.tagline}
                                        onChange={(e) => setProfileData('tagline', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="Building system models for the next generation"
                                        required
                                    />
                                    {profileErrors.tagline && <p className="text-red-500 text-[10px]">{profileErrors.tagline}</p>}
                                </div>

                                {/* Introduction Input */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Short Introduction</label>
                                    <textarea
                                        value={profileData.short_introduction}
                                        onChange={(e) => setProfileData('short_introduction', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all h-32 resize-none"
                                        placeholder="Write a brief intro..."
                                        required
                                    />
                                    {profileErrors.short_introduction && <p className="text-red-500 text-[10px]">{profileErrors.short_introduction}</p>}
                                </div>

                                {/* Typing Animations List */}
                                <div className="space-y-3 md:col-span-2 bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Typing Simulator Animators</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTypingEffect}
                                            onChange={(e) => setNewTypingEffect(e.target.value)}
                                            className="flex-1 bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                                            placeholder="Add phrase (e.g. Informatics Student)"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTypingEffect}
                                            className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {profileData.typing_effects.map((effect, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-white/[0.04] border border-white/[0.08] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2"
                                            >
                                                <span>{effect}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTypingEffect(idx)}
                                                    className="text-red-500 hover:text-red-400 text-xs"
                                                >
                                                    <i className="fas fa-times-circle"></i>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Avatar Upload */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Profile Picture (Avatar)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProfileData('avatar', e.target.files[0])}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12] transition-all"
                                    />
                                    {profile?.avatar_path && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <img src={profile.avatar_path} alt="Avatar preview" className="w-12 h-12 rounded-full object-cover border border-white/[0.1]" />
                                            <span className="text-[10px] text-neutral-500">Current file path: {profile.avatar_path}</span>
                                        </div>
                                    )}
                                    {profileErrors.avatar && <p className="text-red-500 text-[10px]">{profileErrors.avatar}</p>}
                                </div>

                                {/* CV PDF Upload */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Curriculum Vitae (PDF)</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setProfileData('cv_file', e.target.files[0])}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12] transition-all"
                                    />
                                    {profile?.cv_file_path && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center justify-center text-sm">
                                                <i className="fas fa-file-pdf"></i>
                                            </div>
                                            <a href={profile.cv_file_path} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#007AFF] hover:underline">
                                                View Current Resume PDF
                                            </a>
                                        </div>
                                    )}
                                    {profileErrors.cv_file && <p className="text-red-500 text-[10px]">{profileErrors.cv_file}</p>}
                                </div>

                                {/* Contact Settings Group */}
                                <div className="md:col-span-2 border-t border-white/[0.06] pt-6 mt-4">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Contact & Social Links</h4>
                                    <p className="text-[9px] text-[#86868B] uppercase tracking-wider">Set links to display on the public website</p>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Direct Email Address</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData('email', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                    {profileErrors.email && <p className="text-red-500 text-[10px]">{profileErrors.email}</p>}
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Phone / Telegram / Whatsapp</label>
                                    <input
                                        type="text"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData('phone', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="e.g. +628123456789"
                                    />
                                    {profileErrors.phone && <p className="text-red-500 text-[10px]">{profileErrors.phone}</p>}
                                </div>

                                {/* GitHub URL Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">GitHub Profile Link</label>
                                    <input
                                        type="text"
                                        value={profileData.github_url}
                                        onChange={(e) => setProfileData('github_url', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="https://github.com/your-username"
                                    />
                                    {profileErrors.github_url && <p className="text-red-500 text-[10px]">{profileErrors.github_url}</p>}
                                </div>

                                {/* LinkedIn URL Input */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">LinkedIn Profile Link</label>
                                    <input
                                        type="text"
                                        value={profileData.linkedin_url}
                                        onChange={(e) => setProfileData('linkedin_url', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="https://linkedin.com/in/your-username"
                                    />
                                    {profileErrors.linkedin_url && <p className="text-red-500 text-[10px]">{profileErrors.linkedin_url}</p>}
                                </div>

                                {/* Instagram URL Input */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Instagram Profile Link</label>
                                    <input
                                        type="text"
                                        value={profileData.instagram_url}
                                        onChange={(e) => setProfileData('instagram_url', e.target.value)}
                                        className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF]/20 transition-all"
                                        placeholder="https://instagram.com/your-username"
                                    />
                                    {profileErrors.instagram_url && <p className="text-red-500 text-[10px]">{profileErrors.instagram_url}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={profileProcessing}
                                className="bg-[#007AFF] text-white px-5 py-3 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-all transform active:scale-98 disabled:opacity-40"
                            >
                                {profileProcessing ? 'Saving Details...' : 'Save General Settings'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Sub-tab 2: Statistic Counters */}
                {activeSubTab === 'stats' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                            <div>
                                <h3 className="text-sm font-bold text-white">Registry Counters</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Numeric values displayed in summary section</p>
                            </div>
                            <button
                                onClick={openStatAdd}
                                className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                            >
                                Add Counter
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {statistics.map((stat) => (
                                <div key={stat.id} className="bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-5 flex justify-between items-center">
                                    <div>
                                        <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Order: {stat.order_index}</span>
                                        <h4 className="text-xs font-bold text-white mt-1">{stat.label}</h4>
                                        <p className="text-2xl font-extrabold text-[#007AFF] mt-1">{stat.value}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openStatEdit(stat)}
                                            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] flex items-center justify-center text-xs text-white"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => deleteStat(stat.id)}
                                            className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center text-xs text-red-500"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sub-tab 3: About Cards */}
                {activeSubTab === 'about' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                            <div>
                                <h3 className="text-sm font-bold text-white">About Section Cards</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Key topics displayed in information tab</p>
                            </div>
                            <button
                                onClick={openAboutAdd}
                                className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                            >
                                Add Card
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {aboutCards.map((card) => (
                                <div key={card.id} className="bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-6 space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div className="w-9 h-9 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] flex items-center justify-center text-sm">
                                                <i className={`fas ${card.icon}`}></i>
                                            </div>
                                            <span className="text-[9px] text-neutral-500 font-bold uppercase">Order: {card.order_index}</span>
                                        </div>
                                        <h4 className="text-xs font-bold text-white">{card.title}</h4>
                                        <p className="text-xs text-neutral-400 leading-relaxed">{card.description}</p>
                                    </div>
                                    <div className="flex gap-2 pt-3 border-t border-white/[0.03] self-end w-full justify-end">
                                        <button
                                            onClick={() => openAboutEdit(card)}
                                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-[10px] font-bold text-white flex items-center gap-1.5"
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteAbout(card.id)}
                                            className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-[10px] font-bold text-red-500 flex items-center gap-1.5"
                                        >
                                            <i className="fas fa-trash-alt"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Statistics */}
            {statModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setStatModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[420px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingStat ? 'Modify Statistic Counter' : 'Register New Counter'}</h3>
                            <button onClick={() => setStatModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleStatSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Label Title</label>
                                <input
                                    type="text"
                                    value={statForm.data.label}
                                    onChange={(e) => statForm.setData('label', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Years Learning"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Value Count</label>
                                <input
                                    type="number"
                                    value={statForm.data.value}
                                    onChange={(e) => statForm.setData('value', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. 5"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sort Order Index</label>
                                <input
                                    type="number"
                                    value={statForm.data.order_index}
                                    onChange={(e) => statForm.setData('order_index', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setStatModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={statForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {statForm.processing ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal About Cards */}
            {aboutModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setAboutModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[460px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingAbout ? 'Modify Card Info' : 'Create Info Card'}</h3>
                            <button onClick={() => setAboutModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleAboutSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Icon Class (FontAwesome)</label>
                                    <input
                                        type="text"
                                        value={aboutForm.data.icon}
                                        onChange={(e) => aboutForm.setData('icon', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="fa-graduation-cap or fa-terminal"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Title</label>
                                    <input
                                        type="text"
                                        value={aboutForm.data.title}
                                        onChange={(e) => aboutForm.setData('title', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="e.g. Education"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Description</label>
                                    <textarea
                                        value={aboutForm.data.description}
                                        onChange={(e) => aboutForm.setData('description', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-24 resize-none"
                                        placeholder="Write descriptions..."
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sort Order Index</label>
                                    <input
                                        type="number"
                                        value={aboutForm.data.order_index}
                                        onChange={(e) => aboutForm.setData('order_index', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setAboutModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={aboutForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {aboutForm.processing ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
