# Firestore Schemas

This document outlines the Firestore collections and their corresponding document schemas for the Zendo application.

## `users`

This collection stores user profile information.

- **Document ID:** `uid` (Firebase Authentication user ID)
- **Schema:**
  - `name`: `string`
  - `email`: `string`
  - `role`: `string` (e.g., "buyer", "agent", "investor")
  - `createdAt`: `timestamp`
  - `updatedAt`: `timestamp`
  - `lastSignInAt`: `timestamp`

## `properties`

This collection stores property listings.

- **Document ID:** Auto-generated
- **Schema:**
  - `address`: `string`
  - `suburb`: `string`
  - `city`: `string`
  - `state`: `string`
  - `postcode`: `string`
  - `price`: `number`
  - `bedrooms`: `number`
  - `bathrooms`: `number`
  - `parking`: `number`
  - `propertyType`: `string` (e.g., "house", "apartment", "townhouse")
  - `status`: `string` (e.g., "forSale", "forRent", "sold")
  - `description`: `string`
  - `features`: `array` of `string`s
  - `images`: `array` of `string`s (URLs)
  - `agentId`: `string` (references a document in the `users` collection)
  - `createdAt`: `timestamp`
  - `updatedAt`: `timestamp`

## `inquiries`

This collection stores user inquiries about properties.

- **Document ID:** Auto-generated
- **Schema:**
  - `propertyId`: `string` (references a document in the `properties` collection)
  - `userId`: `string` (references a document in the `users` collection)
  - `agentId`: `string` (references a document in the `users` collection)
  - `message`: `string`
  - `createdAt`: `timestamp`

## `savedListings`

This collection stores properties that users have saved.

- **Document ID:** `userId` (references a document in the `users` collection)
- **Schema:**
  - `propertyIds`: `array` of `string`s (references documents in the `properties` collection)
  - `updatedAt`: `timestamp`

## `searchHistory`

This collection stores user search queries.

- **Document ID:** `userId` (references a document in the `users` collection)
- **Schema:**
  - `queries`: `array` of `object`s, where each object has:
    - `query`: `string`
    - `timestamp`: `timestamp`
  - `updatedAt`: `timestamp`
