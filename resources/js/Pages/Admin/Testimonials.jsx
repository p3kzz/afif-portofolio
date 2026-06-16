import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Testimonials({ testimonials }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);

    const testForm = useForm({
        author_name: '',
        author_role: '',
        content: '',
        avatar: null,
    });

    const openAdd = () => {
        setEditingTestimonial(null);
        testForm.reset();
        setModalOpen(true);
    };

    const openEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        testForm.setData({
            author_name: testimonial.author_name,
            author_role: testimonial.author_role,
            content: testimonial.content,
            avatar: null,
        });
        setModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Since we upload avatar images, we submit using POST.
        // For editing, we hit our custom POST route 'admin.testimonials.update.post'
        if (editingTestimonial) {
            testForm.post(route('admin.testimonials.update.post', editingTestimonial.id), {
                onSuccess: () => setModalOpen(false)
            });
        } else {
            testForm.post(route('admin.testimonials.store'), {
                onSuccess: () => setModalOpen(false)
            });
        }
    };

    const deleteTestimonial = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="testimonials">
            <Head title="Testimonials Appraisals Management" />

            <div className="space-y-6">
                {/* Header panel */}
                <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                    <div>
                        <h3 className="text-sm font-bold text-white">Peer Appraisals Ledger</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Manage testimonials and recommendations shown on landing carousel</p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                    >
                        Register Testimonial
                    </button>
                </div>

                {/* Testimonials list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.length === 0 ? (
                        <div className="md:col-span-2 bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-8 text-center text-neutral-500 text-xs">
                            No testimonials registered yet. Click "Register Testimonial" to begin.
                        </div>
                    ) : (
                        testimonials.map((test) => (
                            <div
                                key={test.id}
                                className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl p-6 flex flex-col justify-between hover:border-white/[0.1] transition-all"
                            >
                                <div className="space-y-4">
                                    <p className="text-xs text-neutral-300 italic leading-relaxed">
                                        "{test.content}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/[0.1] overflow-hidden flex items-center justify-center">
                                            {test.avatar_path ? (
                                                <img src={test.avatar_path} alt={test.author_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-bold text-white text-xs">{test.author_name.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">{test.author_name}</h4>
                                            <p className="text-[10px] text-neutral-500 font-semibold">{test.author_role}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 mt-5 border-t border-white/[0.03] w-full justify-end">
                                    <button
                                        onClick={() => openEdit(test)}
                                        className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-xs font-bold text-white flex items-center gap-1.5"
                                    >
                                        <i className="fas fa-edit"></i> Edit Details
                                    </button>
                                    <button
                                        onClick={() => deleteTestimonial(test.id)}
                                        className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold text-red-500"
                                    >
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal CRUD Form */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[460px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingTestimonial ? 'Edit Testimonial' : 'Register Testimonial'}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            
                            {/* Author Name */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Author Name</label>
                                <input
                                    type="text"
                                    value={testForm.data.author_name}
                                    onChange={(e) => testForm.setData('author_name', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Jane Doe"
                                    required
                                />
                                {testForm.errors.author_name && <p className="text-red-500 text-[10px]">{testForm.errors.author_name}</p>}
                            </div>

                            {/* Author Role */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Author Role</label>
                                <input
                                    type="text"
                                    value={testForm.data.author_role}
                                    onChange={(e) => testForm.setData('author_role', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Director of Engineering"
                                    required
                                />
                                {testForm.errors.author_role && <p className="text-red-500 text-[10px]">{testForm.errors.author_role}</p>}
                            </div>

                            {/* Review Content */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Testimonial Content</label>
                                <textarea
                                    value={testForm.data.content}
                                    onChange={(e) => testForm.setData('content', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-28 resize-none"
                                    placeholder="Write citation..."
                                    required
                                />
                                {testForm.errors.content && <p className="text-red-500 text-[10px]">{testForm.errors.content}</p>}
                            </div>

                            {/* Avatar File Upload */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Avatar Image (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => testForm.setData('avatar', e.target.files[0])}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1 file:px-3 file:rounded file:bg-white/[0.08] file:text-white"
                                />
                                {editingTestimonial?.avatar_path && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <img src={editingTestimonial.avatar_path} alt="Avatar Preview" className="w-10 h-10 object-cover rounded-full border border-white/[0.1]" />
                                        <span className="text-[10px] text-neutral-500">Current: {editingTestimonial.avatar_path}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={testForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {testForm.processing ? 'Saving...' : 'Save Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
