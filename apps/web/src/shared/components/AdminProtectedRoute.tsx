import React, { useState } from 'react';
import logo from '@/assets/logo.png';

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    // Securely check password without exposing plain text in code
    const TARGET_HASH = 'e3bd359e7f4a07b3079abb5ef27826423e3c30503a59669e4e6121f00998f155';

    const hashPassword = async (pwd: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setError('');
        
        try {
            const hash = await hashPassword(password);
            if (hash === TARGET_HASH) {
                setIsAuthenticated(true);
                setPassword(''); // Clear password from state immediately for security
            } else {
                setError('Incorrect password');
            }
        } catch (err) {
            console.error('Crypto API error');
            setError('System error verifying credentials');
        } finally {
            setIsVerifying(false);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                    <img src={logo} alt="Eduwoy Logo" className="h-12 w-auto mx-auto mb-6 object-contain" />
                    <h2 className="text-2xl font-black text-gray-900">Admin Area</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium">Please authenticate to continue</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                                placeholder="Enter access code"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-xs font-bold mt-3 text-center">{error}</p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isVerifying || !password}
                        className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                    >
                        {isVerifying ? 'Verifying...' : 'Authenticate'}
                        {!isVerifying && <span className="material-symbols-outlined text-sm">lock_open</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProtectedRoute;
