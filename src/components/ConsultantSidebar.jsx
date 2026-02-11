import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const ConsultantSidebar = ({ isOpen, onClose, user }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/counsellor-dashboard' },
        { name: 'Students', icon: 'group', path: '/counsellor-students' },
        { name: 'University Directory', icon: 'school', path: '/consultant/university-directory' },
        { name: 'Documents', icon: 'description', path: '/counsellor-documents', badge: 3 },
        { name: 'Schedule', icon: 'calendar_month', path: '/counsellor-schedule' },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 flex-col h-full bg-white shrink-0 lg:flex
                    transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="p-5 flex items-center justify-start">
                    <img src={logo} alt="EA Overseas" className="h-10 w-auto object-contain" />
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${isActive ? 'icon-filled' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.name}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            ER
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-gray-900 leading-none">Elena Rodriguez</p>
                            <p className="text-xs text-gray-500 mt-1">Senior Counselor</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ConsultantSidebar;
