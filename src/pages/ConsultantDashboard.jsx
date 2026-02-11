import React from 'react';
import PageHeader from '../components/PageHeader';
import NotificationBanner from '../components/NotificationBanner';

const ConsultantDashboard = () => {
    // State for dynamically loaded sessions
    const [sessions, setSessions] = React.useState([]);

    // Load sessions from localStorage
    const loadSessions = () => {
        const savedSessions = localStorage.getItem('scheduled_sessions');
        if (savedSessions) {
            const parsedSessions = JSON.parse(savedSessions);

            // Filter only scheduled (not completed) sessions AND aggressively filter out 'Student User'
            const scheduledSessions = parsedSessions.filter(s => {
                const name = s.studentName || s.name || '';
                // Check if name contains 'Student User' or 'Guest User' (case insensitive)
                const isBadData = /student\s*user|guest\s*user/i.test(name);
                return s.status === 'scheduled' && !isBadData;
            });

            // If we filtered out bad data, update localStorage to permanently remove it
            if (scheduledSessions.length < parsedSessions.length) {
                localStorage.setItem('scheduled_sessions', JSON.stringify(scheduledSessions));
            }

            setSessions(scheduledSessions);
        } else {
            setSessions([]);
        }
    };

    // Load sessions on mount and refresh every 5 seconds
    React.useEffect(() => {
        loadSessions();
        const interval = setInterval(loadSessions, 5000);
        return () => clearInterval(interval);
    }, []);

    // Function to mark student as completed when session starts
    // Function to mark student as completed when session starts
    const handleSessionAction = (session) => {
        // Support both full session object or just name (backward compatibility)
        const studentName = session.studentName || session.name || session;
        const studentId = session.studentId;

        // Get current completed students from localStorage
        const saved = localStorage.getItem('completedStudents');
        const completedStudents = saved ? JSON.parse(saved) : [];

        // If we have a direct student ID from the session, use it
        if (studentId) {
            if (!completedStudents.includes(studentId)) {
                completedStudents.push(studentId);
                localStorage.setItem('completedStudents', JSON.stringify(completedStudents));
            }
            return;
        }

        // Fallback: Find student ID by name from student data (Legacy/Mock data)
        const studentMap = {
            'James Sterling': '#EAS-2940',
            'Aisha Mohammed': '#EAS-3012',
            'Liam Chen': '#EAS-1829',
            'Sofia Wagner': '#EAS-4410'
        };

        const mappedId = studentMap[studentName];
        if (mappedId && !completedStudents.includes(mappedId)) {
            completedStudents.push(mappedId);
            localStorage.setItem('completedStudents', JSON.stringify(completedStudents));
        }
    };
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Notification Banner */}
            <NotificationBanner sessions={sessions} />

            {/* Header with Sign Out button, properly aligned like Student Dashboard */}
            <PageHeader title="Counsellor Dashboard" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <span className="material-symbols-outlined icon-filled">person</span>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">+1 new</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Assigned Students</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">24 <span className="text-sm font-normal text-gray-500">total</span></p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <span className="material-symbols-outlined icon-filled">school</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Active Student Cases</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">12 <span className="text-sm font-normal text-gray-500">in progress</span></p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                    <span className="material-symbols-outlined icon-filled">description</span>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">Action Needed</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Pending Reviews</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3 <span className="text-sm font-normal text-gray-500">documents</span></p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Average Rating</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">4.8 <span className="text-sm font-normal text-gray-500">stars</span></p>
                        </div>
                    </div>



                    {/* Main Content: Upcoming Sessions List */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                        </div>
                        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                            {sessions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">event_busy</span>
                                    <p className="text-sm">No sessions scheduled yet</p>
                                    <p className="text-xs mt-1">New bookings will appear here automatically</p>
                                </div>
                            ) : (
                                sessions.map((session) => (
                                    <div key={session.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl shrink-0 bg-blue-50 text-blue-600">
                                                <span className="text-xs font-bold uppercase leading-tight">{session.dateLabel || session.date}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-gray-900 text-base">{session.studentName || session.name}</h4>

                                                    {/* Mode Indicator - Map 'audio' to 'voice' */}
                                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${session.mode === 'video' ? 'bg-purple-50 text-purple-700 border-purple-100' : (session.mode === 'voice' || session.mode === 'audio' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-orange-50 text-orange-700 border-orange-100')}`}>
                                                        <span className="material-symbols-outlined text-[12px]">{session.mode === 'video' ? 'videocam' : (session.mode === 'voice' || session.mode === 'audio' ? 'phone' : 'chat')}</span>
                                                        <span>{session.mode === 'video' ? 'VIDEO CALL' : (session.mode === 'voice' || session.mode === 'audio' ? 'VOICE CALL' : 'CHAT')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="material-symbols-outlined text-[16px]">topic</span>
                                                    <span>{session.topic}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:self-center self-start w-full sm:w-auto">
                                            <button
                                                onClick={() => handleSessionAction(session)}
                                                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30">
                                                Start Session
                                            </button>
                                        </div>
                                    </div>
                                )))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantDashboard;
