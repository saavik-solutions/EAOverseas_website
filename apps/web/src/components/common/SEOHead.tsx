import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
}

export function SEOHead({ 
    title, 
    description, 
    image = '/assets/logo.webp', // Default Logo
    url = 'https://eaoverseas.com',
    type = 'website'
}: SEOHeadProps) {
    const siteTitle = title.includes('EAOverseas') ? title : `${title} | EAOverseas`;
    
    // Ensure absolute image URL for social scrapers
    const siteBaseUrl = 'https://eaoverseas.com';
    const absoluteImage = image.startsWith('http') ? image : `${siteBaseUrl}${image}`;
    const absoluteUrl = url.startsWith('http') ? url : `${siteBaseUrl}${url}`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={absoluteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:site_name" content="EAOverseas" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={absoluteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={absoluteImage} />
        </Helmet>
    );
}
