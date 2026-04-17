import React, { useState } from 'react';
import { submitLead } from '@/services/leadVault';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BookingCTASection = () => {
  // Tabs: 'guided' (multi-step flow) or 'direct' (one-step form)
  const [activeTab, setActiveTab] = useState<'guided' | 'direct'>('guided');
  
  // Step for guided flow (1, 2, 3)
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    degree: 'Master\'s',
    country: '',
    year: '',
    course: '',
    fullName: '',
    email: '',
    countryCode: '+91',
    mobile: ''
  });

  const COUNTRY_CODES = [
    { code: '+91', label: 'IN' },
    { code: '+1', label: 'US/CA' },
    { code: '+44', label: 'UK' },
    { code: '+61', label: 'AU' },
    { code: '+971', label: 'UAE' },
  ];

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = async () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!/^\d{7,15}$/.test(formData.mobile.replace(/[\s-]/g, ''))) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        source: activeTab === 'guided' ? 'Booking Guided Form' : 'Booking Direct Enquiry',
        data: {
          name: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.mobile}`,
          interest: `Degree: ${formData.degree}, Country: ${formData.country}, Year: ${formData.year}, Course: ${formData.course}`
        }
      });
      
      if (result.success) {
        navigate('/thank-you');
      } else {
        toast.error('Failed to submit your enquiry. Please try again.');
        console.error('Submission failed:', result.message);
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const degrees = ["Master's", 'MBA', "Bachelor's"];
  
  const countries = [
    { name: 'USA', flag: '🇺🇸' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Other', flag: '🌍' }
  ];

  const years = ['2026', '2027', '2028'];
  const popularCourses = [
    'Computer Science', 'Data Science and Data Analytics',
    'Business Analytics', 'Mechanical Engineering',
    'Management Information Systems', 'Electrical and Electronics Engineering'
  ];

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Render Guided Flow Steps
  const renderGuidedStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            {/* Degree Section */}
            <div className="mb-8">
              <label className="block text-[#374151] font-semibold text-[15px] mb-3">Which degree do you want to study?</label>
              <div className="grid grid-cols-3 gap-3">
                {degrees.map((degree) => (
                  <button
                    key={degree}
                    onClick={() => updateForm('degree', degree)}
                    className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all text-center ${
                      formData.degree === degree
                        ? 'border-[#7c3aed] text-[#7c3aed] outline outline-1 outline-[#7c3aed] shadow-sm'
                        : 'border-gray-200 text-[#4b5563] hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {degree}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Section */}
            <div className="mb-10">
              <label className="block text-[#374151] font-semibold text-[15px] mb-3">Country you aspire to study in</label>
              <div className="grid grid-cols-3 gap-3">
                {countries.map(({ name, flag }) => (
                  <button
                    key={name}
                    onClick={() => updateForm('country', name)}
                    className={`flex items-center justify-center space-x-2 py-3 px-2 rounded-xl border text-[13px] font-semibold transition-all shadow-sm ${
                      formData.country === name
                        ? 'border-[#7c3aed] text-[#7c3aed] outline outline-1 outline-[#7c3aed]'
                        : 'border-gray-200 text-[#4b5563] hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg leading-none">{flag}</span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-4 rounded-xl transition-colors shadow-lg tracking-wide text-[15px]"
            >
              Continue
            </button>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            {/* Year Section */}
            <div className="mb-8">
              <label className="block text-[#374151] font-semibold text-[15px] mb-3">Year you plan to start in</label>
              <div className="grid grid-cols-3 gap-3">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => updateForm('year', year)}
                    className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all text-center relative overflow-hidden ${
                      formData.year === year
                        ? 'border-[#10b981] text-[#047857] shadow-sm outline outline-1 outline-[#10b981]'
                        : 'border-gray-200 text-[#4b5563] hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* The little green marker on top left as shown in image for 2027 (we'll make it active for selected) */}
                    {formData.year === year && (
                      <div className="absolute top-0 left-0 w-4 h-4 bg-[#10b981]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
                        <svg className="w-2 h-2 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      </div>
                    )}
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Section */}
            <div className="mb-10">
              <label className="block text-[#374151] font-semibold text-[15px] mb-3">Course you're interested in</label>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder="Select course"
                  value={formData.course}
                  onChange={(e) => updateForm('course', e.target.value)}
                  className="pl-10 w-full rounded-xl border border-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {popularCourses.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateForm('course', c)}
                    className={`py-1.5 px-3 rounded-lg border text-[13px] transition-colors outline-1 ${
                      formData.course === c
                        ? 'border-[#3b82f6] text-[#3b82f6] outline-[#3b82f6] outline shadow-sm'
                        : 'border-gray-200 text-[#6b7280] hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={prevStep}
                className="p-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <button 
                onClick={nextStep}
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-4 rounded-xl transition-colors shadow-lg tracking-wide text-[15px]"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 3:
        return renderContactForm(true);
      default:
        return null;
    }
  };

  const renderContactForm = (isGuided: boolean) => (
    <div className="animate-fade-in space-y-5">
      <div>
        <label className="block text-[#111827] font-bold text-[13px] mb-1.5 tracking-wide">Full name</label>
        <input 
          type="text"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={(e) => updateForm('fullName', e.target.value)}
          className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-colors placeholder-gray-400 font-medium"
        />
      </div>

      <div>
        <label className="block text-[#111827] font-bold text-[13px] mb-1.5 tracking-wide">Email</label>
        <input 
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => updateForm('email', e.target.value)}
          className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-colors placeholder-gray-400 font-medium"
        />
      </div>

      <div className="pb-4">
        <label className="block text-[#111827] font-bold text-[13px] mb-1.5 tracking-wide">Mobile number</label>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#7c3aed]/20 focus-within:border-[#7c3aed] transition-all bg-white relative">
          <select
            value={formData.countryCode}
            onChange={(e) => updateForm('countryCode', e.target.value)}
            className="appearance-none bg-gray-50/50 border-r border-gray-200 text-sm font-semibold text-gray-700 px-3 py-3 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer z-10 min-w-[90px]"
            style={{ paddingRight: '1.5rem' }}
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.code}>{c.label} ({c.code})</option>
            ))}
          </select>
          <div className="absolute left-[70px] top-1/2 -translate-y-1/2 pointer-events-none z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
          <input 
            type="tel"
            placeholder="Enter mobile"
            value={formData.mobile}
            onChange={(e) => updateForm('mobile', e.target.value)}
            className="w-full py-3 px-4 text-sm focus:outline-none placeholder-gray-400 font-medium"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        {isGuided && (
          <button 
            onClick={prevStep}
            className="p-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </button>
        )}
        <button 
          onClick={() => window.open('https://student.eaoverseas.com/auth/login', '_blank', 'noopener,noreferrer')}
          className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-4 rounded-xl transition-colors shadow-[0_4px_14px_rgba(124,58,237,0.3)] tracking-wide text-[15px]"
        >
          Sign In
        </button>
      </div>
    </div>
  );

  return (
    <section id="booking-section" className="bg-transparent w-full py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Column: Text & Features */}
        <div className="flex flex-col space-y-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.15] font-sans tracking-tight relative z-10">
              Let's Plan <br />
              <span className="text-[#7c3aed]">Your Future Together!</span>
            </h2>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Feature 1 */}
            <div className="flex items-start space-x-5 group">
              <div className="mt-1 flex-shrink-0 p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-white text-lg font-bold mb-1.5">Course & University Fit</h4>
                <p className="text-[#9ca3af] text-[15px] font-medium leading-relaxed">Get personalized recommendations based on your unique goals and profile background.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-5 group">
              <div className="mt-1 flex-shrink-0 p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white text-lg font-bold mb-1.5">Application Roadmap</h4>
                <p className="text-[#9ca3af] text-[15px] font-medium leading-relaxed">Understand all timelines, key admission steps, and exactly what documents to prepare next.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-5 group">
              <div className="mt-1 flex-shrink-0 p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[22px] h-[22px] text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.018-.39.035-.586.051m.586-.051C21 12.04 21 11.5 21 11.5m-16.5 2.65c.196-.016.392-.033.586-.051m-.586.051C3 14.04 3 13.5 3 13.5m13.504-8.207a45.653 45.653 0 00-6.358-.344c-2.124.061-4.217.229-6.26.5m10.89-1.688a33.014 33.014 0 00-1.968-.092c-1.251-.045-2.516-.045-3.766 0a33.09 33.09 0 00-1.968.092m6.746 2.708A50.519 50.519 0 0011.25 4.5c-1.637 0-3.235.13-4.78.375m11.526 3.033A51.36 51.36 0 0011.25 7.5c-1.621 0-3.197.118-4.71.341" />
                </svg>
              </div>
              <div>
                <h4 className="text-white text-lg font-bold mb-1.5">Scholarships & Visa Guidance</h4>
                <p className="text-[#9ca3af] text-[15px] font-medium leading-relaxed">Get complete clarity on funding options, loan assistance, budgeting, and visa exam prep.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card with Flow */}
        <div className="bg-white bg-grid-pattern rounded-[20px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto flex flex-col pt-3 overflow-hidden">
          
          {/* Form Top Tabs */}
          <div className="flex border-b border-gray-100 px-8 pt-3 relative">
             <button 
                onClick={() => { setActiveTab('guided'); setStep(1); }}
                className={`flex-1 pb-4 text-sm font-bold text-center transition-colors relative ${activeTab === 'guided' ? 'text-[#7c3aed]' : 'text-gray-400 hover:text-gray-600'}`}
             >
                Find Course Match
                {activeTab === 'guided' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7c3aed] rounded-t-full"></div>}
             </button>
             <button 
                onClick={() => setActiveTab('direct')}
                className={`flex-1 pb-4 text-sm font-bold text-center transition-colors relative ${activeTab === 'direct' ? 'text-[#7c3aed]' : 'text-gray-400 hover:text-gray-600'}`}
             >
                Direct Enquiry
                {activeTab === 'direct' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7c3aed] rounded-t-full"></div>}
             </button>
          </div>

          <div className="p-8 lg:p-10 bg-white">
            <h3 className="text-[24px] font-extrabold text-[#111827] mb-8 tracking-tight font-sans">
              Free 1-1 Call with Expert!
            </h3>

            {/* Render Form Body */}
            {activeTab === 'guided' ? renderGuidedStep() : renderContactForm(false)}
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default BookingCTASection;
