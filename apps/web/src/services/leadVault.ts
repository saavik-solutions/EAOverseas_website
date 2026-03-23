export interface LeadData {
    source: string;
    data: Record<string, any>;
}

const BASE_URL = 'https://ea-overseas-backend.render.com/api/v1/leads';

export const submitLead = async (leadData: LeadData): Promise<{ success: boolean; leadId?: string; message?: string }> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leadData)
        });
        
        const data = await response.json();
        if (response.ok) {
            console.log('Lead vaulted successfully in EAOverseas Admin Panel.');
        }
        return { success: response.ok, ...data };
    } catch (error) {
        console.error('Error submitting to Lead Vault:', error);
        return { success: false, message: 'Network error' };
    }
};
