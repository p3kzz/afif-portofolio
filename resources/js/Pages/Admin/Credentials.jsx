import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Credentials({ experiences, certifications }) {
    const [activeSubTab, setActiveSubTab] = useState('experience');

    // Experience modal states
    const [expModalOpen, setExpModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    // Certification modal states
    const [certModalOpen, setCertModalOpen] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);

    // 1. Experience form
    const expForm = useForm({
        time_period: '',
        company: '',
        title: '',
        description: '',
        type: 'professional',
    });

    const openExpAdd = () => {
        setEditingExperience(null);
        expForm.reset();
        setExpModalOpen(true);
    };

    const openExpEdit = (exp) => {
        setEditingExperience(exp);
        expForm.setData({
            time_period: exp.time_period,
            company: exp.company,
            title: exp.title,
            description: exp.description,
            type: exp.type || 'professional',
        });
        setExpModalOpen(true);
    };

    const handleExpSubmit = (e) => {
        e.preventDefault();
        if (editingExperience) {
            expForm.put(route('admin.credentials.experiences.update', editingExperience.id), {
                onSuccess: () => setExpModalOpen(false)
            });
        } else {
            expForm.post(route('admin.credentials.experiences.store'), {
                onSuccess: () => setExpModalOpen(false)
            });
        }
    };

    const deleteExp = (id) => {
        if (confirm('Are you sure you want to delete this experience timeline item?')) {
            router.delete(route('admin.credentials.experiences.destroy', id));
        }
    };

    // 2. Certification form
    const certForm = useForm({
        title: '',
        issuer: '',
        year: new Date().getFullYear(),
        credential_url: '',
        image: null,
    });

    const openCertAdd = () => {
        setEditingCertification(null);
        certForm.reset();
        setCertModalOpen(true);
    };

    const openCertEdit = (cert) => {
        setEditingCertification(cert);
        certForm.setData({
            title: cert.title,
            issuer: cert.issuer,
            year: cert.year,
            credential_url: cert.credential_url || '',
            image: null,
        });
        setCertModalOpen(true);
    };

    const handleCertSubmit = (e) => {
        e.preventDefault();
        
        // Since we are uploading certificate images, we must post.
        // For updating, we hit our custom POST route 'admin.credentials.certifications.update'
        if (editingCertification) {
            certForm.post(route('admin.credentials.certifications.update', editingCertification.id), {
                onSuccess: () => setCertModalOpen(false)
            });
        } else {
            certForm.post(route('admin.credentials.certifications.store'), {
                onSuccess: () => setCertModalOpen(false)
            });
        }
    };

    const deleteCert = (id) => {
        if (confirm('Are you sure you want to delete this certification?')) {
            router.delete(route('admin.credentials.certifications.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="credentials">
            <Head title="Credentials & Experience" />

            <div className="space-y-6">
                {/* Sub-tab Navigation */}
                <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl w-fit">
                    <button
                        onClick={() => setActiveSubTab('experience')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                            activeSubTab === 'experience' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                        }`}
                    >
                        Work & Education Experience
                    </button>
                    <button
                        onClick={() => setActiveSubTab('certification')}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                            activeSubTab === 'certification' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                        }`}
                    >
                        Certified Credentials
                    </button>
                </div>

                {/* Sub-tab 1: Experience Timeline */}
                {activeSubTab === 'experience' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                            <div>
                                <h3 className="text-sm font-bold text-white">Experience Timelines</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Manage work logs and academic history</p>
                            </div>
                            <button
                                onClick={openExpAdd}
                                className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                            >
                                Add Experience
                            </button>
                        </div>

                        <div className="space-y-4">
                            {experiences.length === 0 ? (
                                <div className="bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-8 text-center text-neutral-500 text-xs">
                                    No experiences registered.
                                </div>
                            ) : (
                                experiences.map((exp) => (
                                    <div
                                        key={exp.id}
                                        className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/[0.1] transition-all"
                                    >
                                        <div className="space-y-2 flex-1">
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider bg-[#007AFF]/15 px-2.5 py-1 rounded-full">
                                                    {exp.time_period}
                                                </span>
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                                    exp.type === 'academic' ? 'bg-[#BF5AF2]/15 text-[#BF5AF2]' : 'bg-emerald-500/15 text-[#30D158]'
                                                }`}>
                                                    {exp.type === 'academic' ? 'Academic' : 'Professional'}
                                                </span>
                                                <h4 className="text-xs font-bold text-white tracking-tight">{exp.title}</h4>
                                                <span className="text-xs text-neutral-500">•</span>
                                                <span className="text-xs text-neutral-400 font-semibold">{exp.company}</span>
                                            </div>
                                            <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                                                {exp.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 self-end md:self-center">
                                            <button
                                                onClick={() => openExpEdit(exp)}
                                                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] flex items-center justify-center text-xs text-white"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => deleteExp(exp.id)}
                                                className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center text-xs text-red-500"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Sub-tab 2: Certifications */}
                {activeSubTab === 'certification' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                            <div>
                                <h3 className="text-sm font-bold text-white">Certifications Grid</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Manage licenses and certifications</p>
                            </div>
                            <button
                                onClick={openCertAdd}
                                className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                            >
                                Add Certification
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {certifications.length === 0 ? (
                                <div className="md:col-span-3 bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-8 text-center text-neutral-500 text-xs">
                                    No certifications registered.
                                </div>
                            ) : (
                                certifications.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl overflow-hidden hover:border-[#007AFF]/35 transition-all duration-300 flex flex-col justify-between"
                                    >
                                        {/* Certificate Image preview */}
                                        <div className="h-40 bg-neutral-900 border-b border-white/[0.04] flex items-center justify-center relative overflow-hidden">
                                            {cert.image_path ? (
                                                <img src={cert.image_path} alt={cert.title} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <div className="text-neutral-600 flex flex-col items-center gap-1">
                                                    <i className="fas fa-file-contract text-2xl"></i>
                                                    <span className="text-[8px] font-bold uppercase tracking-wider">No badge uploaded</span>
                                                </div>
                                            )}
                                            <span className="absolute bottom-3 left-3 text-[9px] font-bold text-neutral-400 bg-black/60 px-2 py-0.5 rounded">
                                                {cert.year}
                                            </span>
                                        </div>

                                        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">{cert.title}</h4>
                                                <p className="text-[10px] text-neutral-400 font-semibold truncate">{cert.issuer}</p>
                                                {cert.credential_url && (
                                                    <a
                                                        href={cert.credential_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[9px] text-[#007AFF] hover:underline flex items-center gap-1 mt-1.5"
                                                    >
                                                        <i className="fas fa-external-link-alt text-[8px]"></i> Verify Credential
                                                    </a>
                                                )}
                                            </div>

                                            <div className="flex gap-2 pt-3 border-t border-white/[0.03] w-full">
                                                <button
                                                    onClick={() => openCertEdit(cert)}
                                                    className="flex-1 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-[10px] font-bold text-white flex items-center justify-center gap-1"
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteCert(cert.id)}
                                                    className="py-1.5 px-2.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-[10px] text-red-500"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Experience */}
            {expModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setExpModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[460px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingExperience ? 'Modify Experience Log' : 'Register Experience Log'}</h3>
                            <button onClick={() => setExpModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleExpSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Time Period</label>
                                <input
                                    type="text"
                                    value={expForm.data.time_period}
                                    onChange={(e) => expForm.setData('time_period', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. 2025 - Present or Oct 2024"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Company / Institution Name</label>
                                <input
                                    type="text"
                                    value={expForm.data.company}
                                    onChange={(e) => expForm.setData('company', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. University of Informatics"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Job / Degree Title</label>
                                <input
                                    type="text"
                                    value={expForm.data.title}
                                    onChange={(e) => expForm.setData('title', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Fullstack Developer Intern"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Description</label>
                                <textarea
                                    value={expForm.data.description}
                                    onChange={(e) => expForm.setData('description', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-32 resize-none"
                                    placeholder="Brief summaries (enter bullet points on newlines)..."
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Log Type</label>
                                <select
                                    value={expForm.data.type}
                                    onChange={(e) => expForm.setData('type', e.target.value)}
                                    className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    required
                                >
                                    <option value="professional">Professional Experience</option>
                                    <option value="academic">Academic Journey / Education</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setExpModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={expForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {expForm.processing ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Certification */}
            {certModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setCertModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[460px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingCertification ? 'Modify Certification' : 'Add Certification'}</h3>
                            <button onClick={() => setCertModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleCertSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Certificate Title</label>
                                <input
                                    type="text"
                                    value={certForm.data.title}
                                    onChange={(e) => certForm.setData('title', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. AWS Certified Developer"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Issuer</label>
                                <input
                                    type="text"
                                    value={certForm.data.issuer}
                                    onChange={(e) => certForm.setData('issuer', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Amazon Web Services"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Year of Issue</label>
                                <input
                                    type="number"
                                    value={certForm.data.year}
                                    onChange={(e) => certForm.setData('year', parseInt(e.target.value))}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Credential URL Verification Link</label>
                                <input
                                    type="url"
                                    value={certForm.data.credential_url}
                                    onChange={(e) => certForm.setData('credential_url', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                            {/* Certificate Image Upload */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Badge Image (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => certForm.setData('image', e.target.files[0])}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1 file:px-3 file:rounded file:bg-white/[0.08] file:text-white"
                                />
                                {editingCertification?.image_path && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <img src={editingCertification.image_path} alt="Preview" className="w-16 h-10 object-cover rounded border border-white/[0.1]" />
                                        <span className="text-[10px] text-neutral-500">Current: {editingCertification.image_path}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setCertModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={certForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {certForm.processing ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
