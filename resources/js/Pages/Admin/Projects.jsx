import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Projects({ projects }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Dynamic Tag input state
    const [newTech, setNewTech] = useState('');

    const projectForm = useForm({
        title: '',
        tagline: '',
        description: '',
        tech_stack: [],
        status: '',
        is_active_deployment: true,
        my_role: '',
        problem_statement: '',
        solution_design: '',
        challenges_mitigation: '',
        architecture_overview: '',
        live_demo_url: '',
        github_url: '',
        image: null,
        order_index: 0,
    });

    const openAdd = () => {
        setEditingProject(null);
        projectForm.reset();
        setModalOpen(true);
    };

    const openEdit = (project) => {
        setEditingProject(project);
        projectForm.setData({
            title: project.title,
            tagline: project.tagline,
            description: project.description,
            tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
            status: project.status,
            is_active_deployment: !!project.is_active_deployment,
            my_role: project.my_role,
            problem_statement: project.problem_statement,
            solution_design: project.solution_design,
            challenges_mitigation: project.challenges_mitigation,
            architecture_overview: project.architecture_overview,
            live_demo_url: project.live_demo_url || '',
            github_url: project.github_url || '',
            image: null,
            order_index: project.order_index,
        });
        setModalOpen(true);
    };

    const addTechTag = (e) => {
        e.preventDefault();
        if (newTech.trim()) {
            projectForm.setData('tech_stack', [...projectForm.data.tech_stack, newTech.trim()]);
            setNewTech('');
        }
    };

    const removeTechTag = (index) => {
        const filtered = projectForm.data.tech_stack.filter((_, i) => i !== index);
        projectForm.setData('tech_stack', filtered);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Since we are uploading image files, we should submit as a POST.
        // For editing, we hit our special POST endpoint 'admin.projects.update.post'
        if (editingProject) {
            projectForm.post(route('admin.projects.update.post', editingProject.id), {
                onSuccess: () => setModalOpen(false)
            });
        } else {
            projectForm.post(route('admin.projects.store'), {
                onSuccess: () => setModalOpen(false)
            });
        }
    };

    const deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project? This will permanently delete all case study data associated with it.')) {
            router.delete(route('admin.projects.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="projects">
            <Head title="Projects Showcase Management" />

            <div className="space-y-6">
                {/* Header widget */}
                <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                    <div>
                        <h3 className="text-sm font-bold text-white">Project Showcase Catalog</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Manage portfolios and complete case study modals</p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                    >
                        Register New Project
                    </button>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Project Screenshot preview header */}
                            <div className="h-44 bg-neutral-900 relative border-b border-white/[0.04] flex items-center justify-center overflow-hidden">
                                {project.image_preview_path ? (
                                    <img src={project.image_preview_path} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-neutral-600 flex flex-col items-center gap-1.5">
                                        <i className="fas fa-image text-3xl"></i>
                                        <span className="text-[9px] font-bold uppercase tracking-widest">No screenshot</span>
                                    </div>
                                )}
                                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                                    project.is_active_deployment ? 'bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/35' : 'bg-white/[0.06] text-[#86868B]'
                                }`}>
                                    {project.status}
                                </span>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[9px] text-neutral-500 font-bold uppercase">
                                        <span>Role: {project.my_role}</span>
                                        <span>Index: {project.order_index}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white tracking-tight">{project.title}</h4>
                                    <p className="text-xs text-neutral-400 font-semibold leading-relaxed line-clamp-1">{project.tagline}</p>
                                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{project.description}</p>
                                    
                                    {/* Tech tags list */}
                                    <div className="flex flex-wrap gap-1 pt-2">
                                        {Array.isArray(project.tech_stack) && project.tech_stack.map((tech, idx) => (
                                            <span key={idx} className="text-[8px] bg-white/[0.04] border border-white/[0.06] text-neutral-300 font-bold px-1.5 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-white/[0.03] w-full">
                                    <button
                                        onClick={() => openEdit(project)}
                                        className="flex-1 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-xs font-bold text-white flex items-center justify-center gap-1.5"
                                    >
                                        <i className="fas fa-edit"></i> Edit Details
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="py-2 px-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs text-red-500 flex items-center justify-center"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal CRUD Form */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[680px] h-[90vh] rounded-3xl p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingProject ? 'Modify Project showcase' : 'Register New Project'}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto space-y-5 py-4 pr-1 scrollbar-thin">
                            
                            {/* Card Grid sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                {/* Title */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Project Title</label>
                                    <input
                                        type="text"
                                        value={projectForm.data.title}
                                        onChange={(e) => projectForm.setData('title', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="Scholarship Lab"
                                        required
                                    />
                                    {projectForm.errors.title && <p className="text-red-500 text-[10px]">{projectForm.errors.title}</p>}
                                </div>

                                {/* Tagline */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Project Tagline</label>
                                    <input
                                        type="text"
                                        value={projectForm.data.tagline}
                                        onChange={(e) => projectForm.setData('tagline', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="AI Recommendation Platform"
                                        required
                                    />
                                    {projectForm.errors.tagline && <p className="text-red-500 text-[10px]">{projectForm.errors.tagline}</p>}
                                </div>

                                {/* Status */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Status Text</label>
                                    <input
                                        type="text"
                                        value={projectForm.data.status}
                                        onChange={(e) => projectForm.setData('status', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="Active Operational, Production Ready"
                                        required
                                    />
                                </div>

                                {/* My Role */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">My Role</label>
                                    <input
                                        type="text"
                                        value={projectForm.data.my_role}
                                        onChange={(e) => projectForm.setData('my_role', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="Lead Architect / Fullstack"
                                        required
                                    />
                                </div>

                                {/* Order Index */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Order Position Index</label>
                                    <input
                                        type="number"
                                        value={projectForm.data.order_index}
                                        onChange={(e) => projectForm.setData('order_index', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Deployment Active Toggle */}
                                <div className="space-y-1.5 flex flex-col justify-end pb-2">
                                    <label className="inline-flex items-center cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={projectForm.data.is_active_deployment}
                                            onChange={(e) => projectForm.setData('is_active_deployment', e.target.checked)}
                                            className="rounded border-white/[0.08] text-[#007AFF] focus:ring-[#007AFF]/20 bg-[#0A0A0A] w-4 h-4"
                                        />
                                        <span className="ms-2 text-xs font-semibold text-neutral-400">Green active dot on badge (Live Deployment)</span>
                                    </label>
                                </div>

                                {/* Links */}
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">GitHub Repository URL</label>
                                    <input
                                        type="url"
                                        value={projectForm.data.github_url}
                                        onChange={(e) => projectForm.setData('github_url', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Live Demo URL</label>
                                    <input
                                        type="url"
                                        value={projectForm.data.live_demo_url}
                                        onChange={(e) => projectForm.setData('live_demo_url', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* Screenshot Upload */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Screenshot image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => projectForm.setData('image', e.target.files[0])}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-2 text-xs text-neutral-400 file:mr-4 file:py-1 file:px-3 file:rounded file:bg-white/[0.08] file:text-white"
                                    />
                                    {editingProject?.image_preview_path && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <img src={editingProject.image_preview_path} alt="Preview" className="w-16 h-10 object-cover rounded border border-white/[0.1]" />
                                            <span className="text-[10px] text-neutral-500">Current: {editingProject.image_preview_path}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Brief Description */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Brief Description (Home Card)</label>
                                    <textarea
                                        value={projectForm.data.description}
                                        onChange={(e) => projectForm.setData('description', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-20 resize-none"
                                        placeholder="Enter summary..."
                                        required
                                    />
                                </div>

                                {/* Tech Stack tagger */}
                                <div className="space-y-2 md:col-span-2 bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl">
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Tech Stack Tags</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTech}
                                            onChange={(e) => setNewTech(e.target.value)}
                                            className="flex-1 bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                                            placeholder="Press enter to add (e.g. React, Node.js)"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    addTechTag(e);
                                                }
                                            }}
                                        />
                                        <button type="button" onClick={addTechTag} className="bg-white/[0.06] hover:bg-white/[0.1] text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Add</button>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {projectForm.data.tech_stack.map((tech, idx) => (
                                            <span key={idx} className="bg-white/[0.03] border border-white/[0.06] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                                                <span>{tech}</span>
                                                <button type="button" onClick={() => removeTechTag(idx)} className="text-red-500 text-xs">
                                                    <i className="fas fa-times-circle"></i>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CASE STUDY DETAILS */}
                                <div className="md:col-span-2 pt-4 border-t border-white/[0.06]">
                                    <h4 className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest mb-4">Deep Case Study Modal details</h4>
                                    
                                    <div className="space-y-4">
                                        {/* Problem Statement */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Problem Statement</label>
                                            <textarea
                                                value={projectForm.data.problem_statement}
                                                onChange={(e) => projectForm.setData('problem_statement', e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-28 resize-none"
                                                placeholder="What is the problem/challenge this project solves?"
                                                required
                                            />
                                        </div>

                                        {/* Solution Design */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Solution Design</label>
                                            <textarea
                                                value={projectForm.data.solution_design}
                                                onChange={(e) => projectForm.setData('solution_design', e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-28 resize-none"
                                                placeholder="Explain the architectural solutions or feature choices..."
                                                required
                                            />
                                        </div>

                                        {/* Challenges & Mitigation */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Challenges & Mitigation</label>
                                            <textarea
                                                value={projectForm.data.challenges_mitigation}
                                                onChange={(e) => projectForm.setData('challenges_mitigation', e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-28 resize-none"
                                                placeholder="What obstacles did you face, and how did you resolve them?"
                                                required
                                            />
                                        </div>

                                        {/* Architecture Overview */}
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Architecture Overview</label>
                                            <textarea
                                                value={projectForm.data.architecture_overview}
                                                onChange={(e) => projectForm.setData('architecture_overview', e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none h-28 resize-none"
                                                placeholder="Provide summaries of data flows, API layouts, system stack details..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/[0.06] sticky bottom-0 bg-[#151516] pb-2 z-10">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-3 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={projectForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-3 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {projectForm.processing ? 'Saving details...' : 'Save Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
