import React from 'react';

export default function Blog({ blogs, handleGlowMove, setSelectedBlog }) {
    return (
        <section id="blog" className="py-24 px-6 bg-[#F5F5F7] dark:bg-[#151516] border-y border-black/[0.05] dark:border-white/[0.05]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal-on-scroll">
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Articles & Publications</h2>
                    <p className="text-[#86868B]">Sharing my thoughts, experiences, and technical tutorials.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            onMouseMove={handleGlowMove}
                            className="interactive-glow-card reveal-on-scroll bg-white/80 dark:bg-[#0A0A0A]/80 border border-black/[0.05] dark:border-white/[0.05] p-6 rounded-2xl flex flex-col shadow-sm group"
                        >
                            <div className="h-40 bg-neutral-50 dark:bg-[#151516] rounded-xl flex justify-center items-center text-[#86868B] mb-4 border border-black/[0.03] dark:border-white/[0.03] overflow-hidden">
                                {blog.cover_image_path ? (
                                    <img src={blog.cover_image_path} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                    <i className="fas fa-book-open text-3xl text-[#007AFF] opacity-80"></i>
                                )}
                            </div>
                            <h3 className="font-bold text-base mb-2 group-hover:text-[#007AFF] transition-colors">{blog.title}</h3>
                            <p className="text-xs text-[#86868B] leading-relaxed mb-6 flex-grow">{blog.excerpt}</p>
                            <button
                                onClick={() => setSelectedBlog(blog)}
                                className="w-fit text-xs font-semibold text-[#007AFF] inline-flex items-center gap-1.5 hover:underline bg-transparent border-0 cursor-pointer text-left"
                            >
                                Read Article <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
