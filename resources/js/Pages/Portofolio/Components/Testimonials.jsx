import React from 'react';

export default function Testimonials({ testimonials, testiIdx, prevTesti, nextTesti }) {
    return (
        <section id="testimonials" className="py-24 px-6 max-w-4xl mx-auto text-center">
            <div className="mb-12 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-2">Recommendations</h2>
                <p className="text-[#86868B]">What my mentors, colleagues, and peers say about working with me.</p>
            </div>
            {testimonials.length > 0 && (
                <div className="overflow-hidden relative w-full max-w-2xl mx-auto reveal-on-scroll">
                    <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${testiIdx * 100}%)` }}>
                        {testimonials.map((t) => (
                            <div key={t.id} className="min-w-full px-6 space-y-6">
                                <p className="text-lg md:text-xl font-medium italic text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                                    "{t.content}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">{t.author_name}</h4>
                                    <p className="text-xs text-[#86868B] mt-0.5">{t.author_role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center gap-3 mt-8">
                <button
                    onClick={prevTesti}
                    className="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08] flex justify-center items-center hover:bg-neutral-50 dark:hover:bg-[#151516]"
                    aria-label="Previous Testimonial"
                >
                    <i className="fas fa-arrow-left text-xs"></i>
                </button>
                <button
                    onClick={nextTesti}
                    className="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08] flex justify-center items-center hover:bg-neutral-50 dark:hover:bg-[#151516]"
                    aria-label="Next Testimonial"
                >
                    <i className="fas fa-arrow-right text-xs"></i>
                </button>
            </div>
        </section>
    );
}
