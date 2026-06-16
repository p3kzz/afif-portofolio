import React from 'react';

export default function Stats({ statistics, animatedStats }) {
    return (
        <section id="stats" className="py-16 bg-[#F5F5F7] dark:bg-[#151516] border-y border-black/[0.05] dark:border-white/[0.05] px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {statistics.map((stat) => (
                    <div key={stat.id} className="space-y-1 reveal-on-scroll">
                        <div className="text-4xl lg:text-5xl font-extrabold text-[#007AFF] tracking-tight">
                            {animatedStats[stat.id] ?? 0}+
                        </div>
                        <div className="text-xs lg:text-sm font-medium text-[#86868B]">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
