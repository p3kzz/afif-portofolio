import React from 'react';

export default function BlogJournalModal({ selectedBlog, setSelectedBlog }) {
    if (!selectedBlog) return null;

    return (
        <div
            className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-md flex justify-center items-center z-[100] px-4 animate-fade-in"
            onClick={() => setSelectedBlog(null)}
        >
            <div
                className="bg-white dark:bg-[#0A0A0A] border border-black/[0.1] dark:border-white/[0.1] w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl relative animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 flex justify-center items-center hover:scale-105 transition-transform z-10 text-white md:text-neutral-800 dark:md:text-neutral-200"
                    aria-label="Close Modal"
                >
                    <i className="fas fa-times"></i>
                </button>

                {/* Banner/Header with Cover Image */}
                <div className="h-64 bg-neutral-900 relative flex items-center justify-center overflow-hidden border-b border-black/[0.05] dark:border-white/[0.05]">
                    {selectedBlog.cover_image_path ? (
                        <img src={selectedBlog.cover_image_path} alt={selectedBlog.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-neutral-500">
                            <i className="fas fa-book-open text-5xl mb-2 text-[#007AFF]"></i>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#007AFF] px-2.5 py-1 rounded-full">
                            Engineering Journal
                        </span>
                        <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight mt-1.5">{selectedBlog.title}</h2>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center text-[10px] text-[#86868B] font-bold uppercase tracking-wider pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                        <span>Journal Log</span>
                        <span>
                            Published:{' '}
                            {new Date(selectedBlog.created_at).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-[#F5F5F7] dark:bg-[#151516] p-5 rounded-2xl">
                        <p className="text-xs text-[#86868B] italic leading-relaxed">
                            "{selectedBlog.excerpt}"
                        </p>
                    </div>

                    {/* Full Content */}
                    <div className="space-y-4 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed whitespace-pre-wrap font-sans">
                        {selectedBlog.content || (
                            <p className="text-neutral-500 italic text-xs">No detail logs have been written for this journal entry.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
