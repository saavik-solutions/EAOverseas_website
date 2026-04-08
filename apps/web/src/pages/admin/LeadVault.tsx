import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const LeadVault = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchLeads = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/admin/leads`);
            const data = await response.json();
            if (data.success) setLeads(data.leads);
        } catch (error) {
            toast.error('Failed to load leads');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">Lead Vault</h1>
                <p className="text-gray-500 font-medium text-sm md:text-base">Enterprise collection of prospective scholars and institutional inquiries.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-4 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Scholars</th>
                                <th className="px-4 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Context</th>
                                <th className="px-4 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Message</th>
                                <th className="px-4 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Sync</th>
                                <th className="px-4 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-gray-400 animate-pulse font-bold">
                                        Synchronizing Records...
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold italic">
                                        No leads captured yet.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead._id} className="hover:bg-blue-50/30 transition-colors group text-left">
                                        <td className="px-4 md:px-8 py-4 md:py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-sm md:text-base">{lead.name}</p>
                                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold">{lead.email}</p>
                                                    <p className="text-[10px] md:text-blue-600 font-black mt-0.5 md:mt-1">{lead.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] md:text-xs font-black text-gray-900">{lead.source}</p>
                                                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lead.interest || lead.subject}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-8">
                                            <p className="text-xs md:text-sm text-gray-500 font-medium line-clamp-2 max-w-xs">{lead.message}</p>
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-8 text-[10px] md:text-xs font-bold text-gray-400 italic">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 md:px-8 py-4 md:py-8">
                                            <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                                                lead.status === 'New' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadVault;
