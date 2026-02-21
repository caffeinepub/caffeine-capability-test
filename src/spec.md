# Specification

## Summary
**Goal:** Build a dark-themed capability testing app with 11 feature cards that demonstrate real Motoko backend integration, Internet Identity authentication, global persistence, file uploads, and platform limitations on the Internet Computer.

**Planned changes:**
- Create a single-page dark-themed UI with 11 feature test cards in a responsive grid layout
- Implement Local Persistence Test with localStorage todo list
- Build Motoko backend with stable memory for global counter, leaderboard entries, test API responses, and image uploads
- Add Cross-Device Sync Test with global counter backed by Motoko
- Implement Leaderboard Test with global shared leaderboard persisted in Motoko backend
- Add External API Fetch Test calling public REST APIs
- Create API Route/Backend Test demonstrating Motoko canister methods
- Build Email Capability Test with mailto link generation
- Integrate Internet Identity authentication protecting specific cards
- Implement File Upload Test with global image storage in Motoko backend and gallery view
- Add Real-Time Test card explaining WebSocket limitations (NOT SUPPORTED status)
- Create Version/Deploy Test with changelog textarea
- Build URL State/Query Parameter Test that unlocks hidden section with ?code=237
- Apply creative visual theme with distinct colors (avoiding blue/purple)
- Display status badges (PASS / LOCAL-ONLY / NOT SUPPORTED) on each card

**User-visible outcome:** Users can test 11 different platform capabilities including local storage, global persistence across devices, authentication with Internet Identity, file uploads visible to all users, leaderboards, and API interactions, with clear visual indicators showing which features are fully supported, limited, or not available on the Internet Computer platform.
