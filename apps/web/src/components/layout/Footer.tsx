import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONTACTS, getWhatsAppLink } from '@/shared/constants/contacts';
import { destinations } from '@/data/countries';
import logo from '@/assets/logo.webp';

const FALLBACK = 'https://student.eaoverseas.com';

const Footer = () => {
  const navigate = useNavigate();

  const companyLinks = [
    { name: 'About us',            path: '/about' },
    { name: 'Contact us',          path: '/contact' },
    { name: 'Our Team',            path: '/team' },
    { name: 'Privacy Policy',      path: '/privacy-policy' },
    { name: 'Terms & Conditions',  path: '/terms' },
    { name: 'Cookie Policy',       path: '/cookie-policy' },
    { name: 'Help Center',         path: FALLBACK, external: true },
    { name: 'Careers',             path: FALLBACK, external: true },
    { name: 'EAOverseas USA',      path: FALLBACK, external: true },
    { name: 'Sitemap',             path: FALLBACK, external: true },
  ];

  const servicesLinks = [
    { name: 'University Shortlisting', path: FALLBACK, external: true },
    { name: 'SOP / LOR Assistance',    path: FALLBACK, external: true },
    { name: 'Visa Guidance',           path: FALLBACK, external: true },
    { name: 'Scholarship Navigation',  path: FALLBACK, external: true },
    { name: 'Education Loans',         path: FALLBACK, external: true },
    { name: 'Test Prep (IELTS/TOEFL)', path: FALLBACK, external: true },
    { name: 'Accommodation Help',      path: FALLBACK, external: true },
    { name: 'Pre-Departure Briefing',  path: FALLBACK, external: true },
    { name: 'AI Profile Intelligence', path: FALLBACK, external: true },
    { name: 'Loan Calculator',         path: '/loan-calculator' },
  ];

  const resourcesLinks = [
    { name: 'Blogs & Insights',       path: '/blogs' },
    { name: 'Global Testimonials',    path: '/testimonials' },
    { name: 'Student Stories',        path: '/testimonials' },
    { name: 'Event Webinars',         path: FALLBACK, external: true },
    { name: 'Discover Courses',       path: '/discover-courses' },
    { name: 'Country Guides',         path: '/countries' },
    { name: 'Scholarship Database',   path: FALLBACK, external: true },
    { name: 'Visa Checklists',        path: FALLBACK, external: true },
    { name: 'IELTS Preparation',      path: FALLBACK, external: true },
    { name: 'Community Feed',         path: '/ointake-feed' },
  ];

  const quickLinks = [
    { name: 'Expert Advisors',        path: '/team' },
    { name: 'Partner with Us',        path: FALLBACK, external: true },
    { name: 'Refer & Earn',           path: FALLBACK, external: true },
    { name: 'Book a Consultation',    path: '/contact' },
    { name: 'Sign In',                path: 'https://student.eaoverseas.com/auth/login', external: true },
    { name: 'Sign Up',                path: 'https://student.eaoverseas.com/auth/signup', external: true },
    { name: 'News & Updates',         path: '/blogs' },
    { name: 'Work With Us',           path: FALLBACK, external: true },
    { name: 'Media & Press',          path: FALLBACK, external: true },
    { name: 'Feedback',               path: FALLBACK, external: true },
  ];

  const renderLink = (link: { name: string; path: string; external?: boolean }) =>
    link.external ? (
      <a href={link.path} target="_blank" rel="noopener noreferrer"
        className="text-[13px] text-gray-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
        {link.name}
      </a>
    ) : (
      <Link to={link.path}
        className="text-[13px] text-gray-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
        {link.name}
      </Link>
    );

  return (
    <>
      <footer className="bg-[#0f111a] text-white pt-20 pb-10 font-sans relative border-t border-gray-800/50 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">

          {/* ─── Top: Brand + 4 link columns ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 xl:gap-8 pb-14 border-b border-white/[0.06]">

            {/* Brand & Contact */}
            <div className="flex flex-col">
              <Link
                to="/"
                className="flex-shrink-0 cursor-pointer select-none mb-5 inline-block"
                aria-label="EAOverseas Home"
              >
                <img 
                  src={logo} 
                  alt="EAOverseas Logo" 
                  className="h-12 w-auto object-contain transition-all duration-300 ease-in-out" 
                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                />
              </Link>
              <h3 className="text-[18px] font-bold mb-2 tracking-tight text-white">Need an Admission Roadmap?</h3>
              <p className="text-[13px] text-gray-400 mb-5 leading-relaxed">
                Our senior advisors are ready to help you build a winning application for your dream university.
              </p>

              <button
                onClick={() => navigate('/contact')}
                className="bg-[#7a29c2] hover:bg-[#6d28d9] text-white w-full py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 mb-3 transition-all shadow-lg shadow-purple-500/25 border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                Talk To Advisor
              </button>

              <div className="border-t border-white/10 pt-5 mt-4">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-3">Contact</p>
                <div className="space-y-2">
                  <a href={`tel:${CONTACTS.support.phoneSecondary}`} className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#7a29c2]"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.869l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    {CONTACTS.support.phoneSecondary}
                  </a>
                  <a href={`tel:${CONTACTS.support.phone}`} className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#7a29c2]"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                    {CONTACTS.support.phone}
                  </a>
                  <a href={`mailto:${CONTACTS.support.email}`} className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#7a29c2]"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    {CONTACTS.support.email}
                  </a>
                  <p className="flex items-start gap-2 text-[12px] text-gray-500 leading-relaxed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#7a29c2] shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {CONTACTS.support.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#7a29c2] uppercase mb-6">Company</h4>
              <ul className="space-y-3.5">
                {companyLinks.map(link => <li key={link.name}>{renderLink(link)}</li>)}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#7a29c2] uppercase mb-6">Our Services</h4>
              <ul className="space-y-3.5">
                {servicesLinks.map(link => <li key={link.name}>{renderLink(link)}</li>)}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#7a29c2] uppercase mb-6">Resources</h4>
              <ul className="space-y-3.5">
                {resourcesLinks.map(link => <li key={link.name}>{renderLink(link)}</li>)}
              </ul>
            </div>

            {/* Quick Access */}
            <div>
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#7a29c2] uppercase mb-6">Quick Access</h4>
              <ul className="space-y-3.5">
                {quickLinks.map(link => <li key={link.name}>{renderLink(link)}</li>)}
              </ul>
            </div>

          </div>

          {/* ─── Countries row ─── */}
          <div className="py-10 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-[11px] font-extrabold tracking-widest text-[#7a29c2] uppercase">Study Destinations</h4>
              <Link to="/countries" className="text-[11px] font-bold text-white/40 hover:text-[#7a29c2] transition-colors inline-flex items-center gap-1 group">
                View all
                <span className="material-symbols-outlined text-[13px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {destinations.map(dest => (
                <Link
                  key={dest.code}
                  to={`/country/${dest.code}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] hover:border-[#7a29c2]/40 transition-all group"
                >
                  <img
                    src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.webp`}
                    alt={dest.name}
                    className="w-5 h-3.5 object-cover rounded-[2px] flex-shrink-0"
                  />
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors truncate">{dest.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ─── Bottom bar ─── */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">

            {/* Socials */}
            <div className="flex gap-2.5 flex-wrap">
              {['facebook', 'youtube', 'twitter', 'instagram', 'linkedin', 'whatsapp'].map(social => (
                <a
                  key={social}
                  href={social === 'whatsapp' ? getWhatsAppLink() : CONTACTS.socials[social as keyof typeof CONTACTS.socials] || FALLBACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-[#7a29c2] hover:text-white hover:border-[#7a29c2] transition-all"
                  aria-label={`Follow EAOverseas on ${social}`}
                >
                  <div className="w-[13px] h-[13px] bg-current" style={{ maskImage: `url(https://unpkg.com/simple-icons@v9/icons/${social}.svg)`, WebkitMaskImage: `url(https://unpkg.com/simple-icons@v9/icons/${social}.svg)`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} aria-hidden="true"></div>
                </a>
              ))}
            </div>

            {/* Legal pills */}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end text-[12px] text-gray-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="opacity-30">·</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span className="opacity-30">·</span>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>

            <p className="text-[12px] text-gray-500 font-medium whitespace-nowrap">
              © 2026 EAOverseas. All rights reserved
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
