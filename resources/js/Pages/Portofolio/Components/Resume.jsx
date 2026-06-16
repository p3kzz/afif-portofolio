import React from 'react';

export default function Resume({ profile, handleGlowMove }) {
    return (
        <section id="resume" className="py-24 px-6 bg-[#F5F5F7] dark:bg-[#151516] border-y border-black/[0.05] dark:border-white/[0.05]">
            <div className="max-w-3xl mx-auto text-center">
                <div className="mb-12 reveal-on-scroll">
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Curriculum Vitae</h2>
                    <p className="text-[#86868B]">Download my full resume or review a summary of my background below.</p>
                </div>
                <div
                    onMouseMove={handleGlowMove}
                    className="interactive-glow-card reveal-on-scroll bg-white/80 dark:bg-[#0A0A0A]/80 border border-black/[0.05] dark:border-white/[0.05] p-8 rounded-3xl shadow-sm text-left mb-8 space-y-4"
                >
                    <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                        <h3 className="font-bold tracking-tight text-base uppercase">
                            {profile?.name || 'AFIF'}
                        </h3>
                        <p className="text-xs text-[#007AFF] font-bold tracking-wider mt-1 uppercase">
                            {profile?.title || 'FULLSTACK SOFTWARE ARCHITECT'}
                        </p>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-[#86868B] leading-relaxed font-sans whitespace-pre-wrap">
                        {profile?.short_introduction || 'Building digital solutions through software engineering, AI, and modern web technologies.'}
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    {profile?.cv_file_path ? (
                        <a
                            href="/download-cv"
                            className="bg-[#007AFF] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#0062CC] transition-all inline-flex items-center shadow-md shadow-[#007AFF]/15 transform hover:-translate-y-0.5"
                        >
                            <i className="fas fa-download mr-2 text-sm"></i> Download Resume PDF
                        </a>
                    ) : (
                        <button
                            onClick={() => alert('Initiating layout compilation pipeline. Generating print-optimized core resume document structures.')}
                            className="bg-[#007AFF] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#0062CC] transition-all"
                        >
                            <i className="fas fa-download mr-2 text-sm"></i> Download Resume PDF
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
