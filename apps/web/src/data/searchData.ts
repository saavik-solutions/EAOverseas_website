// ─── Search Section Data ──────────────────────────────────────────────────────

export const LEVELS = ['Undergraduate', 'Postgraduate', 'Diploma', 'PhD / Doctoral', 'Foundation'];

export const FIELDS = [
    'Computer Science & IT',
    'Business & Management',
    'Engineering',
    'Medicine & Health',
    'Architecture & Design',
    'Law',
    'Education',
    'Arts & Humanities',
    'Social Sciences',
    'Natural Sciences',
];

export const COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'New Zealand', 'Ireland', 'Singapore',
];

export const BUDGETS = ['Under ₹10L/yr', '₹10L – ₹20L/yr', '₹20L – ₹35L/yr', 'Above ₹35L/yr'];
export const DURATIONS = ['1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'];

// ─── Course Fields (all categories) ─────────────────────────────────────────

export const allCourseFields = [
    { title: 'Computer Science & IT', field: 'Computer Science & IT', specs: 18, courses: 12400, icon: 'computer', color: 'text-purple-600' },
    { title: 'Business & Management', field: 'Business & Management', specs: 14, courses: 9820, icon: 'business_center', color: 'text-fuchsia-600' },
    { title: 'Engineering', field: 'Engineering', specs: 22, courses: 11300, icon: 'engineering', color: 'text-indigo-600' },
    { title: 'Medicine & Health', field: 'Medicine & Health', specs: 11, courses: 5711, icon: 'medical_services', color: 'text-pink-600' },
    { title: 'Architecture & Design', field: 'Architecture & Design', specs: 2, courses: 1391, icon: 'architecture', color: 'text-violet-600' },
    { title: 'Law', field: 'Law', specs: 1, courses: 1088, icon: 'gavel', color: 'text-rose-600' },
    { title: 'Education', field: 'Education', specs: 3, courses: 4371, icon: 'school', color: 'text-sky-600' },
    { title: 'Arts & Humanities', field: 'Arts & Humanities', specs: 7, courses: 3200, icon: 'palette', color: 'text-amber-600' },
];

// Career goals → field mapping
export const careerGoalCards = [
    { title: 'Software Developer', field: 'Computer Science & IT', specs: 6, courses: 3400, icon: 'code', color: 'text-purple-600' },
    { title: 'Data Scientist', field: 'Computer Science & IT', specs: 4, courses: 1800, icon: 'analytics', color: 'text-fuchsia-600' },
    { title: 'MBA / Entrepreneur', field: 'Business & Management', specs: 5, courses: 2600, icon: 'trending_up', color: 'text-indigo-600' },
    { title: 'Doctor / Surgeon', field: 'Medicine & Health', specs: 3, courses: 890, icon: 'stethoscope', color: 'text-pink-600' },
    { title: 'Civil Engineer', field: 'Engineering', specs: 7, courses: 2100, icon: 'construction', color: 'text-violet-600' },
    { title: 'Lawyer / Advocate', field: 'Law', specs: 2, courses: 740, icon: 'balance', color: 'text-rose-600' },
    { title: 'UX / Product Designer', field: 'Architecture & Design', specs: 3, courses: 980, icon: 'design_services', color: 'text-sky-600' },
    { title: 'Educator / Researcher', field: 'Education', specs: 4, courses: 1200, icon: 'person_book', color: 'text-amber-600' },
];

// Destination cards
export const destinationCards = [
    { title: 'United States', country: 'United States', courses: 28000, unis: 320, icon: '🇺🇸', color: 'text-purple-600', badge: '#1 Destination' },
    { title: 'United Kingdom', country: 'United Kingdom', courses: 21000, unis: 160, icon: '🇬🇧', color: 'text-fuchsia-600', badge: 'Oxford & More' },
    { title: 'Canada', country: 'Canada', courses: 12000, unis: 98, icon: '🇨🇦', color: 'text-indigo-600', badge: 'PR Friendly' },
    { title: 'Australia', country: 'Australia', courses: 15000, unis: 112, icon: '🇦🇺', color: 'text-pink-600', badge: 'Post-Study Visa' },
    { title: 'Germany', country: 'Germany', courses: 9200, unis: 74, icon: '🇩🇪', color: 'text-violet-600', badge: 'Low Tuition' },
    { title: 'New Zealand', country: 'New Zealand', courses: 4800, unis: 38, icon: '🇳🇿', color: 'text-sky-600', badge: 'Safe & Beautiful' },
    { title: 'Ireland', country: 'Ireland', courses: 5600, unis: 45, icon: '🇮🇪', color: 'text-emerald-600', badge: 'Tech Hub' },
    { title: 'Singapore', country: 'Singapore', courses: 3900, unis: 30, icon: '🇸🇬', color: 'text-rose-600', badge: 'Asia Gateway' },
];

// ─── Universities ────────────────────────────────────────────────────────────

export const allUniversities = [
    { id: 'mit', name: 'MIT', location: 'Cambridge, USA', country: 'United States', rankNum: 1, rank: '#1 Global', tuition: '$57,000/yr', acceptRate: '4%', courses: 2800, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800' },
    { id: 'stanford', name: 'Stanford University', location: 'Stanford, USA', country: 'United States', rankNum: 3, rank: '#3 Global', tuition: '$56,000/yr', acceptRate: '4%', courses: 3100, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1510526339031-6e8dd1219b6d?q=80&w=800' },
    { id: 'oxford', name: 'University of Oxford', location: 'Oxford, UK', country: 'United Kingdom', rankNum: 4, rank: '#4 Global', tuition: '£28,000/yr', acceptRate: '17%', courses: 4200, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800' },
    { id: 'nus', name: 'NUS Singapore', location: 'Singapore', country: 'Singapore', rankNum: 8, rank: '#8 Global', tuition: 'S$35,000/yr', acceptRate: '10%', courses: 2200, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1563290243-7f7229e377f0?q=80&w=800' },
    { id: 'toronto', name: 'University of Toronto', location: 'Toronto, Canada', country: 'Canada', rankNum: 21, rank: '#21 Global', tuition: 'CA$45,000/yr', acceptRate: '43%', courses: 3800, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1549700478-2cef2a1abe34?q=80&w=800' },
    { id: 'melbourne', name: 'University of Melbourne', location: 'Melbourne, Australia', country: 'Australia', rankNum: 32, rank: '#32 Global', tuition: 'A$40,000/yr', acceptRate: '52%', courses: 3300, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    { id: 'tum', name: 'TU Munich', location: 'Munich, Germany', country: 'Germany', rankNum: 37, rank: '#37 Global', tuition: '€0 / Low fees', acceptRate: '38%', courses: 1900, scholarships: false, type: 'Technical', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ubc', name: 'UBC Vancouver', location: 'Vancouver, Canada', country: 'Canada', rankNum: 40, rank: '#40 Global', tuition: 'CA$38,000/yr', acceptRate: '52%', courses: 2900, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800' },
    { id: 'sydney', name: 'University of Sydney', location: 'Sydney, Australia', country: 'Australia', rankNum: 42, rank: '#42 Global', tuition: 'A$42,000/yr', acceptRate: '60%', courses: 3100, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?auto=format&fit=crop&q=80&w=800' },
    { id: 'ucl', name: 'University College London', location: 'London, UK', country: 'United Kingdom', rankNum: 9, rank: '#9 Global', tuition: '£30,000/yr', acceptRate: '63%', courses: 3600, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800' },
    { id: 'trinity', name: 'Trinity College Dublin', location: 'Dublin, Ireland', country: 'Ireland', rankNum: 81, rank: '#81 Global', tuition: '€18,000/yr', acceptRate: '40%', courses: 1600, scholarships: false, type: 'Public', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800' },
    { id: 'auckland', name: 'University of Auckland', location: 'Auckland, New Zealand', country: 'New Zealand', rankNum: 65, rank: '#65 Global', tuition: 'NZ$32,000/yr', acceptRate: '55%', courses: 2100, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
];
