// Search Results Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeSearchResults();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize search results page
function initializeSearchResults() {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    
    // Set the search input value
    const searchInput = document.getElementById('search-results-input');
    if (searchInput) {
        searchInput.value = searchQuery;
    }
    
    // Update page title and info
    updateSearchInfo(searchQuery);
    
    // Simulate loading and generate results
    simulateSearchResults(searchQuery);
}

// Set up event listeners
function setupEventListeners() {
    // Search form submission
    const searchForm = document.getElementById('search-results-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchSubmit);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('show');
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04)';
            }
        }
    });
}

// Handle search form submission
function handleSearchSubmit(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-results-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // Update URL with new search query
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('q', query);
        window.history.pushState({}, '', newUrl);
        
        // Update page and search again
        updateSearchInfo(query);
        simulateSearchResults(query);
    }
}

// Update search information
function updateSearchInfo(query) {
    const titleElement = document.getElementById('search-results-title');
    const countElement = document.getElementById('search-results-count');
    
    if (titleElement) {
        if (query) {
            titleElement.textContent = `Results for "${query}"`;
        } else {
            titleElement.textContent = 'Search Results';
        }
    }
    
    if (countElement) {
        countElement.textContent = 'Loading results...';
    }
}

// Simulate search results with loading state
function simulateSearchResults(query) {
    const resultsGrid = document.getElementById('results-grid');
    const loadingState = document.getElementById('loading-state');
    const noResults = document.getElementById('no-results');
    
    // Show loading state
    if (resultsGrid) resultsGrid.innerHTML = '';
    if (loadingState) loadingState.style.display = 'flex';
    if (noResults) noResults.style.display = 'none';
    
    // Simulate API delay
    setTimeout(() => {
        const properties = generateDummyProperties(query);
        
        if (properties.length === 0) {
            // Show no results
            if (loadingState) loadingState.style.display = 'none';
            if (noResults) noResults.style.display = 'flex';
            updateSearchCount(0);
        } else {
            // Display results
            if (loadingState) loadingState.style.display = 'none';
            displayProperties(properties);
            updateSearchCount(properties.length);
        }
    }, 1500);
}

// Generate dummy property data based on search query
function generateDummyProperties(query) {
    const allProperties = [
        {
            id: 1,
            address: '12 Oakwood Avenue, Richmond VIC',
            price: '$1,250,000',
            type: 'House',
            beds: 3,
            baths: 2,
            image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
            propertyType: 'house'
        },
        {
            id: 2,
            address: '8 Beachside Drive, Brighton VIC',
            price: '$2,100,000',
            type: 'House',
            beds: 4,
            baths: 3,
            image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
            propertyType: 'house'
        },
        {
            id: 3,
            address: '45 Collins Street, Melbourne VIC',
            price: '$850,000',
            type: 'Apartment',
            beds: 2,
            baths: 2,
            image: 'https://images.unsplash.com/photo-1545324418-cc1b2da7c5d6?auto=format&fit=crop&w=600&q=80',
            propertyType: 'apartment'
        },
        {
            id: 4,
            address: '23 Park Lane, South Yarra VIC',
            price: '$1,800,000',
            type: 'Townhouse',
            beds: 3,
            baths: 2,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
            propertyType: 'townhouse'
        },
        {
            id: 5,
            address: '67 Richmond Terrace, Richmond VIC',
            price: '$1,450,000',
            type: 'House',
            beds: 3,
            baths: 2,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
            propertyType: 'house'
        },
        {
            id: 6,
            address: '89 St Kilda Road, Melbourne VIC',
            price: '$720,000',
            type: 'Apartment',
            beds: 2,
            baths: 1,
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
            propertyType: 'apartment'
        },
        {
            id: 7,
            address: '34 Chapel Street, Windsor VIC',
            price: '$1,650,000',
            type: 'Townhouse',
            beds: 3,
            baths: 2,
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
            propertyType: 'townhouse'
        },
        {
            id: 8,
            address: '156 Toorak Road, Toorak VIC',
            price: '$3,200,000',
            type: 'House',
            beds: 5,
            baths: 4,
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
            propertyType: 'house'
        },
        {
            id: 9,
            address: '78 Flinders Street, Melbourne VIC',
            price: '$680,000',
            type: 'Apartment',
            beds: 1,
            baths: 1,
            image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80',
            propertyType: 'apartment'
        }
    ];
    
    // Filter properties based on search query
    if (!query) {
        return allProperties;
    }
    
    const queryLower = query.toLowerCase();
    return allProperties.filter(property => {
        return property.address.toLowerCase().includes(queryLower) ||
               property.type.toLowerCase().includes(queryLower) ||
               property.beds.toString().includes(queryLower) ||
               queryLower.includes('richmond') && property.address.toLowerCase().includes('richmond') ||
               queryLower.includes('3bed') && property.beds >= 3 ||
               queryLower.includes('2bed') && property.beds >= 2 ||
               queryLower.includes('apartment') && property.propertyType === 'apartment' ||
               queryLower.includes('house') && property.propertyType === 'house';
    });
}

// Display properties in the grid
function displayProperties(properties) {
    const resultsGrid = document.getElementById('results-grid');
    if (!resultsGrid) return;
    
    resultsGrid.innerHTML = '';
    
    properties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        resultsGrid.appendChild(propertyCard);
    });
}

// Create a property card element
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'search-property-card';
    card.innerHTML = `
        <div class="search-property-img" style="background-image: url('${property.image}')">
            <div class="search-property-badge">For Sale</div>
            <button class="search-property-save-btn" onclick="toggleSaveProperty(this, '${property.address}')" title="Save property">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
        <div class="search-property-card-body">
            <h3 class="search-property-address">${property.address}</h3>
            <div class="search-property-price">${property.price}</div>
            <div class="search-property-details">
                <div class="search-property-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                        <path d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
                    </svg>
                    ${property.beds} bed
                </div>
                <div class="search-property-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <path d="M4 8h16"/>
                        <path d="M8 12h8"/>
                    </svg>
                    ${property.baths} bath
                </div>
            </div>
            <div class="search-property-type">${property.type}</div>
            <button class="search-property-details-btn" onclick="viewPropertyDetails(${property.id})">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Update search count
function updateSearchCount(count) {
    const countElement = document.getElementById('search-results-count');
    if (countElement) {
        if (count === 0) {
            countElement.textContent = 'No properties found';
        } else if (count === 1) {
            countElement.textContent = '1 property found';
        } else {
            countElement.textContent = `${count} properties found`;
        }
    }
}

// Handle filter button clicks
function handleFilterClick(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const filter = e.target.dataset.filter;
    filterProperties(filter);
}

// Filter properties based on selected filter
function filterProperties(filter) {
    const propertyCards = document.querySelectorAll('.search-property-card');
    
    propertyCards.forEach(card => {
        const propertyType = card.querySelector('.search-property-type').textContent.toLowerCase();
        
        if (filter === 'all' || propertyType === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle sort change
function handleSortChange(e) {
    const sortValue = e.target.value;
    sortProperties(sortValue);
}

// Sort properties based on selected option
function sortProperties(sortValue) {
    const resultsGrid = document.getElementById('results-grid');
    const propertyCards = Array.from(resultsGrid.querySelectorAll('.search-property-card'));
    
    propertyCards.sort((a, b) => {
        const priceA = extractPrice(a.querySelector('.search-property-price').textContent);
        const priceB = extractPrice(b.querySelector('.search-property-price').textContent);
        
        if (sortValue === 'price-low') {
            return priceA - priceB;
        } else if (sortValue === 'price-high') {
            return priceB - priceA;
        } else {
            // Default to relevance (no change in order)
            return 0;
        }
    });
    
    // Re-append sorted cards
    propertyCards.forEach(card => resultsGrid.appendChild(card));
}

// Extract numeric price from price string
function extractPrice(priceString) {
    return parseInt(priceString.replace(/[^0-9]/g, ''));
}

// Toggle save property functionality
function toggleSaveProperty(button, address) {
    button.classList.toggle('saved');
    
    if (button.classList.contains('saved')) {
        showToast('Property saved to favorites', 'success');
    } else {
        showToast('Property removed from favorites', 'success');
    }
}

// View property details (placeholder function)
function viewPropertyDetails(propertyId) {
    showToast('Property details page coming soon!', 'success');
    // In a real application, this would navigate to a property details page
    // window.location.href = `/property/${propertyId}`;
}

// Show toast notification
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
} 