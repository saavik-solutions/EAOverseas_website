import React from 'react';
import PageHeader from '../components/PageHeader';

const ConsultantStudents = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    // Load completed students from localStorage on mount
    const [completedStudents, setCompletedStudents] = React.useState(() => {
        const saved = localStorage.getItem('completedStudents');
        return saved ? JSON.parse(saved) : [];
    });
    const [filters, setFilters] = React.useState({
        country: 'All',
        stage: 'All',
        urgency: 'All'
    });

    // Save to localStorage whenever completedStudents changes
    React.useEffect(() => {
        localStorage.setItem('completedStudents', JSON.stringify(completedStudents));
    }, [completedStudents]);

    const [studentData, setStudentData] = React.useState([
        {
            name: 'James Sterling',
            id: '#EAS-2940',
            country: 'United Kingdom',
            stage: 'Visa Processing',
            priority: 'Urgent',
            last: '2 hours ago',
            detail: 'Call scheduled',
            initials: 'JS',
            color: 'blue'
        },
        {
            name: 'Aisha Mohammed',
            id: '#EAS-3012',
            country: 'Canada',
            stage: 'App. Submitted',
            priority: 'High',
            last: 'Yesterday',
            detail: 'Document review',
            initials: 'AM',
            color: 'orange'
        },
        {
            name: 'Liam Chen',
            id: '#EAS-1829',
            country: 'Australia',
            stage: 'Test Prep',
            priority: 'Low',
            last: 'Feb 10, 2026',
            detail: 'IELTS Mock results',
            initials: 'LC',
            color: 'purple'
        },
        {
            name: 'Sofia Wagner',
            id: '#EAS-4410',
            country: 'Germany',
            stage: 'Visa Processing',
            priority: 'High',
            last: 'Feb 8, 2026',
            detail: 'Interview scheduled',
            initials: 'SW',
            color: 'teal'
        },
    ]);

    // Effect to load dynamic students from scheduled sessions
    React.useEffect(() => {
        const savedSessions = localStorage.getItem('scheduled_sessions');
        if (savedSessions) {
            const parsedSessions = JSON.parse(savedSessions);

            // Map unique students from sessions
            const dynamicStudents = [];
            const seenIds = new Set(studentData.map(s => s.id));

            parsedSessions.forEach(session => {
                // Skip if no student ID (legacy data) or already exists
                if (!session.studentId || seenIds.has(session.studentId)) return;

                // Create a student object from session data
                // We'll infer/randomize missing fields for the demo
                const initials = session.studentName
                    ? session.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    : 'GU';

                dynamicStudents.push({
                    name: session.studentName,
                    id: session.studentId,
                    country: 'Unassigned', // Default
                    stage: 'Initial Consultation', // Default for new bookings
                    priority: 'Medium',
                    last: 'Just now', // Since they just booked
                    detail: session.topic || 'Consultation',
                    initials: initials,
                    color: ['blue', 'orange', 'purple', 'teal'][Math.floor(Math.random() * 4)]
                });
                seenIds.add(session.studentId);
            });

            if (dynamicStudents.length > 0) {
                setStudentData(prev => [...prev, ...dynamicStudents]);
            }
        }
    }, []);

    // Unique options for filters
    const countries = ['All', ...new Set(studentData.map(s => s.country))];
    const stages = ['All', ...new Set(studentData.map(s => s.stage))];
    const priorities = ['All', ...new Set(studentData.map(s => s.priority))];

    const filteredStudents = studentData.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCountry = filters.country === 'All' || student.country === filters.country;
        const matchesStage = filters.stage === 'All' || student.stage === filters.stage;
        const matchesUrgency = filters.urgency === 'All' || student.priority === filters.urgency;

        return matchesSearch && matchesCountry && matchesStage && matchesUrgency;
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ country: 'All', stage: 'All', urgency: 'All' });
        setSearchQuery('');
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Header with breadcrumbs */}
            <PageHeader
                title="My Students"
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[95%] mx-auto space-y-6 pb-10">

                    {/* Header Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Student Management</h2>
                            <p className="text-gray-500 mt-1">Manage and track student progress.</p>
                        </div>
                        {/* Add New Student button removed */}
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center gap-3 shadow-sm">

                        {/* Country Filter */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Country:</span>
                            <select
                                value={filters.country}
                                onChange={(e) => handleFilterChange('country', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Stage Filter */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Stage:</span>
                            <select
                                value={filters.stage}
                                onChange={(e) => handleFilterChange('stage', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {stages.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Urgency Filter */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Urgency:</span>
                            <select
                                value={filters.urgency}
                                onChange={(e) => handleFilterChange('urgency', e.target.value)}
                                className="bg-transparent font-medium text-gray-900 outline-none cursor-pointer"
                            >
                                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div className="hidden md:block h-6 w-[1px] bg-gray-200 mx-2"></div>
                        <button onClick={clearFilters} className="text-sm font-medium text-blue-600 hover:underline">Clear Filters</button>

                        <div className="ml-auto flex items-center gap-2">
                            <div className="relative group/search">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within/search:text-blue-500 transition-colors">search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-40 md:w-64 transition-all"
                                />
                            </div>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <button className="p-1.5 bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-lg">view_list</span>
                                </button>
                                <button className="p-1.5 text-gray-400 hover:bg-gray-50">
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-12">Completed</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Target Country</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Current Stage</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Interaction</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={completedStudents.includes(student.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setCompletedStudents([...completedStudents, student.id]);
                                                            } else {
                                                                setCompletedStudents(completedStudents.filter(id => id !== student.id));
                                                            }
                                                        }}
                                                        className="w-4 h-4 accent-green-600 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-9 rounded-full bg-${student.color}-100 flex items-center justify-center text-${student.color}-600 font-bold text-sm shrink-0 uppercase`}>
                                                            {student.initials}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                            <p className="text-xs text-gray-500">ID: {student.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-gray-400 text-sm">public</span>
                                                        <span className="text-sm text-gray-600">{student.country}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${student.stage === 'Visa Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        student.stage === 'App. Submitted' ? 'bg-green-50 text-green-600 border-green-100' :
                                                            'bg-yellow-50 text-yellow-700 border-yellow-100'
                                                        }`}>
                                                        {student.stage}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`flex items-center gap-1.5 font-semibold text-xs px-2 py-1 rounded-lg w-fit ${student.priority === 'Urgent' ? 'text-red-600 bg-red-50' :
                                                        student.priority === 'High' ? 'text-orange-600 bg-orange-50' :
                                                            'text-blue-600 bg-blue-50'
                                                        }`}>
                                                        <span className={`size-1.5 rounded-full ${student.priority === 'Urgent' ? 'bg-red-600 animate-pulse' :
                                                            student.priority === 'High' ? 'bg-orange-600' :
                                                                'bg-blue-600'
                                                            }`}></span>
                                                        {student.priority}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600">{student.last}</p>
                                                    <p className="text-xs text-gray-400 italic">{student.detail}</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                                        View Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                                No students found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer / Pagination */}
                        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{filteredStudents.length > 0 ? 1 : 0}-{filteredStudents.length}</span> of <span className="font-semibold text-gray-900">{studentData.length}</span> students</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                                </button>
                                <button className="size-9 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm shadow-blue-600/20">1</button>

                                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantStudents;
