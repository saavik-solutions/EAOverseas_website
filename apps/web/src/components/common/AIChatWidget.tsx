import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamAIResponse } from '../../services/aiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; streaming?: boolean }[]>([
        { role: 'assistant', content: "Hi! I'm **Guide Buddy** 🎓\nI'm your EAOverseas AI assistant. Ask me anything about:\n- 🌍 Study destinations\n- 🏛️ University admissions\n- 💰 Scholarships & loans\n- ✅ Visa processes" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Hide tooltip after 4s
    useEffect(() => {
        const t = setTimeout(() => setShowTooltip(false), 4000);
        return () => clearTimeout(t);
    }, []);

    // Listen for custom event to open chat globally
    useEffect(() => {
        const handleOpenChat = () => {
            setIsOpen(true);
            setShowTooltip(false);
        };
        window.addEventListener('open-ai-chat', handleOpenChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, []);

    // Auto-scroll to bottom on every message update
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;
        const userMsg = inputValue.trim();

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputValue('');
        setIsLoading(true);
        setShowTooltip(false);

        try {
            // Insert an empty streaming assistant message immediately
            setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);
            setIsLoading(false); // dots indicator no longer needed — we show live content

            const stream = streamAIResponse(userMsg);
            for await (const token of stream) {
                // Incrementally append each token to the last message
                setMessages(prev => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last && last.role === 'assistant') {
                        updated[updated.length - 1] = {
                            ...last,
                            content: last.content + token,
                        };
                    }
                    return updated;
                });
            }

            // Mark streaming complete (remove cursor)
            setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === 'assistant') {
                    updated[updated.length - 1] = { ...last, streaming: false };
                }
                return updated;
            });
        } catch {
            setMessages(prev => {
                // Replace the empty streaming message with the error
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === 'assistant' && last.streaming) {
                    updated[updated.length - 1] = {
                        role: 'assistant',
                        content: "I'm having trouble connecting right now. Please call our experts at **+91 97790 46382** for immediate help!",
                        streaming: false,
                    };
                } else {
                    updated.push({ role: 'assistant', content: "I'm having trouble connecting. Please try again!", streaming: false });
                }
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    const quickPrompts = [
        "Best universities for CS?",
        "How to get a scholarship?",
        "Canada student visa process",
        "Top MBA destinations",
    ];

    return (
        <div className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-[9999] flex flex-col items-end pointer-events-none select-none">

            {/* ── Chat Window ── */}
            {isOpen && (
                <div className="pointer-events-auto w-[92vw] md:w-[400px] bg-white rounded-[1.75rem] shadow-[0_24px_60px_rgba(122,41,194,0.22)] border border-purple-100/60 flex flex-col overflow-hidden mb-4"
                    style={{ maxHeight: 'min(600px, 80vh)' }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#6b21a8] via-[#7a29c2] to-[#9333ea] px-5 py-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner flex-shrink-0">
                                <span className="material-symbols-outlined text-white text-[22px]">smart_toy</span>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[15px] leading-tight">Guide Buddy</h3>
                                <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">EAOverseas AI · Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all text-white"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#faf8ff]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e9d5ff transparent' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar dot */}
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7a29c2] to-[#9333ea] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                                        <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                                    </div>
                                )}
                                <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-br from-[#7a29c2] to-[#9333ea] text-white rounded-tr-sm'
                                        : 'bg-white text-slate-700 border border-purple-100 rounded-tl-sm'
                                }`}>
                                    {/* Show content; append blinking cursor while streaming */}
                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-1.5">{children}</ul>,
                                            li: ({ children }) => <li className="text-[13px]">{children}</li>,
                                            strong: ({ children }) => <span className={`font-bold ${msg.role === 'user' ? 'text-white' : 'text-[#7a29c2]'}`}>{children}</span>,
                                        }}
                                    >
                                        {msg.content || (msg.streaming ? '\u00a0' : '')}
                                    </ReactMarkdown>
                                    {/* Blinking cursor — shown only while AI is actively streaming */}
                                    {msg.streaming && (
                                        <span
                                            className="inline-block w-[2px] h-[1em] bg-[#7a29c2] align-middle ml-0.5 animate-pulse"
                                            style={{ verticalAlign: 'text-bottom' }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator — shows ONLY during the brief initial connection period */}
                        {isLoading && (
                            <div className="flex gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7a29c2] to-[#9333ea] flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                                </div>
                                <div className="bg-white border border-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#7a29c2]/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 rounded-full bg-[#7a29c2]/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 rounded-full bg-[#7a29c2]/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Prompts */}
                    {messages.length <= 1 && (
                        <div className="px-4 pb-3 flex gap-2 flex-wrap border-t border-purple-50 pt-3 bg-white flex-shrink-0">
                            {quickPrompts.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setInputValue(p); }}
                                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-[#7a29c2] border border-purple-200 hover:bg-[#7a29c2] hover:text-white transition-all whitespace-nowrap"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="px-4 py-4 bg-white border-t border-purple-50 flex-shrink-0">
                        <div className="flex items-end gap-2 bg-slate-50 border border-purple-100 rounded-2xl px-4 py-2.5 focus-within:border-[#7a29c2]/40 focus-within:ring-2 focus-within:ring-[#7a29c2]/10 transition-all">
                            <textarea
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about universities, visas, loans..."
                                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none resize-none min-h-[22px] max-h-[100px] leading-snug"
                                rows={1}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isLoading}
                                className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#7a29c2] to-[#9333ea] text-white flex items-center justify-center shadow-md shadow-purple-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                        <p className="text-[9px] text-slate-300 text-center mt-2 font-medium tracking-wide">Powered by EAOverseas AI</p>
                    </div>
                </div>
            )}

            {/* ── Floating Trigger Button ── */}
            <div className="pointer-events-auto relative inline-flex flex-col items-end">
                {/* Tooltip */}
                {showTooltip && !isOpen && (
                    <div className="absolute bottom-[72px] right-0 mb-1 whitespace-nowrap bg-[#0e0c1a] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl animate-[fadeSlideUp_0.4s_ease_forwards]">
                        <span className="material-symbols-outlined text-[13px] align-middle mr-1">chat_bubble</span>Ask Guide Buddy anything!
                        <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-[#0e0c1a] rotate-45 rounded-sm"></div>
                    </div>
                )}

                {/* Pulse ring — sits behind the button */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#7a29c2]/25 pointer-events-none"></span>
                )}

                {/* Main button */}
                <button
                    onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
                    className={`relative w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_8px_28px_rgba(122,41,194,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-visible ${
                        isOpen
                            ? 'bg-slate-800'
                            : 'bg-gradient-to-br from-[#7a29c2] via-[#8b2fc9] to-[#9333ea]'
                    }`}
                >
                    {/* Inner sheen */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-white/10 pointer-events-none" />

                    <span className={`material-symbols-outlined text-white text-[28px] transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                        {isOpen ? 'close' : 'smart_toy'}
                    </span>

                    {/* Notification dot — perfectly anchored top-right outside the circle */}
                    {!isOpen && (
                        <span
                            className="absolute flex items-center justify-center text-[9px] font-black text-white rounded-full border-[2.5px] border-white shadow-lg bg-gradient-to-br from-orange-400 to-red-500"
                            style={{ width: 22, height: 22, top: -4, right: -4 }}
                        >
                            AI
                        </span>
                    )}
                </button>
            </div>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AIChatWidget;
