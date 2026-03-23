import React, { useState } from 'react';
import './ConsultantCTA.css';
import { submitLead } from '@/services/leadVault';
import { useNavigate } from 'react-router-dom';

const ConsultantCTA = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        const res = await submitLead({
            source: 'EAOverseas_Main_Website',
            data: {
                name,
                phone,
                interest: 'Talk to Consultant',
                formName: 'Consultant Feature CTA'
            }
        });
        if (res.success) {
            navigate('/thank-you');
            setStatus('success');
            setName('');
            setPhone('');
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="cta-wrapper">
            <div className="cta-container">
                {/* Decorative Shapes */}
                <div className="cta-shape cta-shape-tl"></div>
                <div className="cta-shape cta-shape-br"></div>

                <div className="cta-content">
                    <h2 className="cta-title">Talk to Our Consultant Now</h2>
                    <form className="cta-form" onSubmit={handleSubmit}>
                        <div className="cta-input-group">
                            <input
                                type="text"
                                placeholder="First name"
                                className="cta-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cta-input-group">
                            <input
                                type="tel"
                                placeholder="Phone No"
                                className="cta-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="cta-submit-btn" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultantCTA;
