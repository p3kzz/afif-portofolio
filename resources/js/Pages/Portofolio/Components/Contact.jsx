import React from 'react';

export default function Contact({
    profile,
    data,
    setData,
    errors,
    processing,
    submitComment,
    approvedComments,
    handleGlowMove
}) {
    return (
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
                <h2 className="text-4xl font-bold tracking-tight mb-2">Get In Touch</h2>
                <p className="text-[#86868B]">Feel free to reach out for collaborations, project inquiries, or just to say hello!</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div
                    onMouseMove={handleGlowMove}
                    className="interactive-glow-card reveal-on-scroll lg:col-span-5 bg-neutral-50/80 dark:bg-[#151516]/80 border border-black/[0.05] dark:border-white/[0.05] p-8 rounded-3xl space-y-6"
                >
                    <h3 className="font-bold text-lg tracking-tight border-b border-black/[0.05] dark:border-white/[0.05] pb-3">
                        Contact Info
                    </h3>
                    <div className="space-y-4">
                        {profile?.email && (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white dark:bg-[#0A0A0A] border border-black/[0.05] dark:border-white/[0.05] rounded-full flex justify-center items-center text-[#007AFF] shadow-sm">
                                    <i className="fas fa-envelope text-xs"></i>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">EMAIL</div>
                                    <a href={`mailto:${profile.email}`} className="text-sm font-medium hover:text-[#007AFF] transition-colors">{profile.email}</a>
                                </div>
                            </div>
                        )}
                        {profile?.github_url && (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white dark:bg-[#0A0A0A] border border-black/[0.05] dark:border-white/[0.05] rounded-full flex justify-center items-center text-[#007AFF] shadow-sm">
                                    <i className="fab fa-github text-xs"></i>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">GITHUB</div>
                                    <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-[#007AFF] transition-colors">
                                        {profile.github_url.replace(/https?:\/\/(www\.)?/, '')}
                                    </a>
                                </div>
                            </div>
                        )}
                        {profile?.phone && (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white dark:bg-[#0A0A0A] border border-black/[0.05] dark:border-white/[0.05] rounded-full flex justify-center items-center text-[#007AFF] shadow-sm">
                                    <i className="fas fa-phone text-xs"></i>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">PHONE</div>
                                    <span className="text-sm font-medium">{profile.phone}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    onMouseMove={handleGlowMove}
                    className="interactive-glow-card reveal-on-scroll lg:col-span-7 bg-neutral-50/80 dark:bg-[#151516]/80 border border-black/[0.05] dark:border-white/[0.05] p-8 rounded-3xl"
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const name = formData.get('name');
                            const email = formData.get('email');
                            const message = formData.get('message');
                            const mailtoLink = `mailto:${profile?.email || 'afif@example.com'}?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                            window.location.href = mailtoLink;
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-widest uppercase">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Jane Doe"
                                className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-widest uppercase">
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="jane@example.com"
                                className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-widest uppercase">
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Let's build something exceptional..."
                                className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF]"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-[#007AFF] text-white p-3 rounded-xl text-sm font-semibold hover:bg-[#0062CC] transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* --- LIVE COMMENTS LEDGER BOOK FEEDBACK --- */}
            <div className="mt-24 border-t border-black/[0.05] dark:border-white/[0.05] pt-16">
                <div className="text-center max-w-xl mx-auto mb-12 reveal-on-scroll">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Visitor Feedback</h3>
                    <p className="text-sm text-[#86868B]">Please leave your comments or feedback below.</p>
                </div>

                <div
                    onMouseMove={handleGlowMove}
                    className="interactive-glow-card reveal-on-scroll max-w-xl mx-auto bg-neutral-50/80 dark:bg-[#151516]/80 border border-black/[0.05] dark:border-white/[0.05] p-8 rounded-3xl mb-12"
                >
                    <form onSubmit={submitComment} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-wider uppercase">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF]"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-wider uppercase">
                                    Rating
                                </label>
                                <select
                                    value={data.rating}
                                    onChange={(e) => setData('rating', parseInt(e.target.value))}
                                    className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF] text-[#ff9500] font-bold"
                                >
                                    <option value="5">★★★★★ Excellent</option>
                                    <option value="4">★★★★☆ Functional</option>
                                    <option value="3">★★★☆☆ Average</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-2 tracking-wider uppercase">
                                Comment / Feedback
                            </label>
                            <textarea
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                rows="3"
                                placeholder="Write your feedback..."
                                className="w-full bg-white dark:bg-[#0A0A0A] border border-black/[0.08] dark:border-white/[0.08] p-3 rounded-xl text-sm focus:outline-none focus:border-[#007AFF]"
                                required
                            ></textarea>
                            {errors.comment && <div className="text-red-500 text-xs mt-1">{errors.comment}</div>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] p-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
                        >
                            {processing ? 'Sending...' : 'Submit Feedback'}
                        </button>
                    </form>
                </div>

                {/* Rendering Comments List */}
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {approvedComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="reveal-on-scroll bg-neutral-50 dark:bg-[#151516] border border-black/[0.05] dark:border-white/[0.05] p-5 rounded-2xl space-y-2"
                        >
                            <div className="flex justify-between items-center text-xs font-semibold">
                                <span>{comment.name}</span>
                                <span className="text-[#ff9500]">
                                    {'★'.repeat(comment.rating)}
                                    {'☆'.repeat(5 - comment.rating)}
                                </span>
                            </div>
                            <p className="text-xs lg:text-sm text-[#86868B] leading-relaxed">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
