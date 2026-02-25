import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

const SuperAdminUniversityManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5;

    const stats = [
        { label: 'Active Partners', value: '98', icon: 'handshake', color: 'bg-blue-50 text-blue-600', trend: '82% of total' },
        { label: 'Pending Requests', value: '12', icon: 'clock_loader_40', color: 'bg-amber-50 text-amber-600', trend: 'Requires attention', urgent: true },
        { label: 'Suspended', value: '14', icon: 'block', color: 'bg-rose-50 text-rose-600', trend: '-2 since 2023' },
    ];

    const allUniversities = [
        // Page 1
        { id: 1, name: 'University of Toronto', country: 'Canada', courses: 142, status: 'Active', rating: 4.8, students: 1240 },
        { id: 2, name: 'King\'s College London', country: 'UK', courses: 86, status: 'Active', rating: 4.7, students: 840 },
        { id: 3, name: 'University of Melbourne', country: 'Australia', courses: 215, status: 'Pending', rating: 4.9, students: 0 },
        { id: 4, name: 'Technical University of Munich', country: 'Germany', courses: 94, status: 'Active', rating: 4.6, students: 620 },
        { id: 5, name: 'Nanyang Technological University', country: 'Singapore', courses: 112, status: 'Suspended', rating: 4.8, students: 0 },
        // Page 2
        { id: 6, name: 'Harvard University', country: 'USA', courses: 310, status: 'Active', rating: 4.9, students: 2100 },
        { id: 7, name: 'Oxford University', country: 'UK', courses: 280, status: 'Active', rating: 4.9, students: 1850 },
        { id: 8, name: 'ETH Zurich', country: 'Switzerland', courses: 120, status: 'Active', rating: 4.7, students: 950 },
        { id: 9, name: 'University of Tokyo', country: 'Japan', courses: 180, status: 'Pending', rating: 4.6, students: 0 },
        { id: 10, name: 'McGill University', country: 'Canada', courses: 155, status: 'Active', rating: 4.7, students: 1100 },
    ];

    const filteredUniversities = allUniversities.filter(uni => {
        const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All Status' || uni.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const paginatedUniversities = filteredUniversities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SuperAdminLayout title="University Management">
            <div className="p-8 flex flex-col gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div className={`${stat.color} p-2 rounded-lg`}>
                                    <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                                </div>
                                {stat.urgent && (
                                    <span className="bg-rose-100 text-rose-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Urgent</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-50">
                                <span className={`text-[10px] font-bold ${stat.urgent ? 'text-rose-500' : 'text-slate-400'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Table Toolbar */}
                    <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-full md:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                                <input
                                    type="text"
                                    placeholder="Search by university name or country..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-all outline-none cursor-pointer"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="All Status">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#2b6cee]/90 transition-all shadow-md shadow-[#2b6cee]/20 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add University
                            </button>
                        </div>
                    </div>

                    {/* Table Data */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Detail</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Country</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Courses</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Active Students</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Rating</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedUniversities.map((uni) => (
                                    <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#2b6cee] font-bold text-lg">
                                                    {uni.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{uni.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">ID: UNI-{uni.id.toString().padStart(4, '0')}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-semibold text-slate-600">{uni.country}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.courses}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-900">{uni.students.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5 font-bold text-[#2b6cee] text-xs">
                                                <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                                {uni.rating}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                                                uni.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-rose-100 text-rose-600'
                                                }`}>
                                                {uni.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => navigate(`/Superadmin/university/${uni.id}`)}
                                                    className="px-4 py-1.5 bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all whitespace-nowrap"
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Page {currentPage} of 2</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    className={`size-8 rounded-lg text-xs font-bold transition-all ${currentPage === 1 ? 'bg-[#2b6cee] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => setCurrentPage(2)}
                                    className={`size-8 rounded-lg text-xs font-bold transition-all ${currentPage === 2 ? 'bg-[#2b6cee] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    2
                                </button>
                            </div>
                            <button
                                onClick={() => setCurrentPage(2)}
                                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                                disabled={currentPage === 2}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </SuperAdminLayout>
    );
};

export default SuperAdminUniversityManagement;
