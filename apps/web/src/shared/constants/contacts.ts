export const CONTACTS = {
    whatsapp: {
        number: '+91 97015 63362',
        link: 'https://wa.me/919701563362',
        message: 'Hello! I am interested in learning more about study abroad opportunities with EAOverseas.',
    },
    support: {
        email: 'support@eaoverseas.com',
        phone: '+91 6366421078',
        tollFree: '1800-270-6088',
        address: '1st floor, Chandermukhi Building, Nariman Point, Mumbai, Maharashtra 400021',
    },
    socials: {
        facebook: 'https://facebook.com/eaoverseas',
        youtube: 'https://youtube.com/eaoverseas',
        twitter: 'https://twitter.com/eaoverseas',
        instagram: 'https://instagram.com/eaoverseas',
        linkedin: 'https://linkedin.com/company/eaoverseas',
    }
};

export const getWhatsAppLink = (message?: string) => {
    const baseUrl = `https://wa.me/919701563362`;
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return `${baseUrl}?text=${encodeURIComponent(CONTACTS.whatsapp.message)}`;
};
