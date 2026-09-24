import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { getWhatsAppLink } from '@/shared/constants/contacts';

interface ServiceInfo {
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
}

const SERVICES_DATA: Record<string, ServiceInfo> = {
  'university-shortlisting': {
    title: 'University Shortlisting',
    category: 'Admissions & Selection',
    tagline: 'Personalized match-making across 1,500+ top universities worldwide.',
    description: 'We analyze your academic background, test scores, career ambitions, and budget to curate a balanced portfolio of dream, target, and safe universities.',
    icon: 'school',
    highlights: ['AI-backed Acceptance Scoring', 'Dream/Target/Safe Categorization', 'Direct Institutional Partnerships'],
  },
  'visa-guidance': {
    title: 'Visa Guidance & Filing',
    category: 'Immigration & Compliance',
    tagline: 'End-to-end visa counseling with a 98.4% institutional approval track record.',
    description: 'From financial proof structuring to mock consular interview drills, our visa specialists ensure your student visa application meets strict embassy requirements.',
    icon: 'verified_user',
    highlights: ['Comprehensive Checklist Review', '1-on-1 Mock Embassy Interviews', 'Financial Documentation Vetting'],
  },
  'scholarship-navigation': {
    title: 'Scholarship Navigation',
    category: 'Financial Aid',
    tagline: 'Unlocking $50M+ in international merit and need-based financial awards.',
    description: 'Discover grants, tuition fee waivers, and departmental funding options tailored to your profile with guided essay polishing and timely deadline tracking.',
    icon: 'workspace_premium',
    highlights: ['Merit & Need-based Matching', 'SOP & Scholarship Essay Review', 'Government Grant Advisory'],
  },
  'education-loans': {
    title: 'Education Loans',
    category: 'Financing',
    tagline: 'Lowest interest rates with collateral & non-collateral banking partners.',
    description: 'Quick sanction letters with zero upfront processing fees. We assist you in securing hassle-free study abroad loans from leading banks and NBFCs.',
    icon: 'account_balance',
    highlights: ['15+ Trusted Banking Partners', 'Non-Collateral Options up to ₹75L', 'Fast Digital Sanction Letters'],
  },
  'test-prep': {
    title: 'Test Prep (IELTS / TOEFL / GRE)',
    category: 'Coaching & Testing',
    tagline: 'Target score mastery with certified trainers and adaptive practice mocks.',
    description: 'Comprehensive test preparation featuring real exam simulations, timed sectionals, AI speech analysis, and targeted band improvement strategies.',
    icon: 'menu_book',
    highlights: ['Band 8+ Certified Instructors', 'Full-Length Adaptive Mock Tests', 'Personalized Speaking & Writing Feedback'],
  },
  'accommodation-help': {
    title: 'Accommodation Help',
    category: 'Student Life',
    tagline: 'Safe, verified, and student-friendly residences near campus.',
    description: 'Browse certified student apartments, homestays, and university halls with transparent pricing, verified amenities, and flexible lease terms.',
    icon: 'apartment',
    highlights: ['100% Verified Properties', 'Utility Bills & High-speed WiFi Included', 'Safe Neighborhood Checks'],
  },
  'ai-profile-intelligence': {
    title: 'AI Profile Intelligence',
    category: 'Advanced Profile Analytics',
    tagline: 'Deep candidate profiling and real-time university eligibility assessment.',
    description: 'Our proprietary machine learning engine scans your CV, projects, and academic history to highlight competitive strengths and bridge skill gaps.',
    icon: 'psychology',
    highlights: ['Instant CV & Profile Strength Score', 'Automated Skill Gap Breakdown', 'Tailored Course & University Recommendations'],
  },
  'loan-calculator': {
    title: 'Loan Calculator & Financial Planner',
    category: 'Financing Tools',
    tagline: 'Interactive EMI estimations and comprehensive living cost projections.',
    description: 'Calculate monthly repayments, currency conversions, and complete 4-year study budgets to plan your financial journey with complete clarity.',
    icon: 'calculate',
    highlights: ['Multi-currency Conversion', 'Living Expense Breakdown', 'Custom Repayment Tenure Modelling'],
  },
};

const ServiceComingSoon: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();

  const currentService: ServiceInfo = (serviceSlug && SERVICES_DATA[serviceSlug]) || {
    title: serviceSlug
      ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : 'Specialized Service',
    category: 'Study Abroad Program',
    tagline: 'A comprehensive suite of tools tailored for international students.',
    description: 'Our team of senior counselors and technology experts is finalizing this service module to provide you with the most effective guidance.',
    icon: 'stars',
    highlights: ['Certified Global Advisory', 'Personalized Case Support', '24/7 Student Assistance'],
  };

  const whatsappMessage = `Hello Eduwoy Team! I am interested in learning more about "${currentService.title}". Could you share more details?`;

  return (
    <>
      <SEOHead
        title={`${currentService.title} | Coming Soon - Eduwoy`}
        description={`Details for ${currentService.title} are arriving very soon. Discover international admissions, visa guidance, scholarships, and student loans with Eduwoy.`}
      />

      <div className="min-h-[65vh] flex flex-col justify-center items-center px-4 py-6 md:py-10 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-2xl w-full mx-auto relative z-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Services</span>
            <span>/</span>
            <span className="text-primary font-semibold truncate">{currentService.title}</span>
          </div>

          {/* Hero Card */}
          <div className="bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-full pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ✨ Launching Very Soon
            </div>

            {/* Main Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
              Very soon you will be <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">caught up with all the details!</span>
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
              {currentService.tagline}
            </p>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              {currentService.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
              {currentService.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="w-5 h-5 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                    ✓
                  </span>
                  <span className="text-[11px] font-medium text-gray-200 line-clamp-1">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border-2 border-primary hover:bg-primary-light/20 hover:bg-[#6d28d9] text-primary font-bold font-bold text-xs shadow-md shadow-purple-500/20 border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Talk to an Advisor</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <a
                  href={getWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                >
                  <span className="text-xs">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>

              <Link
                to="/"
                className="text-[11px] font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>← Back to Home</span>
              </Link>
            </div>

          </div>

          {/* Quick Browse Other Services */}
          <div className="mt-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2.5 px-1">
              Explore other services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(SERVICES_DATA)
                .filter(([key]) => key !== serviceSlug)
                .slice(0, 4)
                .map(([slug, s]) => (
                  <Link
                    key={slug}
                    to={`/services/${slug}`}
                    className="p-2.5 rounded-xl bg-[#0f111a]/60 border border-white/5 hover:border-primary/40 hover:bg-white/[0.03] transition-all group"
                  >
                    <p className="text-[11px] font-bold text-white group-hover:text-primary transition-colors truncate mb-0.5">
                      {s.title}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {s.category}
                    </p>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ServiceComingSoon;
