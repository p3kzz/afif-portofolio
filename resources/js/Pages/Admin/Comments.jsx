import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Comments({ comments }) {
    const [filter, setFilter] = useState('all'); // all, pending, approved

    const filteredComments = comments.filter((comment) => {
        if (filter === 'pending') return !comment.is_approved;
        if (filter === 'approved') return comment.is_approved;
        return true;
    });

    const toggleApproval = (id) => {
        router.put(route('admin.comments.toggle-approve', id));
    };

    const deleteComment = (id) => {
        if (confirm('Are you sure you want to delete this comment? This cannot be undone.')) {
            router.delete(route('admin.comments.destroy', id));
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star text-[9px] ${
                        i <= rating ? 'text-[#FFD60A]' : 'text-white/[0.15]'
                    }`}
                ></i>
            );
        }
        return <div className="flex gap-0.5">{stars}</div>;
    };

    return (
        <AdminLayout activeTab="comments">
            <Head title="Comments Ledger Moderation" />

            <div className="space-y-6">
                {/* Header widget */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-white">Visitor Ledger Commentary</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Approve comments to render them on the live portfolio ledger</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                filter === 'all' ? 'bg-[#007AFF] text-white shadow' : 'text-[#86868B] hover:text-white'
                            }`}
                        >
                            All ({comments.length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                filter === 'pending' ? 'bg-[#FF9500]/20 text-[#FF9500] border border-[#FF9500]/30' : 'text-[#86868B] hover:text-white'
                            }`}
                        >
                            Pending ({comments.filter(c => !c.is_approved).length})
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                filter === 'approved' ? 'bg-[#30D158]/20 text-[#30D158] border border-[#30D158]/30' : 'text-[#86868B] hover:text-white'
                            }`}
                        >
                            Approved ({comments.filter(c => c.is_approved).length})
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {filteredComments.length === 0 ? (
                        <div className="bg-[#151516]/30 border border-white/[0.06] rounded-2xl p-8 text-center text-neutral-500 text-xs">
                            No comments found in this ledger filter.
                        </div>
                    ) : (
                        filteredComments.map((comment) => (
                            <div
                                key={comment.id}
                                className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-white/[0.1] transition-all"
                            >
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-white text-xs">
                                            {comment.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-xs font-bold text-white">{comment.name}</h4>
                                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase ${
                                                    comment.is_approved ? 'bg-[#30D158]/10 text-[#30D158]' : 'bg-[#FF9500]/10 text-[#FF9500]'
                                                }`}>
                                                    {comment.is_approved ? 'Approved' : 'Pending Review'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                {renderStars(comment.rating)}
                                                <span className="text-[9px] text-neutral-600">•</span>
                                                <span className="text-[9px] text-neutral-400">
                                                    {new Date(comment.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-300 leading-relaxed italic pl-11">
                                        "{comment.comment}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 pl-11 md:pl-0 self-end md:self-center">
                                    <button
                                        onClick={() => toggleApproval(comment.id)}
                                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                                            comment.is_approved
                                                ? 'bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white'
                                                : 'bg-[#30D158] hover:bg-[#28B046] text-white'
                                        }`}
                                    >
                                        {comment.is_approved ? 'Revoke Approval' : 'Approve Comment'}
                                    </button>
                                    <button
                                        onClick={() => deleteComment(comment.id)}
                                        className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
