import React from 'react';

export default function Preloader() {
    return (
        <div id="preloader" className="fixed inset-0 bg-white dark:bg-[#0A0A0A] z-[10000] flex justify-center items-center transition-opacity duration-500">
            <div className="w-10 h-10 border-3 border-black/[0.08] dark:border-white/[0.08] border-t-[#007AFF] rounded-full animate-spin"></div>
        </div>
    );
}
