import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Blogs({ blogs }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const blogForm = useForm({
        title: '',
        excerpt: '',
        content: '',
        is_published: true,
        cover: null,
    });

    const openAdd = () => {
        setEditingBlog(null);
        blogForm.reset();
        setModalOpen(true);
    };

    const openEdit = (blog) => {
        setEditingBlog(blog);
        blogForm.setData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content || '',
            is_published: !!blog.is_published,
            cover: null,
        });
        setModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Since we are uploading cover images, we must post.
        // For editing, we hit our custom POST route 'admin.blogs.update.post'
        if (editingBlog) {
            blogForm.post(route('admin.blogs.update.post', editingBlog.id), {
                onSuccess: () => setModalOpen(false)
            });
        } else {
            blogForm.post(route('admin.blogs.store'), {
                onSuccess: () => setModalOpen(false)
            });
        }
    };

    const deleteBlog = (id) => {
        if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            router.delete(route('admin.blogs.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="blogs">
            <Head title="Blog Journal Editor" />

            <div className="space-y-6">
                {/* Header widget */}
                <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                    <div>
                        <h3 className="text-sm font-bold text-white">Blog Journal Articles</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Publish journals and write tech logs</p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                    >
                        Draft New Post
                    </button>
                </div>

                {/* Blogs grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.length === 0 ? (
                        <div className="md:col-span-3 bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-8 text-center text-neutral-500 text-xs">
                            No articles drafted yet. Click "Draft New Post" to start.
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl overflow-hidden hover:border-[#007AFF]/35 transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Cover preview */}
                                <div className="h-44 bg-neutral-900 border-b border-white/[0.04] flex items-center justify-center relative overflow-hidden">
                                    {blog.cover_image_path ? (
                                        <img src={blog.cover_image_path} alt={blog.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-neutral-600 flex flex-col items-center gap-1.5">
                                            <i className="fas fa-newspaper text-3xl"></i>
                                            <span className="text-[9px] font-bold uppercase tracking-wider">No cover image</span>
                                        </div>
                                    )}
                                    <span className={`absolute top-3 right-3 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                        blog.is_published ? 'bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/35' : 'bg-white/[0.06] text-[#86868B]'
                                    }`}>
                                        {blog.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>

                                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <span className="text-[9px] text-neutral-500 font-bold uppercase">
                                            {new Date(blog.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <h4 className="text-xs font-bold text-white tracking-tight line-clamp-2">{blog.title}</h4>
                                        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-white/[0.03] w-full">
                                        <button
                                            onClick={() => openEdit(blog)}
                                            className="flex-1 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-xs font-bold text-white flex items-center justify-center gap-1.5"
                                        >
                                            <i className="fas fa-edit"></i> Edit Article
                                        </button>
                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="py-2 px-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs text-red-500"
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

            {/* Modal CRUD Form */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[640px] h-[85vh] rounded-3xl p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingBlog ? 'Edit Post' : 'Draft New Post'}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 scrollbar-thin">
                            
                            {/* Title */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    value={blogForm.data.title}
                                    onChange={(e) => blogForm.setData('title', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Architectural designs on Next.js app"
                                    required
                                />
                                {blogForm.errors.title && <p className="text-red-500 text-[10px]">{blogForm.errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Excerpt (Brief Description)</label>
                                <textarea
                                    value={blogForm.data.excerpt}
                                    onChange={(e) => blogForm.setData('excerpt', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-16 resize-none"
                                    placeholder="Enter article snippet..."
                                    required
                                />
                                {blogForm.errors.excerpt && <p className="text-red-500 text-[10px]">{blogForm.errors.excerpt}</p>}
                            </div>

                            {/* Content */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Full Content (Markdown / HTML)</label>
                                <textarea
                                    value={blogForm.data.content}
                                    onChange={(e) => blogForm.setData('content', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-56 resize-none"
                                    placeholder="Write details..."
                                />
                            </div>

                            {/* Cover image upload */}
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Cover Image (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => blogForm.setData('cover', e.target.files[0])}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1 file:px-3 file:rounded file:bg-white/[0.08] file:text-white"
                                />
                                {editingBlog?.cover_image_path && (
                                    <div className="flex items-center gap-3 mt-2">
                                        <img src={editingBlog.cover_image_path} alt="Cover Preview" className="w-16 h-10 object-cover rounded border border-white/[0.1]" />
                                        <span className="text-[10px] text-neutral-500">Current: {editingBlog.cover_image_path}</span>
                                    </div>
                                )}
                            </div>

                            {/* Published checkbox */}
                            <div className="space-y-1.5">
                                <label className="inline-flex items-center cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={blogForm.data.is_published}
                                        onChange={(e) => blogForm.setData('is_published', e.target.checked)}
                                        className="rounded border-white/[0.08] text-[#30D158] focus:ring-[#30D158]/20 bg-[#0A0A0A] w-4 h-4"
                                    />
                                    <span className="ms-2 text-xs font-semibold text-neutral-400">Publish immediately (shows on home page)</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/[0.06] sticky bottom-0 bg-[#151516] pb-2">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-3 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={blogForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-3 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {blogForm.processing ? 'Saving...' : 'Save Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
