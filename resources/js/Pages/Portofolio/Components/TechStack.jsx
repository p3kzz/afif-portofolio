import React from 'react';

export default function TechStack({ skillCategories }) {
    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-3">Skills & Technologies</h2>
                <p className="text-[#86868B]">The languages, frameworks, and tools I use to bring ideas to life.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((cat) => (
                    <div 
                        key={cat.id} 
                        className="space-y-6 reveal-on-scroll bg-neutral-50/50 dark:bg-[#151516]/50 border border-black/[0.05] dark:border-white/[0.05] p-8 rounded-3xl backdrop-blur-md"
                    >
                        <h3 className="text-lg font-bold flex items-center gap-3 border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
                            <i className={`fas ${cat.icon} text-[#007AFF] text-base`}></i>
                            <span>{cat.name}</span>
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {cat.skills.map((skill) => (
                                <span 
                                    key={skill.id} 
                                    className="px-4 py-2 text-xs font-semibold rounded-full bg-white dark:bg-[#0A0A0A] border border-black/[0.05] dark:border-white/[0.05] text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF] hover:text-[#007AFF] transition-colors duration-250 shadow-sm inline-block cursor-default"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
