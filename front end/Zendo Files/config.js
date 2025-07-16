// Configuration file for Zendo Property Search
// Replace these placeholder values with your actual API keys

const CONFIG = {
    // Google Maps API
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    
    // Google Analytics
    GA_TRACKING_ID: 'G-3RBR05EVB7',
    
    // Airtable Configuration
    AIRTABLE_API_KEY: 'YOUR_AIRTABLE_API_KEY',
    AIRTABLE_BASE_ID: 'YOUR_AIRTABLE_BASE_ID',
    AIRTABLE_TABLES: {
        PROPERTIES: 'Properties',
        USERS: 'Users',
        SAVED_PROPERTIES: 'SavedProperties',
        INQUIRIES: 'Inquiries'
    },
    
    // Firebase Configuration (for authentication)
    FIREBASE_CONFIG: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-app-id"
    },
    
    // OpenAI Configuration (for AI chatbot)
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY',
    
    // Tally Forms
    TALLY_FORMS: {
        CONTACT: 'nPNYQ0',
        AGENT_REGISTRATION: 'w2YoXV'
    },
    
    // Email Service (Mailchimp)
    MAILCHIMP_API_KEY: 'YOUR_MAILCHIMP_API_KEY',
    MAILCHIMP_LIST_ID: 'YOUR_MAILCHIMP_LIST_ID',
    
    // Property Data APIs
    DOMAIN_API_KEY: 'YOUR_DOMAIN_API_KEY',
    REALESTATE_API_KEY: 'YOUR_REALESTATE_API_KEY',
    
    // Stripe (for payments)
    STRIPE_PUBLISHABLE_KEY: 'YOUR_STRIPE_PUBLISHABLE_KEY',
    
    // Feature Flags
    FEATURES: {
        AI_CHATBOT: true,
        PROPERTY_SAVING: true,
        MORTGAGE_CALCULATOR: true,
        INSTANT_OFFERS: true,
        MAP_INTEGRATION: true
    },
    
    // App Settings
    APP: {
        NAME: 'Zendo',
        DESCRIPTION: 'Your Smart Property Search',
        VERSION: '1.0.0',
        ENVIRONMENT: 'production' // or 'development'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 