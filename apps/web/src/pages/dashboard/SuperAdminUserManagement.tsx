import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';

interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Stored for mock auth purposes only
    role: string;
    status: 'Active' | 'Inactive';
    dateAdded: string;
}

const SuperAdminUserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Counsellor'
    });

    useEffect(() => {
        const storedUsers = localStorage.getItem('mock_created_users');
        if (storedUsers) {
            try {
                setUsers(JSON.parse(storedUsers));
            } catch (e) {
                console.error("Failed to parse stored users", e);
            }
        }
    }, []);

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            id: 'usr_' + Math.random().toString(36).substr(2, 9),
            name: formData.name,
            email: formData.email.toLowerCase(),
            password: formData.password,
            role: formData.role,
            status: 'Active',
            dateAdded: new Date().toISOString().split('T')[0]
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('mock_created_users', JSON.stringify(updatedUsers));

        // Reset form and close modal
        setFormData({ name: '', email: '', password: '', role: 'Counsellor' });
        setIsAddModalOpen(false);
    };

    return (
        <div className="flex-1 bg-slate-50 min-h-screen">
            <PageHeader
                title="User Management"
                breadcrumbs={[
                    { label: 'SuperAdmin', link: '/Superadmin' },
                    { label: 'User Management' }
                ]}
                actions={
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        Add Employee
                    </button>
                }
            />

            <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Added</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                            No custom users added yet. Click "Add Employee" to create one.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-[#2b6cee]/10 flex items-center justify-center text-[#2b6cee] font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900">{user.name}</div>
                                                        <div className="text-sm text-slate-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {user.dateAdded}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-[#2b6cee] transition-colors p-2 rounded-lg hover:bg-[#2b6cee]/10">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Employee Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6 pb-0">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">Add New Employee</h2>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <form id="add-user-form" onSubmit={handleAddUser} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all"
                                            placeholder="john@eaoverseas.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all"
                                            placeholder="Enter initial password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Role Assignment</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] transition-all appearance-none"
                                        >
                                            <option value="Admin">Admin (Full Access)</option>
                                            <option value="Counsellor">Counsellor</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="p-6 bg-white border-t border-slate-200 flex justify-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="add-user-form"
                                className="px-5 py-2.5 text-sm font-bold text-white bg-[#2b6cee] hover:bg-blue-700 rounded-xl shadow-sm transition-all"
                            >
                                Add Employee
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminUserManagement;

