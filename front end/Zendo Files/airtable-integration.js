// Airtable Integration for Zendo Property Search
// This file handles all database operations using Airtable API

class AirtableService {
    constructor() {
        this.baseId = CONFIG.AIRTABLE_BASE_ID;
        this.apiKey = CONFIG.AIRTABLE_API_KEY;
        this.baseUrl = 'https://api.airtable.com/v0';
    }

    // Generic method to make API calls
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}/${this.baseId}/${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Airtable API error:', error);
            throw error;
        }
    }

    // Property Management
    async getProperties(filters = {}) {
        let url = `${CONFIG.AIRTABLE_TABLES.PROPERTIES}?view=Grid view`;
        
        // Add filters
        if (filters.suburb) {
            url += `&filterByFormula={Suburb}='${filters.suburb}'`;
        }
        if (filters.minPrice) {
            url += `&filterByFormula={Price}>='${filters.minPrice}'`;
        }
        if (filters.maxPrice) {
            url += `&filterByFormula={Price}<='${filters.maxPrice}'`;
        }
        if (filters.propertyType) {
            url += `&filterByFormula={PropertyType}='${filters.propertyType}'`;
        }

        const response = await this.makeRequest(url);
        return response.records.map(record => this.formatProperty(record));
    }

    async getPropertyById(propertyId) {
        const response = await this.makeRequest(`${CONFIG.AIRTABLE_TABLES.PROPERTIES}/${propertyId}`);
        return this.formatProperty(response);
    }

    async createProperty(propertyData) {
        const response = await this.makeRequest(CONFIG.AIRTABLE_TABLES.PROPERTIES, {
            method: 'POST',
            body: JSON.stringify({
                records: [{
                    fields: propertyData
                }]
            })
        });
        return response.records[0];
    }

    // User Management
    async createUser(userData) {
        const response = await this.makeRequest(CONFIG.AIRTABLE_TABLES.USERS, {
            method: 'POST',
            body: JSON.stringify({
                records: [{
                    fields: {
                        Email: userData.email,
                        Name: userData.name,
                        CreatedAt: new Date().toISOString(),
                        Status: 'Active'
                    }
                }]
            })
        });
        return response.records[0];
    }

    async getUserByEmail(email) {
        const response = await this.makeRequest(
            `${CONFIG.AIRTABLE_TABLES.USERS}?filterByFormula={Email}='${email}'`
        );
        return response.records[0] || null;
    }

    // Saved Properties
    async saveProperty(userId, propertyId) {
        const response = await this.makeRequest(CONFIG.AIRTABLE_TABLES.SAVED_PROPERTIES, {
            method: 'POST',
            body: JSON.stringify({
                records: [{
                    fields: {
                        UserId: [userId],
                        PropertyId: [propertyId],
                        SavedAt: new Date().toISOString()
                    }
                }]
            })
        });
        return response.records[0];
    }

    async getSavedProperties(userId) {
        const response = await this.makeRequest(
            `${CONFIG.AIRTABLE_TABLES.SAVED_PROPERTIES}?filterByFormula={UserId}='${userId}'`
        );
        return response.records;
    }

    async removeSavedProperty(savedPropertyId) {
        await this.makeRequest(`${CONFIG.AIRTABLE_TABLES.SAVED_PROPERTIES}/${savedPropertyId}`, {
            method: 'DELETE'
        });
    }

    // Inquiries
    async createInquiry(inquiryData) {
        const response = await this.makeRequest(CONFIG.AIRTABLE_TABLES.INQUIRIES, {
            method: 'POST',
            body: JSON.stringify({
                records: [{
                    fields: {
                        Name: inquiryData.name,
                        Email: inquiryData.email,
                        Phone: inquiryData.phone,
                        PropertyId: inquiryData.propertyId,
                        Message: inquiryData.message,
                        InquiryType: inquiryData.type,
                        CreatedAt: new Date().toISOString(),
                        Status: 'New'
                    }
                }]
            })
        });
        return response.records[0];
    }

    // Helper method to format property data
    formatProperty(record) {
        return {
            id: record.id,
            title: record.fields.Title || '',
            type: record.fields.PropertyType || '',
            price: record.fields.Price || 0,
            status: record.fields.Status || 'For Sale',
            location: record.fields.Location || '',
            suburb: record.fields.Suburb || '',
            coordinates: {
                lat: record.fields.Latitude || 0,
                lng: record.fields.Longitude || 0
            },
            beds: record.fields.Bedrooms || 0,
            baths: record.fields.Bathrooms || 0,
            parking: record.fields.Parking || 0,
            features: record.fields.Features ? record.fields.Features.split(',') : [],
            tags: record.fields.Tags ? record.fields.Tags.split(',') : [],
            images: record.fields.Images ? record.fields.Images.split(',') : [],
            description: record.fields.Description || '',
            agent: record.fields.Agent || '',
            agentPhone: record.fields.AgentPhone || '',
            agentEmail: record.fields.AgentEmail || '',
            createdAt: record.fields.CreatedAt || '',
            updatedAt: record.fields.UpdatedAt || ''
        };
    }

    // Search properties with advanced filters
    async searchProperties(searchParams) {
        let formula = '';
        const conditions = [];

        if (searchParams.query) {
            conditions.push(`OR(SEARCH('${searchParams.query}', {Title}), SEARCH('${searchParams.query}', {Suburb}), SEARCH('${searchParams.query}', {Location}))`);
        }

        if (searchParams.minPrice) {
            conditions.push(`{Price} >= ${searchParams.minPrice}`);
        }

        if (searchParams.maxPrice) {
            conditions.push(`{Price} <= ${searchParams.maxPrice}`);
        }

        if (searchParams.propertyType && searchParams.propertyType !== 'all-types') {
            conditions.push(`{PropertyType} = '${searchParams.propertyType}'`);
        }

        if (searchParams.bedrooms) {
            conditions.push(`{Bedrooms} >= ${searchParams.bedrooms}`);
        }

        if (conditions.length > 0) {
            formula = `AND(${conditions.join(', ')})`;
        }

        const url = `${CONFIG.AIRTABLE_TABLES.PROPERTIES}?filterByFormula=${encodeURIComponent(formula)}&view=Grid view`;
        const response = await this.makeRequest(url);
        return response.records.map(record => this.formatProperty(record));
    }
}

// Initialize the service
const airtableService = new AirtableService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = airtableService;
} else {
    window.airtableService = airtableService;
} 