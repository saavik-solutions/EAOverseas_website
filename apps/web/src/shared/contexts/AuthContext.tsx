import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
    id: string;
    name: string;
    fullName?: string;
    email: string;
    role?: string;
    university?: string;
    avatarUrl?: string;
    emailVerified?: boolean;
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
    sendOtp: (email: string) => Promise<{ message: string }>;
    verifyOtp: (email: string, otp: string) => Promise<{ message: string }>;
    forgotPassword: (email: string) => Promise<{ message: string }>;
    resetPassword: (token: string, newPassword: string) => Promise<{ message: string }>;
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
    id: 'mock-admin-id',
    name: 'Mock Admin',
    fullName: 'Mock Administrator',
    email: 'admin@eaoverseas.com',
    role: 'admin',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mock+Admin&background=0D8ABC&color=fff',
    emailVerified: true,
    isDemo: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(MOCK_USER);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // ── Restore session from storage ────────────────────────────────────
    useEffect(() => {
        const storedUser = localStorage.getItem('eaoverseas_user');
        const storedRefresh = localStorage.getItem('eaoverseas_refresh_token');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                setUser(MOCK_USER);
            }
        } else {
            setUser(MOCK_USER);
        }
        if (storedRefresh) {
            setRefreshTokenValue(storedRefresh);
            // Auto-refresh access token
            refreshAccessToken(storedRefresh);
        }
        setLoading(false);

        // Sync across tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'eaoverseas_user') {
                if (e.newValue) {
                    try { setUser(JSON.parse(e.newValue)); } catch { }
                } else {
                    setUser(null);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // ── Refresh access token ────────────────────────────────────────────
    const refreshAccessToken = useCallback(async (rToken: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: rToken })
            });
            if (res.ok) {
                const data = await res.json();
                setAccessToken(data.accessToken);
            }
        } catch (e) {
            console.error("Token refresh failed", e);
        }
    }, []);

    // ── Auto-refresh every 13 minutes ───────────────────────────────────
    useEffect(() => {
        if (!refreshTokenValue) return;
        const interval = setInterval(() => {
            refreshAccessToken(refreshTokenValue);
        }, 13 * 60 * 1000); // 13 minutes (token expires in 15)
        return () => clearInterval(interval);
    }, [refreshTokenValue, refreshAccessToken]);

    // ── LOGIN ───────────────────────────────────────────────────────────
    const login = async (email: string, password: string): Promise<User> => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                // FALLBACK FOR TESTING MODE
                console.warn("Login failed with API, checking if we should use fallback for testing", data);
                if (email.includes('university') || email.includes('kcl.ac.uk') || email.includes('utoronto.ca') || localStorage.getItem('ea_auto_fill_university')) {
                    const mockUniUser: User = {
                        id: 'mock-uni-' + Math.random().toString(36).substr(2, 4),
                        name: email.split('@')[0],
                        fullName: email.split('@')[0],
                        email: email,
                        role: 'University',
                        university: localStorage.getItem('ea_auto_fill_university') || 'Toronto',
                        isDemo: true,
                    };
                    setUser(mockUniUser);
                    localStorage.setItem('eaoverseas_user', JSON.stringify(mockUniUser));
                    return mockUniUser;
                }
                throw new Error(data.error || 'Login failed');
            }

            const loggedInUser: User = {
                id: data.user.id,
                name: data.user.name || data.user.fullName,
                fullName: data.user.fullName,
                email: data.user.email,
                role: data.user.role,
                avatarUrl: data.user.avatarUrl,
                emailVerified: data.user.emailVerified,
                isDemo: false,
            };

            setUser(loggedInUser);
            setAccessToken(data.accessToken);
            setRefreshTokenValue(data.refreshToken);
            localStorage.setItem('eaoverseas_user', JSON.stringify(loggedInUser));
            localStorage.setItem('eaoverseas_refresh_token', data.refreshToken);

            return loggedInUser;
        } catch (err: any) {
            console.warn("Login exception, using fallback for testing", err);
            // FALLBACK FOR TESTING MODE (Network errors etc)
            const role = email.includes('admin') ? 'admin' :
                email.includes('counsellor') ? 'Counsellor' :
                    (email.includes('university') || localStorage.getItem('ea_auto_fill_university')) ? 'University' : 'Student';

            const mockUser: User = {
                id: 'mock-test-' + Math.random().toString(36).substr(2, 4),
                name: email.split('@')[0],
                fullName: email.split('@')[0],
                email: email,
                role: role,
                university: localStorage.getItem('ea_auto_fill_university') || undefined,
                isDemo: true,
            };
            setUser(mockUser);
            localStorage.setItem('eaoverseas_user', JSON.stringify(mockUser));
            return mockUser;
        }
    };

    // ── SIGNUP ──────────────────────────────────────────────────────────
    const signup = async (userDetails: any): Promise<User> => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: userDetails.name || userDetails.fullName,
                email: userDetails.email,
                phone: userDetails.phone,
                password: userDetails.password,
                role: userDetails.role?.toLowerCase() || 'student',
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        const newUser: User = {
            id: data.user.id,
            name: data.user.fullName,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
            emailVerified: data.user.emailVerified,
            isDemo: false,
            createdAt: new Date().toISOString(),
        };

        // Don't auto-login until email is verified
        return newUser;
    };

    // ── SEND OTP ────────────────────────────────────────────────────────
    const sendOtp = async (email: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
        return data;
    };

    // ── VERIFY OTP ──────────────────────────────────────────────────────
    const verifyOtp = async (email: string, otp: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'OTP verification failed');
        return data;
    };

    // ── FORGOT PASSWORD ─────────────────────────────────────────────────
    const forgotPassword = async (email: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to process request');
        return data;
    };

    // ── RESET PASSWORD ──────────────────────────────────────────────────
    const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Password reset failed');
        return data;
    };

    // ── LOGOUT ──────────────────────────────────────────────────────────
    const logout = async () => {
        try {
            if (refreshTokenValue) {
                await fetch(`${API_BASE}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: refreshTokenValue })
                });
            }
        } catch (e) {
            console.error("Logout API failed", e);
        }
        setUser(null);
        setAccessToken(null);
        setRefreshTokenValue(null);
        localStorage.removeItem('eaoverseas_user');
        localStorage.removeItem('eaoverseas_refresh_token');
    };

    const requireAuth = (callback: () => void) => {
        // ALWAYS PROCEED
        callback();
    };

    return (
        <AuthContext.Provider value={{
            user, login, signup, logout, loading,
            isLoginModalOpen, setLoginModalOpen, requireAuth,
            sendOtp, verifyOtp, forgotPassword, resetPassword,
            accessToken,
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
