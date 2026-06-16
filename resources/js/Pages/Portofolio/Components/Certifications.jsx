import React from 'react';

export default function Certifications({
    certifications,
    certIdx,
    prevCert,
    nextCert,
    handleGlowMove
}) {
    return (
        <section id="certifications" className="py-24 px-6 bg-[#F5F5F7] dark:bg-[#151516] border-y border-black/[0.05] dark:border-white/[0.05]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 reveal-on-scroll">
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Licenses & Certifications</h2>
                    <p className="text-[#86868B]">Professional certifications and credentials I have earned.</p>
                </div>
                <div className="overflow-hidden relative w-full">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${certIdx * (typeof window !== 'undefined' && window.innerWidth > 768 ? 33.33 : 100)}%)` }}
                    >
                        {certifications.map((cert) => (
                            <div
                                key={cert.id}
                                onMouseMove={handleGlowMove}
                                className="interactive-glow-card min-w-full md:min-w-[calc(33.333%-16px)] max-w-full md:max-w-[calc(33.333%-16px)] bg-white/80 dark:bg-[#0A0A0A]/80 border border-black/[0.05] dark:border-white/[0.05] p-6 rounded-2xl flex flex-col shadow-sm"
                            >
                                <div className="h-40 bg-[#F5F5F7] dark:bg-[#151516] rounded-xl flex flex-col justify-center items-center mb-4 border border-black/[0.03] dark:border-white/[0.03] text-[#86868B] overflow-hidden">
                                    {cert.image_path ? (
                                        <img src={cert.image_path} alt={cert.title} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <>
                                            <i className="fas fa-certificate text-4xl text-[#007AFF] mb-2"></i>
                                            <span className="text-[10px] font-bold tracking-widest uppercase">Certificate Credential</span>
                                        </>
                                    )}
                                </div>
                                <h3 className="font-bold text-sm tracking-tight mb-1">{cert.title}</h3>
                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-xs text-[#86868B] font-medium">{cert.issuer} — {cert.year}</p>
                                    {cert.credential_url && (
                                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#007AFF] hover:underline flex items-center gap-1">
                                            Verify <i className="fas fa-external-link-alt text-[8px]"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-3 mt-8">
                    <button
                        onClick={prevCert}
                        disabled={certIdx === 0}
                        className="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08] flex justify-center items-center bg-white dark:bg-[#0A0A0A] disabled:opacity-40 transition-opacity"
                        aria-label="Previous Certification"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                        onClick={nextCert}
                        disabled={certIdx >= certifications.length - (typeof window !== 'undefined' && window.innerWidth > 768 ? 3 : 1)}
                        className="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08] flex justify-center items-center bg-white dark:bg-[#0A0A0A] disabled:opacity-40 transition-opacity"
                        aria-label="Next Certification"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
