import React from 'react';

export default function CaseStudyModal({ selectedProject, setSelectedProject }) {
    if (!selectedProject) return null;

    return (
        <div
            className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-md flex justify-center items-center z-[100] px-4 animate-fade-in"
            onClick={() => setSelectedProject(null)}
        >
            <div
                className="bg-white dark:bg-[#0A0A0A] border border-black/[0.1] dark:border-white/[0.1] w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl relative animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#151516] flex justify-center items-center hover:scale-105 transition-transform"
                    aria-label="Close Modal"
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="bg-gradient-to-br from-[#007AFF] to-[#5856d6] p-8 pt-16 text-white">
                    <span className="bg-white/20 text-white backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {selectedProject.status}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mt-3">{selectedProject.title}</h2>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-base font-semibold text-[#007AFF]">{selectedProject.tagline}</p>

                    <div className="grid grid-cols-3 gap-4 bg-[#F5F5F7] dark:bg-[#151516] p-5 rounded-2xl text-xs">
                        <div>
                            <h4 className="text-[#86868B] font-bold tracking-wide uppercase mb-1">My Role</h4>
                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedProject.my_role}</p>
                        </div>
                        <div>
                            <h4 className="text-[#86868B] font-bold tracking-wide uppercase mb-1">Tech Stack</h4>
                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                                {selectedProject.tech_stack?.join(', ')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[#86868B] font-bold tracking-wide uppercase mb-1">Status</h4>
                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">Completed</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-bold border-l-2 border-[#007AFF] pl-2 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wider uppercase">
                            The Problem
                        </h3>
                        <p className="text-sm text-[#86868B] leading-relaxed">{selectedProject.problem_statement}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold border-l-2 border-[#007AFF] pl-2 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wider uppercase">
                            The Solution
                        </h3>
                        <p className="text-sm text-[#86868B] leading-relaxed">{selectedProject.solution_design}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold border-l-2 border-[#007AFF] pl-2 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wider uppercase">
                            Challenges & Mitigations
                        </h3>
                        <p className="text-sm text-[#86868B] leading-relaxed">{selectedProject.challenges_mitigation}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold border-l-2 border-[#007AFF] pl-2 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wider uppercase">
                            Architecture / Tech Details
                        </h3>
                        <p className="text-sm text-[#86868B] leading-relaxed">{selectedProject.architecture_overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
