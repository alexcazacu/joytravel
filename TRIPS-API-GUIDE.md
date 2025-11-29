# Trips API & Admin Guide

## Overview

You now have a complete CRUD API for managing trips (itineraries) using Drizzle ORM with SQLite.

## Database Setup

The database uses SQLite and is stored in `./sqlite.db` (gitignored).

### Initialize the database

```bash
npm run db:push
```

This creates the `trips` table with the following schema:

- `id` - Primary key (UUID)
- `slug` - Unique slug for URLs
- `title` - Trip title
- `featured` - Boolean flag for featured trips
- `summary` - Optional short description
- `metaTitle`, `metaDescription`, `metaOgImage` - SEO fields
- `data` - JSON field containing the full trip object (hero, gallery, itinerary, etc.)
- `createdAt`, `updatedAt` - Timestamps

## API Endpoints

### List all trips
```
GET /api/trips
```

Returns all trips ordered by creation date.

### Get featured trips only
```
GET /api/trips/featured
```

Returns only trips where `featured = true`.

### Create a trip
```
POST /api/trips
Content-Type: application/json

{
  "slug": "sri-lanka-familie-paste-2026",
  "title": "Sri Lanka în Familie - Paște 2026",
  "featured": true,
  "summary": "11 zile în Sri Lanka...",
  "meta": {
    "title": "SEO title",
    "description": "SEO description",
    "og_image": "/path/to/image.jpg"
  },
  "data": {
    "hero": { ... },
    "gallery": [ ... ],
    "overview": { ... },
    "itinerary": [ ... ],
    "accommodations": [ ... ],
    "experiences": { ... },
    "pricing": { ... },
    "faq": [ ... ]
  }
}
```

### Get a single trip
```
GET /api/trips/{id}
```

### Update a trip
```
PUT /api/trips/{id}
Content-Type: application/json

{
  "featured": true,
  "summary": "Updated summary",
  "data": { ... }
}
```

Partial updates supported - only send fields you want to change.

### Delete a trip
```
DELETE /api/trips/{id}
```

## Admin UI

Access the admin interface at:

```
http://localhost:3000/admin/trips
```

### Features:
- **List view** - See all trips with title, slug, featured status, creation date
- **Create form** - Add new trips with all fields including JSON data

### How to create a trip via admin:

1. Go to `/admin/trips`
2. Fill in the form:
   - **Slug**: URL-friendly identifier (e.g., `sri-lanka-paste-2026`)
   - **Title**: Display title
   - **Featured**: Check if this should appear in the itineraries carousel
   - **Summary**: Short description for listings
   - **Meta fields**: SEO metadata
   - **Data (JSON)**: Paste the full trip JSON structure (see example below)
3. Click "Create Trip"

## Example Trip Data JSON

See the full example in the previous message. The minimal structure:

```json
{
  "hero": {
    "title": "Sri Lanka în Familie - Paște 2026",
    "subtitle": "4-15 aprilie • 9 nopți • 11 zile"
  },
  "gallery": [
    { "src": "/sri-lanka/2.png", "alt": "Sigiriya Rock" }
  ],
  "overview": {
    "title": "Overview title",
    "paragraphs": ["Paragraph 1", "Paragraph 2"],
    "tags": [
      { "icon": "lucide:calendar", "label": "Perioada", "value": "4-15 aprilie 2026" }
    ]
  },
  "itinerary": [...],
  "accommodations": [...],
  "experiences": {...},
  "pricing": {...},
  "faq": [...]
}
```

## Landing Page Integration

Featured trips automatically appear on the landing page in the "Călătorii personalizate pentru familia ta" carousel section.

The section only shows if:
1. There are trips in the database
2. At least one trip has `featured: true`

The carousel displays:
- Trip title from `data.hero.title`
- Description from `summary` or first overview paragraph
- First gallery image
- Duration and dates parsed from `hero.subtitle`
- Destinations from `overview.tags`
- First 3 highlights from experiences

## Next Steps

### Implement trip detail pages

Create `/trips/[slug]/page.tsx` to display individual trip details using the full `data` object.

### Add edit/delete to admin

Extend the admin UI to support updating and deleting trips.

### Add authentication

Protect `/admin/*` routes with authentication (e.g., NextAuth.js).

### Migration to production DB

For production, consider migrating from SQLite to PostgreSQL:
1. Update `drizzle.config.ts` to use Postgres
2. Install `pg` instead of `better-sqlite3`
3. Update connection in `src/server/db/client.ts`
