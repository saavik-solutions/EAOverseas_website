export const CONTACTS = {
    whatsapp: {
        number: '+91 97015 63362',
        link: 'https://wa.me/919701563362',
        message: 'Hello! I am interested in learning more about study abroad opportunities with EAOverseas.',
    },
    support: {
        email: 'edu@eaoverseas.com',
        phone: '+91 97015 63362',
        phoneSecondary: '+91 97015 63362',
        address: '6250 West Park Dr Ste 319, Houston, TX 77057 United States',
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
