import React from 'react';

export default function Services({ handleGlowMove }) {
    const services = [
        {
            icon: 'fa-laptop-code',
            title: 'Fullstack Web Apps',
            desc: 'Building responsive, high-performance web applications using Laravel, React, and clean modern styling frameworks.'
        },
        {
            icon: 'fa-server',
            title: 'Backend & API Systems',
            desc: 'Designing robust database architectures (SQL/MySQL), RESTful APIs, securing routes, and managing session security.'
        },
        {
            icon: 'fa-brain',
            title: 'AI Integrations',
            desc: 'Integrating artificial intelligence patterns, prompt automation, parsing structures, and smart vector interfaces.'
        },
        {
            icon: 'fa-cubes',
            title: 'DevOps & Docker',
            desc: 'Containerizing applications via Docker, managing isolated environments, Linux system configurations, and hosting.'
        }
    ];

    const workflowSteps = [
        { step: '01', title: 'Analyze', desc: 'Understanding requirements, database design, and systems architecture mapping.' },
        { step: '02', title: 'Design', desc: 'Structuring relational schemas, drafting API endpoints, and wireframing layouts.' },
        { step: '03', title: 'Code', desc: 'Writing clean, test-driven backend code and assembling responsive frontend panels.' },
        { step: '04', title: 'Deploy', desc: 'Isolating runtimes via Docker and compiling production builds on live host nodes.' }
    ];

    return (
        <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-black/[0.05] dark:border-white/[0.05]">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-3">Services & Workflow</h2>
                <p className="text-[#86868B] text-sm lg:text-base">The technical services I offer and the structural process I follow to build software.</p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {services.map((svc, idx) => (
                    <div
                        key={idx}
                        onMouseMove={handleGlowMove}
                        className="interactive-glow-card reveal-on-scroll p-6 rounded-3xl bg-neutral-50/50 dark:bg-[#151516]/50 border border-black/[0.05] dark:border-white/[0.05] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-10 h-10 bg-[#007AFF]/10 text-[#007AFF] rounded-xl flex justify-center items-center text-sm mb-5">
                            <i className={`fas ${svc.icon}`}></i>
                        </div>
                        <h3 className="text-base font-bold mb-2">{svc.title}</h3>
                        <p className="text-xs text-[#86868B] leading-relaxed">{svc.desc}</p>
                    </div>
                ))}
            </div>

            {/* Workflow Steps */}
            <div className="bg-[#F5F5F7] dark:bg-[#151516] rounded-3xl border border-black/[0.05] dark:border-white/[0.05] p-8 lg:p-12 reveal-on-scroll">
                <h3 className="text-lg font-bold text-center mb-10 uppercase tracking-wider">My Development Methodology</h3>
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {workflowSteps.map((ws, idx) => (
                        <div key={idx} className="space-y-3 relative group">
                            <div className="text-3xl font-extrabold text-[#007AFF]/25 group-hover:text-[#007AFF] transition-colors">{ws.step}</div>
                            <h4 className="text-sm font-bold uppercase tracking-wide">{ws.title}</h4>
                            <p className="text-xs text-[#86868B] leading-relaxed">{ws.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
