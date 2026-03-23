import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/features/landing/components/ContactSection';

const ContactUs = () => {
    return (
        <div className="bg-white text-[#111418] font-sans antialiased min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-10 pb-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="text-center mb-16 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                            Contact Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Have questions about studying abroad? Our expert counselors are ready to help you navigate your international education journey.
                        </p>
                    </div>
                </div>

                {/* Reusing existing ContactSection component */}
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;

