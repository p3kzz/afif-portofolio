import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ metrics, recent_comments, recent_projects }) {
    // Generate star rating icons
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star text-[10px] ${
                        i <= rating ? 'text-[#FFD60A]' : 'text-white/[0.15]'
                    }`}
                ></i>
            );
        }
        return <div className="flex gap-0.5">{stars}</div>;
    };

    return (
        <AdminLayout activeTab="dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Welcome & System State Card */}
                <div className="bg-gradient-to-r from-[#1E1E24]/60 to-[#121215]/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                    <div className="absolute right-[-50px] top-[-50px] w-48 h-48 rounded-full bg-[#007AFF]/5 blur-[60px] pointer-events-none"></div>
                    <div className="space-y-2 relative z-10">
                        <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest bg-[#007AFF]/10 px-2.5 py-1 rounded-full">System Overview</span>
                        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight mt-2">Welcome Back, System Operator</h2>
                        <p className="text-xs text-[#86868B] max-w-xl">
                            All services are fully operational. You can manage your projects, approve user commentary, edit technical skills, and draft articles.
                        </p>
                    </div>
                    <div className="flex gap-3 relative z-10 w-full md:w-auto">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none text-center px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-semibold text-white transition-all"
                        >
                            <i className="fas fa-external-link-alt mr-2"></i>View Live Portfolio
                        </a>
                    </div>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Projects */}
                    <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] group-hover:scale-105 transition-transform">
                                <i className="fas fa-briefcase text-sm"></i>
                            </div>
                            <span className="text-[9px] bg-emerald-500/10 text-[#30D158] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Sync Active</span>
                        </div>
                        <div className="mt-4">
                            <span className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">Active Projects</span>
                            <h3 className="text-3xl font-extrabold text-white mt-1">{metrics.total_projects}</h3>
                            <p className="text-[10px] text-[#86868B] mt-1">Showcased in layout grid</p>
                        </div>
                    </div>

                    {/* Pending Comments */}
                    <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                                metrics.pending_comments > 0 ? 'bg-[#FF9500]/10 text-[#FF9500]' : 'bg-white/[0.06] text-[#86868B]'
                            }`}>
                                <i className="fas fa-comments text-sm"></i>
                            </div>
                            {metrics.pending_comments > 0 && (
                                <span className="text-[9px] bg-[#FF453A]/10 text-[#FF453A] font-bold uppercase tracking-wider px-2 py-0.5 rounded animate-pulse">Action Required</span>
                            )}
                        </div>
                        <div className="mt-4">
                            <span className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">Pending Reviews</span>
                            <h3 className={`text-3xl font-extrabold mt-1 ${metrics.pending_comments > 0 ? 'text-[#FF9500]' : 'text-white'}`}>
                                {metrics.pending_comments}
                            </h3>
                            <p className="text-[10px] text-[#86868B] mt-1">Visitor Ledger submissions</p>
                        </div>
                    </div>

                    {/* Blogs */}
                    <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-[#BF5AF2]/10 flex items-center justify-center text-[#BF5AF2] group-hover:scale-105 transition-transform">
                                <i className="fas fa-newspaper text-sm"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">Blog Posts</span>
                            <h3 className="text-3xl font-extrabold text-white mt-1">{metrics.total_blogs}</h3>
                            <p className="text-[10px] text-[#86868B] mt-1">Published articles</p>
                        </div>
                    </div>

                    {/* Tech Stack/Skills */}
                    <div className="bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-[#30D158]/10 flex items-center justify-center text-[#30D158] group-hover:scale-105 transition-transform">
                                <i className="fas fa-laptop-code text-sm"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">Tech Stack Nodes</span>
                            <h3 className="text-3xl font-extrabold text-white mt-1">{metrics.total_skills}</h3>
                            <p className="text-[10px] text-[#86868B] mt-1">Skills showcased online</p>
                        </div>
                    </div>
                </div>

                {/* Operations Section: Two-Column Ledger */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Recent Comments Ledger (7 columns) */}
                    <div className="lg:col-span-7 bg-[#151516]/30 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 flex flex-col h-[520px]">
                        <div className="flex justify-between items-center pb-5 border-b border-white/[0.06] mb-5">
                            <div>
                                <h3 className="text-sm font-bold text-white tracking-tight">Visitor Ledger Logs</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Approve or moderate user responses</p>
                            </div>
                            <span className="text-[10px] text-[#007AFF] font-bold hover:underline cursor-pointer">View All Logs</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                            {recent_comments.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-neutral-500 mb-3">
                                        <i className="fas fa-comment-slash text-lg"></i>
                                    </div>
                                    <p className="text-xs font-semibold text-neutral-400">No commentary found</p>
                                    <p className="text-[10px] text-neutral-600 mt-1">Visitor ledger submissions will appear here.</p>
                                </div>
                            ) : (
                                recent_comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="bg-[#1C1C1E]/50 border border-white/[0.04] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#1C1C1E]"
                                    >
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-white text-[10px]">
                                                    {comment.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white">{comment.name}</h4>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        {renderStars(comment.rating)}
                                                        <span className="text-[9px] text-neutral-500">•</span>
                                                        <span className="text-[9px] text-neutral-400">
                                                            {new Date(comment.created_at).toLocaleDateString('id-ID', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-neutral-300 leading-relaxed pl-9 italic">
                                                "{comment.comment}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 pl-9 md:pl-0 self-end md:self-center">
                                            {comment.is_approved ? (
                                                <span className="text-[9px] font-bold text-[#30D158] bg-[#30D158]/10 border border-[#30D158]/20 px-2 py-1 rounded-full uppercase tracking-wider">
                                                    Approved
                                                </span>
                                            ) : (
                                                <>
                                                    <button className="text-[9px] font-bold text-white bg-[#30D158]/80 hover:bg-[#30D158] px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                                        Approve
                                                    </button>
                                                    <button className="text-[9px] font-bold text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] px-3 py-1.5 rounded-lg transition-colors">
                                                        Spam
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Projects Deployment (5 columns) */}
                    <div className="lg:col-span-5 bg-[#151516]/30 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 flex flex-col h-[520px]">
                        <div className="flex justify-between items-center pb-5 border-b border-white/[0.06] mb-5">
                            <div>
                                <h3 className="text-sm font-bold text-white tracking-tight">Projects Showcase</h3>
                                <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Deployment index & registry</p>
                            </div>
                            <span className="text-[10px] text-[#007AFF] font-bold hover:underline cursor-pointer">Register New</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                            {recent_projects.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-neutral-500 mb-3">
                                        <i className="fas fa-folder-open text-lg"></i>
                                    </div>
                                    <p className="text-xs font-semibold text-neutral-400">Registry empty</p>
                                    <p className="text-[10px] text-neutral-600 mt-1">Projects will show up here once added.</p>
                                </div>
                            ) : (
                                recent_projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-[#1C1C1E]/50 border border-white/[0.04] rounded-2xl p-4 space-y-3 transition-all hover:bg-[#1C1C1E]"
                                    >
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-bold text-white truncate">{project.title}</h4>
                                                <p className="text-[10px] text-neutral-400 truncate mt-0.5">{project.tagline}</p>
                                            </div>
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                                project.status === 'Completed' || project.status === 'production'
                                                    ? 'bg-[#30D158]/10 text-[#30D158]'
                                                    : 'bg-[#FF9500]/10 text-[#FF9500]'
                                            }`}>
                                                {project.status || 'Active'}
                                            </span>
                                        </div>

                                        {/* Tech Stack Badges */}
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(project.tech_stack) ? (
                                                project.tech_stack.slice(0, 3).map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[8px] bg-white/[0.04] border border-white/[0.06] text-neutral-300 font-bold px-1.5 py-0.5 rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[8px] text-neutral-500">No tech tags</span>
                                            )}
                                            {Array.isArray(project.tech_stack) && project.tech_stack.length > 3 && (
                                                <span className="text-[8px] text-neutral-400 font-bold px-1 py-0.5">
                                                    +{project.tech_stack.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.03]">
                                            <span className="text-[9px] font-bold text-neutral-500 uppercase">
                                                Order: {project.order_index}
                                            </span>
                                            <div className="flex gap-2">
                                                <button className="text-[9px] font-bold text-[#007AFF] hover:underline bg-transparent border-0 cursor-pointer">
                                                    Edit
                                                </button>
                                                <span className="text-[9px] text-neutral-700">|</span>
                                                <a
                                                    href={project.live_demo_url || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-[9px] font-bold hover:underline ${
                                                        project.live_demo_url ? 'text-[#30D158]' : 'text-neutral-600 pointer-events-none'
                                                    }`}
                                                >
                                                    Demo
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
