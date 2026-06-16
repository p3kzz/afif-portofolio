import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Skills({ categories }) {

    const [catModalOpen, setCatModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);


    const [skillModalOpen, setSkillModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const categoryForm = useForm({
        name: '',
        icon: '',
        order_index: 0,
    });

    const skillForm = useForm({
        skill_category_id: '',
        name: '',
        proficiency_percentage: null,
        is_featured_tag: false,
    });


    const openCategoryAdd = () => {
        setEditingCategory(null);
        categoryForm.reset();
        setCatModalOpen(true);
    };

    const openCategoryEdit = (category) => {
        setEditingCategory(category);
        categoryForm.setData({
            name: category.name,
            icon: category.icon || '',
            order_index: category.order_index,
        });
        setCatModalOpen(true);
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            categoryForm.put(route('admin.skills.categories.update', editingCategory.id), {
                onSuccess: () => setCatModalOpen(false)
            });
        } else {
            categoryForm.post(route('admin.skills.categories.store'), {
                onSuccess: () => setCatModalOpen(false)
            });
        }
    };

    const deleteCategory = (id) => {
        if (confirm('Are you sure you want to delete this category? All skill badges under this category will be permanently deleted.')) {
            router.delete(route('admin.skills.categories.destroy', id));
        }
    };


    const openSkillAdd = (categoryId) => {
        setSelectedCategoryId(categoryId);
        skillForm.reset();
        skillForm.setData('skill_category_id', categoryId);
        setSkillModalOpen(true);
    };

    const handleSkillSubmit = (e) => {
        e.preventDefault();
        skillForm.post(route('admin.skills.store'), {
            onSuccess: () => setSkillModalOpen(false)
        });
    };

    const deleteSkill = (id) => {
        if (confirm('Delete this tech badge?')) {
            router.delete(route('admin.skills.destroy', id));
        }
    };

    return (
        <AdminLayout activeTab="skills">
            <Head title="Tech Stack Management" />

            <div className="space-y-6">
                {/* Header panel */}
                <div className="flex justify-between items-center bg-[#151516]/40 backdrop-blur-md border border-white/[0.06] p-5 rounded-2xl">
                    <div>
                        <h3 className="text-sm font-bold text-white">Core Tech Stack Management</h3>
                        <p className="text-[9px] text-[#86868B] uppercase tracking-wider mt-0.5">Define category grids and add technical badges</p>
                    </div>
                    <button
                        onClick={openCategoryAdd}
                        className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0062CC] transition-colors"
                    >
                        Create Tech Category
                    </button>
                </div>

                {/* Categories listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-[#151516]/30 border border-white/[0.06] rounded-3xl p-6 space-y-4 hover:border-[#007AFF]/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                {/* Category Header */}
                                <div className="flex justify-between items-start pb-4 border-b border-white/[0.03]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] flex items-center justify-center text-sm">
                                            <i className={`fas ${category.icon || 'fa-code'}`}></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">{category.name}</h4>
                                            <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">Order Position: {category.order_index}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => openCategoryEdit(category)}
                                            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] flex items-center justify-center text-[10px] text-white"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category.id)}
                                            className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center text-[10px] text-red-500"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Skills Grid List */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Skill Badges</span>
                                        <button
                                            onClick={() => openSkillAdd(category.id)}
                                            className="text-[9px] font-bold text-[#007AFF] hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                                        >
                                            <i className="fas fa-plus"></i> Add Badge
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {category.skills.length === 0 ? (
                                            <span className="text-[10px] text-neutral-600 italic">No skills registered under this category</span>
                                        ) : (
                                            category.skills.map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                                                        skill.is_featured_tag
                                                            ? 'bg-[#BF5AF2]/5 border-[#BF5AF2]/20 text-[#BF5AF2]'
                                                            : 'bg-white/[0.03] border-white/[0.06] text-white hover:border-[#007AFF]/30'
                                                    }`}
                                                >
                                                    <span>{skill.name}</span>
                                                    {skill.proficiency_percentage !== null && (
                                                        <span className="text-[9px] text-neutral-500 font-medium">({skill.proficiency_percentage}%)</span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteSkill(skill.id)}
                                                        className="text-neutral-500 hover:text-red-500 transition-colors text-[10px]"
                                                    >
                                                        <i className="fas fa-times-circle"></i>
                                                    </button>
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Category */}
            {catModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setCatModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[420px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">{editingCategory ? 'Modify Category' : 'Register New Category'}</h3>
                            <button onClick={() => setCatModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Category Name</label>
                                <input
                                    type="text"
                                    value={categoryForm.data.name}
                                    onChange={(e) => categoryForm.setData('name', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Core Engineering"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Icon Class (FontAwesome)</label>
                                <input
                                    type="text"
                                    value={categoryForm.data.icon}
                                    onChange={(e) => categoryForm.setData('icon', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="fa-terminal, fa-server, etc."
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sort Order Index</label>
                                <input
                                    type="number"
                                    value={categoryForm.data.order_index}
                                    onChange={(e) => categoryForm.setData('order_index', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setCatModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={categoryForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {categoryForm.processing ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Skill */}
            {skillModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setSkillModalOpen(false)}>
                    <div className="bg-[#151516] border border-white/[0.06] w-full max-w-[420px] rounded-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">Add Tech Badge</h3>
                            <button onClick={() => setSkillModalOpen(false)} className="text-neutral-500 hover:text-white text-sm"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={handleSkillSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Badge Name</label>
                                <input
                                    type="text"
                                    value={skillForm.data.name}
                                    onChange={(e) => skillForm.setData('name', e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="e.g. Laravel, React, Docker"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Proficiency Percentage (Optional, 0-100)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={skillForm.data.proficiency_percentage || ''}
                                    onChange={(e) => skillForm.setData('proficiency_percentage', e.target.value ? parseInt(e.target.value) : null)}
                                    className="w-full bg-[#0A0A0A] border border-white/[0.08] focus:border-[#007AFF] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                                    placeholder="Leave empty if just a tag"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="inline-flex items-center cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={skillForm.data.is_featured_tag}
                                        onChange={(e) => skillForm.setData('is_featured_tag', e.target.checked)}
                                        className="rounded border-white/[0.08] text-[#BF5AF2] focus:ring-[#BF5AF2]/20 bg-[#0A0A0A] w-4 h-4"
                                    />
                                    <span className="ms-2 text-xs font-semibold text-neutral-400">Mark as Featured (Highlights in different color)</span>
                                </label>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setSkillModalOpen(false)} className="flex-1 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" disabled={skillForm.processing} className="flex-1 bg-[#007AFF] hover:bg-[#0062CC] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-40">
                                    {skillForm.processing ? 'Adding...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
