import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = ['Application', 'Admission', 'Visa', 'Scholarship', 'Accommodation'];

const faqs = [
  // Application
  {
    id: 1,
    question: 'How do I apply to study abroad?',
    answer: 'The first step is to schedule a free consultation with our expert counselors. We will help you identify the right course, university, and country based on your profile and career goals.',
    category: 'Application'
  },
  {
    id: 2,
    question: 'What documents are required to apply for studying overseas for international students?',
    answer: 'Typically, you need academic transcripts, English proficiency test scores (IELTS/TOEFL), a Statement of Purpose (SOP), Letters of Recommendation (LORs), a clean resume, and a valid passport.',
    category: 'Application'
  },
  {
    id: 3,
    question: 'How many universities should I apply to?',
    answer: 'We usually recommend applying to 3-5 universities to maximize your chances. This should include ambitious choices, realistic matches, and safe options based on your academic profile.',
    category: 'Application'
  },
  {
    id: 4,
    question: 'Do I need to take the IELTS or TOEFL before applying?',
    answer: 'While many universities require English proficiency scores during the application stage, some allow you to apply and submit the scores later, receiving a conditional offer in the meantime.',
    category: 'Application'
  },

  // Admission
  {
    id: 5,
    question: 'How long does the admission process take?',
    answer: 'The processing time varies by university and country. On average, it takes between 4 to 8 weeks to receive a decision after submitting a complete application.',
    category: 'Admission'
  },
  {
    id: 6,
    question: 'What is the difference between a conditional and unconditional offer?',
    answer: 'A conditional offer means you have been accepted, but must meet certain criteria (like final grades or language scores) before enrolling. An unconditional offer means you have met all requirements.',
    category: 'Admission'
  },
  {
    id: 7,
    question: 'Can I defer my admission to the next intake?',
    answer: 'Yes, most universities allow you to defer your admission by one semester or an academic year. You will need to formally request the deferral through the university admissions office.',
    category: 'Admission'
  },

  // Visa
  {
    id: 8,
    question: 'When should I start applying for my student visa?',
    answer: 'You should begin the visa application process as soon as you receive your unconditional offer letter (or I-20 for the US/CAS for the UK). Visa processing can take anywhere from 3 to 12 weeks.',
    category: 'Visa'
  },
  {
    id: 9,
    question: 'What are the main financial documents required for a student visa?',
    answer: 'You will need to show proof of funds capable of covering your tuition fees and living expenses for at least the first year. This includes bank statements, education loan sanction letters, or sponsorship affidavits.',
    category: 'Visa'
  },
  {
    id: 10,
    question: 'Will EAOverseas help me prepare for my visa interview?',
    answer: 'Absolutely. We conduct mock visa interviews, help organize your financial documents, and provide comprehensive guidance on how to confidently answer questions from the consular officer.',
    category: 'Visa'
  },

  // Scholarship
  {
    id: 11,
    question: 'Are there scholarships available for international students?',
    answer: 'Yes, many universities and governments offer merit-based and need-based scholarships. During your consultation, our team will match your profile with available scholarship opportunities.',
    category: 'Scholarship'
  },
  {
    id: 12,
    question: 'How do I apply for scholarships?',
    answer: 'Some universities automatically consider you for scholarships based on your application. Others require a separate scholarship application, essays, or additional recommendation letters.',
    category: 'Scholarship'
  },
  {
    id: 13,
    question: 'Does EAOverseas charge extra for scholarship assistance?',
    answer: 'No, scholarship guidance is integrated into our end-to-end admission counseling process at no additional cost.',
    category: 'Scholarship'
  },

  // Accommodation
  {
    id: 14,
    question: 'What housing arrangements can I consider being an international student?',
    answer: 'You have multiple options including on-campus dormitories, off-campus apartments, homestays, and shared student housing. We provide complete assistance with accommodation booking before you fly.',
    category: 'Accommodation'
  },
  {
    id: 15,
    question: 'Should I book my accommodation before I get my visa?',
    answer: 'It is highly recommended to secure your accommodation early, as student housing fills up fast. Many providers offer conditional booking policies that refund your deposit if your visa is rejected.',
    category: 'Accommodation'
  },
  {
    id: 16,
    question: 'Is it better to live on-campus or off-campus?',
    answer: 'On-campus housing is convenient and great for networking, but can be slightly more expensive. Off-campus housing offers more independence and can be more budget-friendly when shared with housemates.',
    category: 'Accommodation'
  }
];

const FAQSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Application');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => faq.category === activeTab);

  return (
    <section id="faq" className="py-24 bg-transparent w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col items-center">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10 w-full relative">
          <div className="absolute top-0 w-32 h-10 bg-[#f5f3ff] rotate-3 skew-x-12 opacity-50 rounded -z-10"></div>
          <div className="bg-[#f5f3ff] text-[#581c87] px-6 py-1.5 rounded-[50px_50px_20px_20px] shadow-sm font-bold text-sm relative z-10 w-36">
            Quick Answers
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1e468a]">
            Frequently Asked <span className="text-[#7c3aed]">Questions</span>
          </h2>
          <p className="text-[#1e468a] max-w-2xl text-[15px] md:text-base mt-2 font-medium">
            From application steps to visa queries, we've covered the most common questions to
            help you move forward with confidence.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full border-[1.5px] transition-all text-[15px] font-medium shadow-sm
                ${activeTab === tab
                  ? 'bg-[#f5f3ff] border-[#7c3aed] text-[#6d28d9]'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pb-8">

          {/* Left Column: FAQs Accordion */}
          <div className="flex-1 w-full flex flex-col space-y-2 mt-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-5 text-left group"
                  >
                    <span className="text-[#1e468a] font-semibold text-base md:text-[17px] pr-8 group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-[#f5f3ff] text-[#7c3aed] flex items-center justify-center transition-transform duration-300 shadow-sm border border-purple-100/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                        className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </button>
                  {/* Expanded Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] pb-6 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 text-sm md:text-base pr-12 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400 italic font-medium">No FAQs available for this category yet.</div>
            )}
          </div>

          {/* Right Column: Image & Call to Action */}
          <div className="lg:w-[450px] w-full flex justify-center lg:justify-end relative pb-10 mt-12 lg:mt-0">

            {/* Abstract blobs background */}
            <div className="absolute top-10 w-[340px] h-[340px] bg-[#dbeafe] rounded-[45%_55%_65%_35%/40%_50%_60%_50%] -z-20 transform -rotate-12 translate-x-4 mix-blend-multiply opacity-80"></div>
            <div className="absolute -bottom-8 right-6 w-[250px] h-[250px] bg-[#fff7ed] rounded-[50%_50%_30%_70%/60%_40%_70%_40%] -z-30 transform translate-y-8 border-[6px] border-[#fbdec6]"></div>

            {/* Main Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
                alt="Counselor"
                className="w-[300px] h-[300px] object-cover object-top rounded-full shadow-lg border-4 border-white"
              />

              {/* Speech Bubble popup — positioned in corner, not over the face */}
              <div className="absolute -top-20 -left-28 bg-white rounded-[20px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-[220px] transform -rotate-3 z-0 float-anim">
                {/* Bubble Tail */}
                <div className="absolute -bottom-3 right-10 w-8 h-8 bg-white transform rotate-45 border-b border-r border-gray-100" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>

                <p className="text-gray-600 text-[13px] font-medium mb-0.5">Got more questions?</p>
                <h4 className="text-[#1e468a] font-bold text-xl mb-4">Let's Talk.</h4>

                <button
                  onClick={() => navigate('/contact')}
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3 py-2 rounded-lg flex items-center justify-between transition-colors shadow-md group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">Talk to Counselor</span>
                  </div>
                  <span className="bg-white text-[#7c3aed] text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Live</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-float {
            0%, 100% { transform: translateY(0px) rotate(-3deg); }
            50% { transform: translateY(-8px) rotate(-3deg); }
        }
        .float-anim {
            animation: subtle-float 4s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default FAQSection;
