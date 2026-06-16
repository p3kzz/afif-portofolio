import React from 'react';

export default function Footer({ profile }) {
    return (
        <footer className="bg-[#F5F5F7] dark:bg-[#151516] border-t border-black/[0.05] dark:border-white/[0.05] py-12 px-6 text-xs text-[#86868B]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p>
                    &copy; 2026 {profile?.name || 'Afif'}. Core components engineered cleanly. Tailored for Apple Academy Vetting.
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-sm">
                        {profile?.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="Source Control Platform" className="hover:text-[#007AFF] transition-colors">
                                <i className="fab fa-github"></i>
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="Professional Network Platform" className="hover:text-[#007AFF] transition-colors">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        )}
                        {profile?.instagram_url && (
                            <a href={profile.instagram_url} target="_blank" rel="noreferrer" aria-label="Social Media Platform" className="hover:text-[#007AFF] transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                        )}
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-9 h-9 bg-white dark:bg-[#0A0A0A] border border-black/[0.05] dark:border-white/[0.05] rounded-full flex justify-center items-center shadow-sm text-[#1D1D1F] dark:text-[#F5F5F7]"
                        aria-label="Back to Top"
                    >
                        <i className="fas fa-chevron-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
}
