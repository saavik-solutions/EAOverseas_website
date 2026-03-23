import React, { useState, useEffect } from 'react';
import { universityService, UniversityData } from '@/services/universityService';
import { submitLead } from '@/services/leadVault';

interface UniversityFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: UniversityData | null;
}

const UniversityFormModal: React.FC<UniversityFormModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
    const isEdit = !!initialData;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<UniversityData>({
        university_id: '',
        name: '',
        website: '',
        country: '',
        city: '',
        logoUrl: '',
        ranking: '',
        language: 'English',
        description: '',
        universityType: 'Public',
        establishedYear: undefined,
        totalStudents: undefined,
        campusSize: '',
        globalRanking: '',
        facilities: []
    });

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                ...initialData,
                description: initialData.description || initialData.about || '',
                universityType: initialData.universityType || 'Public',
                establishedYear: initialData.establishedYear,
                totalStudents: initialData.totalStudents,
                campusSize: initialData.campusSize || '',
                globalRanking: initialData.globalRanking || initialData.ranking || '',
                facilities: initialData.facilities || []
            });
        } else if (!isEdit && isOpen) {
            setFormData({
                university_id: `UNI-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                name: '',
                website: '',
                country: '',
                city: '',
                logoUrl: '',
                ranking: '',
                language: 'English',
                description: '',
                universityType: 'Public',
                establishedYear: undefined,
                totalStudents: undefined,
                campusSize: '',
                globalRanking: '',
                facilities: []
            });
        }
        setError(null);
    }, [initialData, isOpen, isEdit]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || !formData.website || !formData.country) {
            setError('Please fill in all required fields (Name, Website, Country)');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (isEdit && initialData?._id) {
                await universityService.update(initialData._id, formData);
            } else {
                await universityService.create(formData);
            }

            // Capture in Institutional Lead Vault
            await submitLead({
                source: 'EAOverseas_Main_Website',
                data: {
                    type: 'University Onboarding',
                    action: isEdit ? 'Edit' : 'Create',
                    universityName: formData.name,
                    universityWebsite: formData.website,
                    country: formData.country,
                    overview: formData.description,
                    formName: isEdit ? 'Edit University Form' : 'Onboard New University Form'
                }
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Operation failed. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleFacilityToggle = (facility: string) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities?.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...(prev.facilities || []), facility]
        }));
    };

    const facilities_list = ['Library', 'Hostel', 'Sports Complex', 'Gym', 'Cafeteria', 'Wi-Fi', 'Medical Center', 'Career Counseling'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2b6cee]">school</span>
                            {isEdit ? 'Edit University Profile' : 'Onboard New University'}
                        </h3>
                        <p className="text-slate-500 text-xs mt-1 font-medium italic">Configure institutional details and strategic positioning.</p>
                    </div>
                    <button onClick={onClose} className="size-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {error && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    <form id="university-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">info</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Basic Information</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">University Name *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter official institutional name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Official Website *</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">https://</span>
                                        <input
                                            required
                                            type="text"
                                            placeholder="university.edu"
                                            value={formData.website?.replace('https://', '')}
                                            onChange={e => setFormData({ ...formData, website: e.target.value.startsWith('https://') ? e.target.value : `https://${e.target.value}` })}
                                            className="w-full pl-16 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Institutional Profile */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Institutional Profile</h4>
                            </div>
                            <div className="grid grid-cols-4 gap-6">
                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Type</label>
                                    <select
                                        value={formData.universityType}
                                        onChange={e => setFormData({ ...formData, universityType: e.target.value as any })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none appearance-none"
                                    >
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                        <option value="Research">Research</option>
                                        <option value="Technical">Technical</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Est. Year</label>
                                    <input
                                        type="number"
                                        placeholder="1850"
                                        value={formData.establishedYear || ''}
                                        onChange={e => setFormData({ ...formData, establishedYear: parseInt(e.target.value) || undefined })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Total Students</label>
                                    <input
                                        type="number"
                                        placeholder="25000"
                                        value={formData.totalStudents || ''}
                                        onChange={e => setFormData({ ...formData, totalStudents: parseInt(e.target.value) || undefined })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Global Ranking</label>
                                    <input
                                        type="text"
                                        placeholder="#42 QS"
                                        value={formData.globalRanking}
                                        onChange={e => setFormData({ ...formData, globalRanking: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Location */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Geography & Campus</h4>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Country *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. United Kingdom"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">City</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. London"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Campus Size</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 500 Acres"
                                        value={formData.campusSize}
                                        onChange={e => setFormData({ ...formData, campusSize: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Branding */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">branding_watermark</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Institutional Branding</h4>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-6">
                                <div className="size-20 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                    {formData.logoUrl ? (
                                        <img src={formData.logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <span className="material-symbols-outlined text-slate-300 text-3xl font-light">image</span>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Logo Image URL</label>
                                    <input
                                        type="url"
                                        placeholder="Paste image link from clearbit, unsplash, etc."
                                        value={formData.logoUrl}
                                        onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] outline-none transition-all"
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium ml-1 italic">Format: PNG, SVG, or JPG. Square assets recommended.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Facilities */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[18px]">done_all</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Campus Facilities</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {facilities_list.map(fac => (
                                    <button
                                        key={fac}
                                        type="button"
                                        onClick={() => handleFacilityToggle(fac)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${formData.facilities?.includes(fac)
                                            ? 'bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#2b6cee] hover:text-[#2b6cee]'
                                            }`}
                                    >
                                        {fac}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section 5: Overview */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Institutional Overview & Bio</label>
                            <textarea
                                placeholder="Describe the university's mission, history, and key offerings..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full h-32 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] outline-none transition-all leading-relaxed resize-none"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg font-bold text-slate-500 text-sm hover:bg-slate-50 transition-all uppercase tracking-wide"
                    >
                        Cancel
                    </button>
                    <button
                        form="university-form"
                        disabled={loading}
                        type="submit"
                        className="px-8 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all shadow-md flex items-center gap-2 active:scale-95 disabled:opacity-50 uppercase tracking-wide"
                    >
                        {loading && <span className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>}
                        {isEdit ? 'Save Changes' : 'Confirm Onboard'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UniversityFormModal;
