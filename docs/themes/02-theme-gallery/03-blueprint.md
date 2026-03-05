---
title: Blueprint
theme: blueprint
order: 3
description: A dark technical theme with cyan accents and a grid-line pattern.
---

## The Blueprint Theme

Blueprint channels the look of technical drawings and engineering schematics. Cyan lines on deep navy, monospaced headings (*JetBrains Mono*), and a subtle grid-line background pattern create an unmistakably technical aesthetic.

### When to Use It

Ideal for API documentation, system architecture guides, infrastructure runbooks, developer handbooks, or any content that's deeply technical in nature.

### Colors at a Glance

| Token | Color | Usage |
|---|---|---|
| `primary` | `#22D3EE` | Bright cyan — links, active states |
| `secondary` | `#6366F1` | Indigo — supporting accents |
| `accent` | `#818CF8` | Soft violet — highlights |
| `base-100` | `#0A0F1E` | Deep navy — page background |
| `base-content` | `#CBD5E1` | Slate white — body text |

### Code Example

```typescript
interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  auth: 'bearer' | 'api-key' | 'none'
  rateLimit: { requests: number; windowMs: number }
}

const endpoints: APIEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v2/users/:id',
    auth: 'bearer',
    rateLimit: { requests: 100, windowMs: 60_000 }
  },
]
```

### Sample Content

> *The system architecture follows a microservices pattern with each service owning its data store. Inter-service communication happens via gRPC for synchronous calls and Kafka for event-driven workflows. The API gateway handles authentication, rate limiting, and request routing.*

Blueprint's monospaced headings make technical terms feel at home in titles, and the grid-line background subtly reinforces the structured, schematic feel.

> [!NOTE]
> Blueprint uses the `dracula` Shiki theme for code blocks — a popular choice among developers for its high-contrast, readable syntax colors.

### Tags

This theme auto-assigns to spaces with content about: `technical`, `engineering`, `api`, `code`, `architecture`, `system`, `infrastructure`, `database`, `protocol`, `sdk`, `developer`, `backend`, `devops`, `schema`.

