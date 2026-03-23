import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useAuth } from '@/shared/contexts/AuthContext';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'resolved' | 'archived';
    createdAt: string;
}

const SuperAdminInquiries = () => {
    const { accessToken } = useAuth();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const token = accessToken || localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/api/inquiries`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setInquiries(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch');
            }
        } catch (err: any) {
            console.error('Failed to fetch inquiries:', err);
            setError('Failed to load inquiries. Please check your data connection and permissions.');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: 'pending' | 'resolved' | 'archived') => {
        try {
            const token = accessToken || localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/api/inquiries/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));
            } else {
                throw new Error(data.error || 'Failed to update');
            }
        } catch (err) {
            console.error('Failed to update status:', err);
            alert('Failed to update inquiry status');
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    return (
        <div className="flex-1 bg-[#f8fafc] min-h-screen">
            <PageHeader
                title="Platform Inquiries"
                breadcrumbs={[{ label: 'System Overview' }, { label: 'Inquiries' }]}
                actions={
                    <button onClick={fetchInquiries} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Sync
                    </button>
                }
            />

            <div className="p-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center gap-4">
                        <span className="material-symbols-outlined text-3xl">error</span>
                        <p className="font-bold">{error}</p>
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-20 text-center">
                        <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-slate-300 text-4xl">contact_support</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No Inquiries Yet</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">When prospective students use the contact form on your landing page, they'll appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.map((inquiry) => (
                            <div key={inquiry._id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all group">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black text-sm uppercase">
                                                {inquiry.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{inquiry.name}</h4>
                                                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">{inquiry.email}</p>
                                            </div>
                                            <div className={`ml-auto md:ml-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${inquiry.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                inquiry.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' :
                                                    'bg-slate-100 text-slate-500'
                                                }`}>
                                                {inquiry.status}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-slate-800 text-sm mb-1">{inquiry.subject}</h5>
                                            <p className="text-slate-600 text-sm leading-relaxed">{inquiry.message}</p>
                                        </div>

                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Submitted on {new Date(inquiry.createdAt).toLocaleString()}</p>
                                    </div>

                                    <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                                        {inquiry.status !== 'resolved' && (
                                            <button
                                                onClick={() => updateStatus(inquiry._id, 'resolved')}
                                                className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all w-full"
                                            >
                                                Mark Resolved
                                            </button>
                                        )}
                                        {inquiry.status !== 'archived' && (
                                            <button
                                                onClick={() => updateStatus(inquiry._id, 'archived')}
                                                className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all w-full"
                                            >
                                                Archive
                                            </button>
                                        )}
                                        <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 w-full">
                                            <span className="material-symbols-outlined text-[14px]">mail</span>
                                            Reply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminInquiries;

