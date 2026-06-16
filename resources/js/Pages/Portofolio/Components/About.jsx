import React from 'react';

export default function About({ profile, aboutCards, handleGlowMove }) {
    return (
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-black/[0.05] dark:border-white/[0.05]">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight">About Me</h2>
                <p className="text-[#86868B] text-sm lg:text-base">{profile?.short_introduction}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {aboutCards.map((card) => (
                    <div
                        key={card.id}
                        onMouseMove={handleGlowMove}
                        className="interactive-glow-card reveal-on-scroll p-8 rounded-3xl bg-neutral-50/80 dark:bg-[#151516]/80 border border-black/[0.05] dark:border-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-11 h-11 bg-[#007AFF]/10 text-[#007AFF] rounded-xl flex justify-center items-center text-lg mb-6">
                            <i className={`fas ${card.icon}`}></i>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                        <p className="text-sm text-[#86868B] leading-relaxed">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
