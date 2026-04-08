import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamAIResponse } from '../../services/aiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; streaming?: boolean }[]>([
        { role: 'assistant', content: "Welcome to **EAOverseas Executive Support**. 🎓\n\nI am your dedicated AI assistant. How can I assist you today?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setShowTooltip(false), 5000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const handleOpenChat = () => { setIsOpen(true); setIsMinimized(false); setShowTooltip(false); };
        window.addEventListener('open-ai-chat', handleOpenChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        if (scrollRef.current) { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }
    }, [messages, isLoading]);

    const handleSend = async (userMsgText?: string) => {
        const userMsg = (userMsgText || inputValue).trim();
        if (!userMsg || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputValue('');
        setIsLoading(true);

        try {
            setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);
            const stream = streamAIResponse(userMsg);
            for await (const token of stream) {
                setMessages(prev => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (updated[lastIdx] && updated[lastIdx].role === 'assistant') {
                        updated[lastIdx] = { 
                            ...updated[lastIdx], 
                            content: updated[lastIdx].content + token 
                        };
                    }
                    return updated;
                });
            }
            setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === 'assistant') { last.streaming = false; }
                return updated;
            });
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a brief connection issue. Our executive team is available at **+91 97015 63362** for immediate support.", streaming: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    const isFullView = isOpen && !isMinimized;

    return (
        <>
            {/* ── Background Overlay (Desktop Only) ── */}
            {isFullView && (
                <div 
                    className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm md:block hidden"
                    onClick={() => setIsMinimized(true)}
                />
            )}

            <div className={`fixed z-[9999] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                ${isFullView 
                    ? 'inset-x-0 bottom-0 md:inset-auto md:bottom-8 md:right-8 flex items-end justify-center md:justify-end' 
                    : 'bottom-20 right-4 md:bottom-28 md:right-8 pointer-events-none'}`}>

                {isOpen && !isMinimized && (
                    <div className="bg-white flex flex-col w-full h-[90vh] md:w-[420px] md:h-[650px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:rounded-[2rem] overflow-hidden pointer-events-auto border border-slate-100 animate-[enterpriseEnter_0.4s_ease-out]">
                        
                        {/* ── Compact Header ── */}
                        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50 bg-white z-20">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl bg-[#0f1118] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[20px]">account_circle</span>
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="text-left">
                                    <h4 className="text-[15px] font-black text-slate-800 font-bricolage tracking-tight">EAOverseas Assistant</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7a29c2]">Enterprise AI</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setIsMinimized(true)} className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">unfold_less</span>
                                </button>
                                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        </div>

                        {/* ── Conversation Pane ── */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-white no-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[execFade_0.3s_ease-out]`}>
                                    <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.5rem] text-[14.5px] leading-relaxed shadow-sm
                                        ${msg.role === 'user' 
                                            ? 'bg-[#7a29c2] text-white rounded-tr-none' 
                                            : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'}`}>
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>,
                                                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>,
                                                li: ({ children }) => <li className="text-[14px]">{children}</li>,
                                                strong: ({ children }) => <span className="font-bold">{children}</span>,
                                            }}
                                        >
                                            {msg.content || (msg.streaming ? '\u00a0' : '')}
                                        </ReactMarkdown>
                                        {msg.streaming && <span className="inline-block w-2.5 h-[1.1em] bg-[#7a29c2] align-middle ml-2 animate-pulse rounded-full" />}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start animate-pulse">
                                    <div className="flex items-center gap-1.5 px-6 py-4 bg-slate-50 rounded-[1.5rem] rounded-tl-none border border-slate-100">
                                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── Command Input ── */}
                        <div className="p-5 border-t border-slate-50 bg-white">
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-[#7a29c2]/30 focus-within:bg-white focus-within:shadow-sm transition-all group">
                                <textarea
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter inquiry..."
                                    className="flex-1 bg-transparent text-[14.5px] text-slate-900 placeholder-slate-400 focus:outline-none resize-none pt-1"
                                    rows={1}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="h-9 w-9 rounded-xl bg-[#1a1c2d] text-white flex items-center justify-center shadow-md hover:bg-[#2e3146] disabled:opacity-20 transition-all shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                    Secure Executive Assistant
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Floating Launcher ── */}
                {!isFullView && (
                    <div className="pointer-events-auto relative inline-flex flex-col items-end transition-all duration-700 flex">
                        {showTooltip && (
                            <div className="absolute bottom-[90px] right-0 mb-2 whitespace-nowrap bg-[#1a1c2d] text-white text-[13px] font-black uppercase tracking-[0.15em] px-5 py-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-[execTooltip_0.6s_ease-out]">
                                Expert AI Online
                                <div className="absolute bottom-[-6px] right-8 w-4 h-4 bg-[#1a1c2d] rotate-45"></div>
                            </div>
                        )}
                        <button
                            onClick={() => { if (isMinimized) setIsMinimized(false); else setIsOpen(!isOpen); setShowTooltip(false); }}
                            className={`group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:rotate-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden
                                ${isOpen && !isMinimized ? 'bg-slate-900' : 'bg-white border border-slate-100'}`}
                        >
                            <span className={`material-symbols-outlined text-[20px] sm:text-[24px] md:text-[32px] font-bold transition-all duration-500 ${isOpen && !isMinimized ? 'text-white' : 'text-[#7a29c2]'}`}>
                                {isMinimized ? 'unfold_more' : 'auto_awesome'}
                            </span>
                        </button>
                        {!isOpen && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-[#7a29c2] border-2 md:border-4 border-white rounded-lg md:rounded-xl shadow-lg flex items-center justify-center z-10 pointer-events-none">
                                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white leading-none">AI</span>
                            </span>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes enterpriseEnter {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes execFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes execTooltip {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
};

export default AIChatWidget;
