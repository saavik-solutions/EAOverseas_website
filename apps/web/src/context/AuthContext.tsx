import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    isDemo?: boolean;
    createdAt?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    signup: (userDetails: any) => Promise<User>;
    logout: () => void;
    loading: boolean;
    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
    requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        // Check local storage for persistent session
        const storedUser = localStorage.getItem('eaoverseas_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
        setLoading(false);
    }, []);

    const login = (email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            // ADMIN LOGIN (Full/Demo Mode)
            if (email === 'alex.j@example.com' && password === '5678') {
                const adminUser: User = {
                    id: 'USER_ADMIN_001',
                    name: 'Alex Johnson',
                    email: 'alex.j@example.com',
                    isDemo: true, // This flag enables all the AI/Pre-filled content
                };
                setUser(adminUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(adminUser));
                resolve(adminUser);
                return;
            }

            // COUNSELLOR LOGIN (Demo Mode)
            if (email === 'partner@counsellor.com' && password === 'COUNSELLOR2026') {
                const counsellorUser: User = {
                    id: 'USER_COUNSELLOR_001',
                    name: 'Dr. Alex Morgan',
                    email: 'partner@counsellor.com',
                    role: 'Counsellor',
                    isDemo: true,
                };
                setUser(counsellorUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(counsellorUser));
                resolve(counsellorUser);
                return;
            }

            // CHECK REGISTERED USERS
            const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
            const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);

            if (foundUser) {
                // Ensure isDemo is false for real users
                const realUser: User = { ...foundUser, isDemo: false };
                delete (realUser as any).password; // Don't store password in session
                setUser(realUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(realUser));
                resolve(realUser);
            } else {
                reject(new Error('Invalid credentials. Only admin@eaoverseas.com or registered users allowed.'));
            }
        });
    };

    const signup = (userDetails: any): Promise<User> => {
        return new Promise((resolve) => {
            const newUser: User = {
                ...userDetails,
                id: `USER_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                isDemo: false, // Fresh account
                createdAt: new Date().toISOString()
            };

            // Store in "DB" (localStorage)
            const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
            registeredUsers.push(newUser);
            localStorage.setItem('eaoverseas_registered_users', JSON.stringify(registeredUsers));

            // Auto login
            const sessionUser = { ...newUser };
            delete (sessionUser as any).password;
            setUser(sessionUser);
            localStorage.setItem('eaoverseas_user', JSON.stringify(sessionUser));

            resolve(sessionUser);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eaoverseas_user');
    };

    const requireAuth = (callback: () => void) => {
        if (user) {
            callback();
        } else {
            setLoginModalOpen(true);
        }
    };

    return (
        <AuthContext.Provider value={{
            user, login, signup, logout, loading,
            isLoginModalOpen, setLoginModalOpen, requireAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
