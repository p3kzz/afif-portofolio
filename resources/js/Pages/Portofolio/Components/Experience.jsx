import React from 'react';

export default function Experience({ experiences }) {
    return (
        <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-3">Professional Experience</h2>
                <p className="text-[#86868B]">Timeline of my professional work history and software engineering roles.</p>
            </div>
            <div className="relative border-l-2 border-black/[0.05] dark:border-white/[0.05] ml-4 pl-8 space-y-12">
                {experiences.map((exp) => (
                    <div key={exp.id} className="relative group reveal-on-scroll">
                        <div className="absolute -left-[41px] top-1.5 w-5 h-5 bg-white dark:bg-[#0A0A0A] border-4 border-[#007AFF] rounded-full group-hover:bg-[#007AFF] transition-colors duration-300"></div>
                        <div className="text-xs font-bold text-[#007AFF] tracking-wider mb-1 uppercase">{exp.time_period}</div>
                        <h3 className="text-xl font-bold tracking-tight">{exp.title}</h3>
                        <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">{exp.company}</div>
                        {exp.description.includes('\n') ? (
                            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#86868B]">
                                {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        {line.replace(/^[-\*\s•]+/, '')}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-[#86868B] leading-relaxed">{exp.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
