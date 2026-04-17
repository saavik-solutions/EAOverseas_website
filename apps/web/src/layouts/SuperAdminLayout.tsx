import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import logo from '@/assets/logo.webp';
import { useAuth } from '@/shared/contexts/AuthContext';

interface SuperAdminLayoutProps {
    children?: ReactNode;
    title: string;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // RBAC: Determine the active user role (defaulting to Admin if undefined for safety)
    const userRole = user?.role || 'Admin';

    const menuItems = [
        { name: 'Strategic Dashboard', icon: 'dashboard', path: '/Superadmin', allowedRoles: ['Admin'] },
        { name: 'Platform Inquiries', icon: 'contact_support', path: '/Superadmin/inquiries', allowedRoles: ['Admin'] },
        { name: 'Operational Hub', icon: 'analytics', path: '/Superadmin/counsellor-portal/dashboard', allowedRoles: ['Admin', 'Counsellor'] },
        { name: 'User Management', icon: 'manage_accounts', path: '/Superadmin/users', allowedRoles: ['Admin'] },
        {
            name: 'University Portal',
            icon: 'account_balance',
            isDropdown: true,
            allowedRoles: ['Admin'],
            children: [
                { name: 'Universities', icon: 'account_balance', path: '/Superadmin/universities' },
                { name: 'Posts & Feed', icon: 'feed', path: '/Superadmin/university-portal/posts-feed' },
            ]
        },
        {
            name: 'Counsellor Portal',
            icon: 'support_agent',
            isDropdown: true,
            allowedRoles: ['Admin', 'Counsellor'],
            children: [
                { name: 'Overview', icon: 'dashboard', path: '/Superadmin/counsellor-portal/dashboard' },
                { name: 'Students', icon: 'group', path: '/Superadmin/counsellor-portal/students' },
                { name: 'Applications', icon: 'folder', path: '/Superadmin/counsellor-portal/applications' },
                { name: 'University Directory', icon: 'account_balance', path: '/Superadmin/counsellor-portal/university-directory' },
                { name: 'Counselling Chat', icon: 'chat', path: '/Superadmin/counsellor-portal/chat' },
                { name: 'Schedule', icon: 'calendar_month', path: '/Superadmin/counsellor-portal/schedule' },
            ]
        },
        {
            name: 'Data Intelligence',
            icon: 'analytics',
            isDropdown: true,
            allowedRoles: ['Admin'],
            children: [
                { name: 'University Scraper', icon: 'data_exploration', path: '/Superadmin/scraper' }
            ]
        }
    ]; // PROTECTION REMOVED - ALWAYS SHOW ALL ITEMS

    const [isDataIntelOpen, setIsDataIntelOpen] = useState(location.pathname.startsWith('/Superadmin/scraper'));
    const [isUniPortalOpen, setIsUniPortalOpen] = useState(location.pathname.startsWith('/Superadmin/university-portal'));
    const [isCounsellorPortalOpen, setIsCounsellorPortalOpen] = useState(location.pathname.startsWith('/Superadmin/counsellor-portal'));

    const handleDropdownClick = (itemName: string) => {
        if (itemName === 'Data Intelligence') setIsDataIntelOpen(!isDataIntelOpen);
        if (itemName === 'University Portal') setIsUniPortalOpen(!isUniPortalOpen);
        if (itemName === 'Counsellor Portal') setIsCounsellorPortalOpen(!isCounsellorPortalOpen);
    };

    const isDropdownOpen = (itemName: string) => {
        if (itemName === 'Data Intelligence') return isDataIntelOpen;
        if (itemName === 'University Portal') return isUniPortalOpen;
        if (itemName === 'Counsellor Portal') return isCounsellorPortalOpen;
        return false;
    };

    return (
        <div className="flex h-screen bg-[#f8f6f6] flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200 z-50 sticky top-0">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="EAOverseas" className="h-8 w-auto object-contain" />
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                w-[260px] bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-[70] h-screen
                transition-transform duration-300 lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    <div className="flex flex-col gap-4">
                        <img src={logo} alt="EAOverseas" className="h-9 w-auto object-contain self-start" />
                        <div className="flex flex-col">
                            <h1 className="text-[#111318] text-sm font-black leading-none uppercase tracking-tighter">Super Admin</h1>
                            <p className="text-[#2b6cee] text-[10px] font-black uppercase tracking-[0.15em] mt-1">Management</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
                    {menuItems.map((item) => (
                        <div key={item.name} className="w-full">
                            {item.isDropdown ? (
                                <>
                                    <button
                                        onClick={() => handleDropdownClick(item.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isDropdownOpen(item.name)
                                            ? 'bg-[#2b6cee]/10 text-[#2b6cee] font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50 font-medium'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                            <span className="text-sm">{item.name}</span>
                                        </div>
                                        <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isDropdownOpen(item.name) ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen(item.name) ? 'max-h-80 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-12 pr-4 py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-7">
                                            {item.children?.map(child => (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={`flex items-center gap-3 py-2 rounded-lg transition-colors ${location.pathname === child.path
                                                        ? 'text-[#2b6cee] font-semibold'
                                                        : 'text-slate-500 hover:text-[#2b6cee] font-medium'
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">{child.icon}</span>
                                                    <span className="text-xs">{child.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={item.path!}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${(location.pathname === item.path ||
                                        (item.name === 'Strategic Dashboard' && location.pathname === '/Superadmin') ||
                                        (item.name === 'Operational Hub' && location.pathname === '/Superadmin/counsellor-portal/dashboard') ||
                                        (item.name === 'Universities' && (
                                            location.pathname.startsWith('/Superadmin/university')
                                        )) ||
                                        (item.name === 'User Management' && location.pathname === '/Superadmin/users'))
                                        ? 'bg-[#2b6cee]/10 text-[#2b6cee] font-semibold'
                                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
                    {/* Sign Out - Always Visible */}
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left group"
                    >
                        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">logout</span>
                        <span className="text-sm font-bold">Sign Out</span>
                    </button>

                    <div className="mt-2 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5Qrrx8XIF5fczse7_DsDA50G-m4klPEPj-Jz8cPuwhtt-XPwa3SUP2BbNphmG7UchjPfCK28furJVIWSFqncb_cwqMhx2aKkNIZ1_81sua0geMEy6DJ-CshFMH-skwPAOnacVKBFKI-_hdSqcuUAOy091hJ5w4jSF4kGsHihaw6hhuUjjs9S00nZpBJbP9Hcpetr-4gV2s7Ghm3jaj3b87t7rPAy628R_kepXey4RQMBz7GU-HjXxfeJuZ0-PwmbLGQAVQyeAyGc")' }}></div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-[#111318] text-xs font-bold truncate">James Wilson</p>
                            <p className="text-slate-500 text-[10px] truncate">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-x-hidden bg-slate-50/50">
                {/* Page Content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    {children}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
