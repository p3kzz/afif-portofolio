import React from 'react';

export default function Hero({ profile, typedText, handleMagneticMove, resetMagnetic }) {
    return (
        <section id="home" className="pt-40 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 reveal-on-scroll">
                {/* <div className="inline-flex items-center gap-2 bg-[#007AFF]/10 text-[#007AFF] px-4 py-1.5 rounded-full text-xs font-semibold">
                    <i className="fas fa-code-branch"></i> Apple Developer Academy Candidate '26
                </div> */}
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
                    Hi, I am <span className="text-[#007AFF]">{profile?.name || 'Afif'}</span>
                </h1>
                <div className="text-xl lg:text-3xl font-semibold text-[#86868B] h-10">
                    {typedText}<span className="text-[#007AFF] animate-pulse">|</span>
                </div>
                <p className="text-base lg:text-lg text-[#86868B] max-w-xl leading-relaxed">
                    {profile?.tagline || 'Building digital solutions through software engineering, AI, and modern web technologies.'}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <a
                        href="#projects"
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={resetMagnetic}
                        className="magnetic-target bg-[#007AFF] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#0062CC] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#007AFF]/10"
                    >
                        View Projects <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                    <a
                        href="#resume"
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={resetMagnetic}
                        className="magnetic-target bg-[#F5F5F7] dark:bg-[#151516] border border-black/[0.08] dark:border-white/[0.08] px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all transform hover:-translate-y-0.5"
                    >
                        See Resume
                    </a>
                    <a
                        href="#contact"
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={resetMagnetic}
                        className="magnetic-target text-[#007AFF] px-6 py-3 rounded-xl text-sm font-semibold hover:underline transition-all flex items-center gap-1"
                    >
                        Contact Me <i className="fas fa-chevron-right text-xs"></i>
                    </a>
                </div>
            </div>
            <div className="lg:col-span-5 flex justify-center reveal-on-scroll">
                <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-tr from-[#007AFF] to-[#5856d6] rounded-[40%_60%_70%_30%/_40%_40%_60%_60%] p-1.5 animate-[morph_10s_ease-in-out_infinite_alternate] shadow-xl shadow-[#007AFF]/20 overflow-hidden">
                    <div className="w-full h-full bg-[#F5F5F7] dark:bg-[#151516] rounded-inherit flex justify-center items-center overflow-hidden">
                        {profile?.avatar_path ? (
                            <img src={profile.avatar_path} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                            <i className="fas fa-user-astronaut text-8xl text-[#007AFF]"></i>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
