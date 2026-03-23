export interface Country {
    name: string;
    code: string;
    flag: string;
    tag: string;
    tagColor: string;
    subtitle: string;
    icon: string;
}

export const destinations: Country[] = [
    {
        name: 'United States',
        code: 'US',
        flag: '🇺🇸',
        tag: 'Top Tier',
        tagColor: 'bg-green-100 text-green-700',
        subtitle: 'Ivy League Excellence & Innovation',
        icon: 'school'
    },
    {
        name: 'United Kingdom',
        code: 'GB',
        flag: '🇬🇧',
        tag: 'High ROI',
        tagColor: 'bg-blue-100 text-blue-700',
        subtitle: 'Historic Prestige & Global Hub',
        icon: 'history_edu'
    },
    {
        name: 'Canada',
        code: 'CA',
        flag: '🇨🇦',
        tag: 'Permanent Residency',
        tagColor: 'bg-red-100 text-red-700',
        subtitle: 'Diverse Culture & Work Rights',
        icon: 'work'
    },
    {
        name: 'Australia',
        code: 'AU',
        flag: '🇦🇺',
        tag: 'Lifestyle',
        tagColor: 'bg-indigo-100 text-indigo-700',
        subtitle: 'Sun, Sand & World-Class Research',
        icon: 'sunny'
    },
    {
        name: 'Germany',
        code: 'DE',
        flag: '🇩🇪',
        tag: 'No Tuition',
        tagColor: 'bg-orange-100 text-orange-700',
        subtitle: 'Engineering Hub of Europe',
        icon: 'engineering'
    },
    {
        name: 'Ireland',
        code: 'IE',
        flag: '🇮🇪',
        tag: 'Tech Hub',
        tagColor: 'bg-purple-100 text-purple-700',
        subtitle: 'Silicon Valley of Europe',
        icon: 'settings_ethernet'
    },
    {
        name: 'France',
        code: 'FR',
        flag: '🇫🇷',
        tag: 'Culture',
        tagColor: 'bg-pink-100 text-pink-700',
        subtitle: 'Art, Fashion & Culinary Capital',
        icon: 'brush'
    },
    {
        name: 'New Zealand',
        code: 'NZ',
        flag: '🇳🇿',
        tag: 'Adventure',
        tagColor: 'bg-teal-100 text-teal-700',
        subtitle: 'Innovation & Natural Beauty',
        icon: 'landscape'
    },
    {
        name: 'Japan',
        code: 'JP',
        flag: '🇯🇵',
        tag: 'Technology',
        tagColor: 'bg-red-50 text-red-600',
        subtitle: 'Tradition Meets Innovation',
        icon: 'precision_manufacturing'
    },
    {
        name: 'Singapore',
        code: 'SG',
        flag: '🇸🇬',
        tag: 'Global Hub',
        tagColor: 'bg-cyan-100 text-cyan-700',
        subtitle: 'Gateway to Asia & Finance',
        icon: 'apartment'
    },
    {
        name: 'Netherlands',
        code: 'NL',
        flag: '🇳🇱',
        tag: 'Sustainability',
        tagColor: 'bg-amber-100 text-amber-700',
        subtitle: 'English-Taught & Open Minded',
        icon: 'wind_power'
    },
    {
        name: 'Sweden',
        code: 'SE',
        flag: '🇸🇪',
        tag: 'Innovation',
        tagColor: 'bg-blue-50 text-blue-600',
        subtitle: 'Sustainability & Creativity',
        icon: 'lightbulb'
    }
];
