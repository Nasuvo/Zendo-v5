# Airtable Database Schema for Zendo

## Overview
This document outlines the complete Airtable database structure needed to power your Zendo property search website.

## Base Setup
1. Create new Airtable base
2. Name it "Zendo Property Database"
3. Set up the following tables

## Table 1: Properties

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| Title | Single line text | Property title | "Modern Family Home in Rowville" |
| PropertyType | Single select | Type of property | House, Apartment, Townhouse, Villa, Unit, Land, Commercial |
| Price | Number | Property price | 1150000 |
| Status | Single select | Listing status | For Sale, For Rent, Sold, Under Contract |
| Location | Single line text | Full address | "12 Oakwood Ave, Rowville VIC 3178" |
| Suburb | Single line text | Suburb name | "Rowville" |
| State | Single select | Australian state | VIC, NSW, QLD, WA, SA, TAS, ACT, NT |
| Postcode | Number | Postcode | 3178 |
| Latitude | Number | GPS latitude | -37.9333 |
| Longitude | Number | GPS longitude | 145.2333 |
| Bedrooms | Number | Number of bedrooms | 4 |
| Bathrooms | Number | Number of bathrooms | 3 |
| Parking | Number | Number of parking spaces | 2 |
| LandSize | Number | Land size in m² | 600 |
| Features | Long text | Comma-separated features | "Pool, Garden, Study, Garage" |
| Tags | Long text | Comma-separated tags | "family, suburban, spacious" |
| Images | Long text | Comma-separated image URLs | "https://example.com/img1.jpg,https://example.com/img2.jpg" |
| Description | Long text | Property description | "Beautiful family home..." |
| Agent | Single line text | Agent name | "John Smith" |
| AgentPhone | Phone number | Agent phone | "+61 123 456 789" |
| AgentEmail | Email | Agent email | "john@realestate.com" |
| CreatedAt | Date | Listing creation date | 2024-01-15 |
| UpdatedAt | Date | Last update date | 2024-01-20 |
| Featured | Checkbox | Featured property | true/false |
| Premium | Checkbox | Premium listing | true/false |

### Views:
- **Grid view** - All properties
- **For Sale** - Filtered by status
- **For Rent** - Filtered by status
- **Featured** - Featured properties only
- **Recent** - Recently added properties

## Table 2: Users

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| Email | Email | User email | "user@example.com" |
| Name | Single line text | Full name | "John Doe" |
| Phone | Phone number | Phone number | "+61 123 456 789" |
| Status | Single select | Account status | Active, Inactive, Suspended |
| UserType | Single select | User type | Buyer, Seller, Agent, Investor |
| Preferences | Long text | JSON preferences | {"minPrice": 500000, "maxPrice": 1500000} |
| CreatedAt | Date | Account creation | 2024-01-15 |
| LastLogin | Date | Last login date | 2024-01-20 |
| LeadScore | Number | Lead score (0-100) | 75 |
| Subscription | Single select | Subscription type | Free, Premium, Pro |

### Views:
- **All Users** - Complete user list
- **Active Users** - Active accounts only
- **Premium Users** - Paid subscribers
- **High Value Leads** - High lead scores

## Table 3: SavedProperties

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| UserId | Link to Users | User who saved | [User record] |
| PropertyId | Link to Properties | Saved property | [Property record] |
| SavedAt | Date | Save date | 2024-01-15 |
| Notes | Long text | User notes | "Great location for family" |
| Alert | Checkbox | Price alert enabled | true/false |

### Views:
- **All Saved** - All saved properties
- **By User** - Grouped by user
- **Recent Saves** - Recently saved

## Table 4: Inquiries

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| Name | Single line text | Inquirer name | "Jane Smith" |
| Email | Email | Inquirer email | "jane@example.com" |
| Phone | Phone number | Phone number | "+61 123 456 789" |
| PropertyId | Link to Properties | Property inquired about | [Property record] |
| InquiryType | Single select | Type of inquiry | General, Viewing, Offer, Question |
| Message | Long text | Inquiry message | "I'm interested in viewing this property" |
| Status | Single select | Inquiry status | New, Contacted, Scheduled, Closed |
| Priority | Single select | Priority level | Low, Medium, High, Urgent |
| AssignedTo | Link to Users | Assigned agent | [User record] |
| CreatedAt | Date | Inquiry date | 2024-01-15 |
| FollowUpDate | Date | Follow-up date | 2024-01-22 |

### Views:
- **All Inquiries** - Complete inquiry list
- **New Inquiries** - Unassigned inquiries
- **My Inquiries** - Assigned to current user
- **High Priority** - High priority inquiries

## Table 5: PropertyAlerts

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| UserId | Link to Users | User setting alert | [User record] |
| AlertType | Single select | Alert type | New Listing, Price Drop, Status Change |
| Criteria | Long text | JSON search criteria | {"suburb": "Rowville", "maxPrice": 1200000} |
| Active | Checkbox | Alert active | true/false |
| Frequency | Single select | Alert frequency | Daily, Weekly, Monthly |
| CreatedAt | Date | Alert creation | 2024-01-15 |
| LastSent | Date | Last alert sent | 2024-01-20 |

### Views:
- **Active Alerts** - Active alerts only
- **By User** - Grouped by user
- **Daily Alerts** - Daily frequency alerts

## Table 6: MarketData

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| Suburb | Single line text | Suburb name | "Rowville" |
| State | Single select | State | VIC |
| MedianPrice | Number | Median house price | 1150000 |
| MedianRent | Number | Median weekly rent | 650 |
| GrowthRate | Number | Annual growth % | 5.2 |
| DaysOnMarket | Number | Average days on market | 45 |
| SupplyLevel | Single select | Market supply | Low, Medium, High |
| UpdatedAt | Date | Data update date | 2024-01-15 |

### Views:
- **All Markets** - Complete market data
- **High Growth** - High growth suburbs
- **By State** - Grouped by state

## Table 7: Agents

### Fields:
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| Name | Single line text | Agent name | "John Smith" |
| Email | Email | Agent email | "john@realestate.com" |
| Phone | Phone number | Phone number | "+61 123 456 789" |
| Agency | Single line text | Agency name | "Smith Real Estate" |
| License | Single line text | License number | "REIV123456" |
| Specialties | Long text | Comma-separated specialties | "Residential, Investment, First Home Buyers" |
| Suburbs | Long text | Comma-separated suburbs | "Rowville, Wantirna, Knoxfield" |
| Rating | Number | Average rating (1-5) | 4.5 |
| Active | Checkbox | Active agent | true/false |
| CreatedAt | Date | Agent registration | 2024-01-15 |

### Views:
- **Active Agents** - Active agents only
- **By Suburb** - Grouped by suburb
- **Top Rated** - High-rated agents

## Relationships

### Link Fields:
1. **SavedProperties.UserId** → **Users**
2. **SavedProperties.PropertyId** → **Properties**
3. **Inquiries.PropertyId** → **Properties**
4. **Inquiries.AssignedTo** → **Users**
5. **PropertyAlerts.UserId** → **Users**

## Automation Setup

### Airtable Automations:
1. **New Property Alert** - When new property added, notify users with matching alerts
2. **Inquiry Assignment** - Auto-assign inquiries to available agents
3. **Follow-up Reminder** - Send follow-up reminders for inquiries
4. **Market Data Update** - Weekly market data updates
5. **User Activity Tracking** - Track user interactions and update lead scores

## Data Import

### Sample Data Sources:
1. **Domain API** - Import property listings
2. **RealEstate.com.au API** - Import property data
3. **CoreLogic API** - Import market data
4. **Manual Entry** - Agent property submissions

## Security & Permissions

### User Access Levels:
1. **Public** - Read-only access to properties
2. **Registered Users** - Save properties, create alerts
3. **Agents** - Manage their listings, view inquiries
4. **Admin** - Full access to all data

## Backup & Maintenance

### Regular Tasks:
1. **Daily** - Export data backup
2. **Weekly** - Clean up old records
3. **Monthly** - Update market data
4. **Quarterly** - Review and optimize structure 