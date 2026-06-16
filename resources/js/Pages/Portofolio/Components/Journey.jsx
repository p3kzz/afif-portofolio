import React from 'react';

export default function Journey({ educations = [] }) {
    return (
        <section id="journey" className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-3">Academic Journey</h2>
                <p className="text-[#86868B]">Timeline of my education, academic accomplishments, and self-learning journey.</p>
            </div>
            <div className="relative border-l-2 border-black/[0.05] dark:border-white/[0.05] ml-4 pl-8 space-y-12">
                {educations.length === 0 ? (
                    <div className="text-center text-xs text-neutral-500 italic py-4">No academic history logs loaded.</div>
                ) : (
                    educations.map((edu) => (
                        <div key={edu.id} className="relative group reveal-on-scroll">
                            <div className="absolute -left-[41px] top-1.5 w-5 h-5 bg-white dark:bg-[#0A0A0A] border-4 border-[#007AFF] rounded-full group-hover:bg-[#007AFF] transition-colors duration-300"></div>
                            <div className="text-xs font-bold text-[#007AFF] tracking-wider mb-1 uppercase">{edu.time_period}</div>
                            <h3 className="text-xl font-bold tracking-tight">{edu.title}</h3>
                            <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">{edu.company}</div>
                            {edu.description.includes('\n') ? (
                                <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#86868B]">
                                    {edu.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                            {line.replace(/^[-\*\s•]+/, '')}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-[#86868B] leading-relaxed">{edu.description}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
