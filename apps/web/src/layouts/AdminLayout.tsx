import React, { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.webp';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Blog Management', path: '/admin/blogs', icon: 'edit_note' },
        { name: 'Lead Vault', path: '/admin/leads', icon: 'leaderboard' },
        { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Backdrop (Mobile only) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[105] md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative inset-y-0 left-0 z-[110]
                ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'} 
                bg-white border-r border-gray-200 transition-all duration-300 flex flex-col overflow-hidden
            `}>
                <div className="h-20 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </div>

                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                                }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                {(isSidebarOpen || window.innerWidth < 768) && <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <button 
                        onClick={() => navigate('/landing')}
                        className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        {(isSidebarOpen || window.innerWidth < 768) && <span className="font-bold text-sm">Exit Admin</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-10 flex-shrink-0">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-sm font-black text-gray-900">Administrator</p>
                            <p className="text-xs text-blue-600 font-bold">EAOverseas Hub</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black">
                            AD
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-50/50">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
