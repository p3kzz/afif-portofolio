import React from 'react';

export default function Projects({
    projects,
    handleGlowMove,
    setSelectedProject,
    handleMagneticMove,
    resetMagnetic
}) {
    return (
        <section id="projects" className="py-24 px-6 bg-[#F5F5F7] dark:bg-[#151516] border-y border-black/[0.05] dark:border-white/[0.05]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
                    <h2 className="text-4xl font-bold tracking-tight mb-3">Featured Projects</h2>
                    <p className="text-[#86868B]">A showcase of web applications and software systems I have built.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onMouseMove={handleGlowMove}
                            className="interactive-glow-card reveal-on-scroll bg-white/80 dark:bg-[#0A0A0A]/80 border border-black/[0.05] dark:border-white/[0.05] rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 relative flex items-center justify-center border-b border-black/[0.05] dark:border-white/[0.05] overflow-hidden">
                                <span className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${project.is_active_deployment ? 'bg-[#30d158]/10 text-[#30d158]' : 'bg-black/60 text-white backdrop-blur-sm'}`}>
                                    {project.status}
                                </span>
                                {project.image_preview_path ? (
                                    <img src={project.image_preview_path} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                        <i className="fas fa-laptop-code text-5xl text-[#007AFF] opacity-80 mb-2 block"></i>
                                        <span className="text-xs font-medium text-[#86868B]">Project Preview</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold tracking-tight mb-2">{project.title}</h3>
                                <p className="text-sm text-[#86868B] leading-relaxed flex-grow mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech_stack?.map((tech, idx) => (
                                        <span key={idx} className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-[#F5F5F7] dark:bg-[#151516] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        onMouseMove={handleMagneticMove}
                                        onMouseLeave={resetMagnetic}
                                        className="magnetic-target px-4 py-2 bg-[#007AFF] text-white rounded-lg text-xs font-semibold hover:bg-[#0062CC] transition-colors"
                                    >
                                        Project Details
                                    </button>
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            onMouseMove={handleMagneticMove}
                                            onMouseLeave={resetMagnetic}
                                            className="magnetic-target px-4 py-2 bg-[#F5F5F7] dark:bg-[#151516] border border-black/[0.05] dark:border-white/[0.05] text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                        >
                                            <i className="fab fa-github mr-1.5"></i> Repository
                                        </a>
                                    )}
                                    {project.live_demo_url && (
                                        <a
                                            href={project.live_demo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            onMouseMove={handleMagneticMove}
                                            onMouseLeave={resetMagnetic}
                                            className="magnetic-target px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-lg hover:bg-emerald-500/20 transition-colors"
                                        >
                                            <i className="fas fa-external-link-alt mr-1.5"></i> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
