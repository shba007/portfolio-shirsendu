<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/shba007/portfolio-shirsendu/main/public/logo.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/shba007/portfolio-shirsendu/main/public/logo.svg">
    <img src="https://raw.githubusercontent.com/shba007/portfolio-shirsendu/main/public/logo.png" alt="Developer's Portfolio Logo" width="75">
  </picture>
</p>

<h1 align="center">Developer's Portfolio</h1>

<p align="center">
  A production-grade, multi-platform personal developer portfolio and service platform built with Nuxt 4, Vue 3, Nitro, and Tauri 2. Features real-time Notion CMS integration, automated Google Meet scheduling, Model Context Protocol (MCP) server support, Web Push notifications, and responsive desktop/mobile native targets.
</p>

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="Better Stack Uptime Status">
  </a>
  <a href="https://github.com/shba007/portfolio-shirsendu/releases">
    <img src="https://img.shields.io/github/v/release/shba007/portfolio-shirsendu?logo=github&color=0593FA" alt="GitHub Release">
  </a>
  <a href="https://github.com/shba007/portfolio-shirsendu/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/shba007/portfolio-shirsendu?color=0593FA" alt="License: GPL-3.0">
  </a>
  <a href="https://nuxt.com">
    <img src="https://img.shields.io/badge/Nuxt-4.5.2-00DC82?logo=nuxt" alt="Nuxt 4">
  </a>
  <a href="https://tauri.app">
    <img src="https://img.shields.io/badge/Tauri-2.12-24C8DB?logo=tauri&logoColor=white" alt="Tauri 2">
  </a>
  <a href="https://bun.sh">
    <img src="https://img.shields.io/badge/Bun-1.4.3-fbf0df?logo=bun&logoColor=black" alt="Bun 1.4">
  </a>
  <a href="https://github.com/shba007/portfolio-shirsendu/pkgs/container/portfolio-shirsendu">
    <img src="https://img.shields.io/badge/GHCR-portfolio--shirsendu-2496ED?logo=docker&logoColor=white" alt="Docker GHCR">
  </a>
</p>

---

### Features

- 🖥️ **Full-Stack SSR & Nitro Engine:** Powered by Nuxt 4, Vue 3, Vite, and Nitro with route-level caching, immutable static asset policies, and IPX image optimization.
- 📱 **Cross-Platform Native Apps:** Built with Tauri 2 and Rust (`src-tauri`), targeting desktop (macOS Apple Silicon/Intel, Windows, Linux) and mobile (Android universal APK and AAB).
- 🗂️ **Notion Headless CMS:** Real-time data synchronization for projects, project screenshots, client records, and newsletter subscriptions via `@notionhq/client`.
- 🤖 **MCP Server Integration:** Built-in Model Context Protocol server (`@nuxtjs/mcp-toolkit`) exposing tool endpoints (`get-projects`, `get-project`) at `/mcp` for LLM agents.
- 📅 **Automated Scheduling & Emails:** Google Meet API v2 integration for dynamic space creation, paired with external email webhook API dispatch via native `$fetch`.
- 🔔 **VAPID Web Push Notifications:** Browser push notification pipeline backed by local Nitro storage (`unstorage`) and `web-push`.
- 🐋 **Production Containerization:** Optimized multi-stage Docker builds using `oven/bun:1-alpine`, published to GitHub Container Registry (GHCR).

---

### Visual Demo

<p align="center">
  <img src="https://raw.githubusercontent.com/shba007/portfolio-shirsendu/main/public/previews/landing.webp" alt="Developer's Portfolio Landing Preview" width="100%">
</p>

---

### Architecture & System Design

```
                     ┌──────────────────────────────────────────────┐
                     │               Client Targets                 │
                     │  Web (PWA) │ Desktop (Tauri) │ Mobile (APK)  │
                     └──────────────────────┬───────────────────────┘
                                            │
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │             Nuxt 4 / Nitro Server            │
                     ├──────────────────────┬───────────────────────┤
                     │   REST API (/api/*)  │    MCP Server (/mcp)  │
                     └──────────┬───────────┴───────────┬───────────┘
                                │                       │
         ┌──────────────────────┼───────────────────────┼──────────────────────┐
         ▼                      ▼                       ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────┐
│   Notion API     │  │ Google Meet API  │  │ External Mail API │  │ Nitro Unstorage  │
│ Projects, Assets │  │ OAuth2 Space Gen │  │  Webhook Engine   │  │ .data & static   │
└──────────────────┘  └──────────────────┘  └───────────────────┘  └──────────────────┘
```

---

### HTTP API Reference

All routes are hosted on the Nitro server runtime. Cached endpoints utilize memory/disk caching headers.

| Endpoint                                  |  Method  | Auth | Cache TTL | Description                                                                                              |
| :---------------------------------------- | :------: | :--: | :-------: | :------------------------------------------------------------------------------------------------------- |
| `/api/health`                             |  `GET`   | None |   None    | Returns server health status, build time, version, and node hostname.                                    |
| `/api/project`                            |  `GET`   | None |    60s    | Fetches active projects from Notion and supplements repo stars/releases via `ungh.cc`.                   |
| `/api/project/:slug`                      |  `GET`   | None |    60s    | Fetches full metadata, gallery images, and release details for a specific project.                       |
| `/api/contact`                            |  `POST`  | None |   None    | Validates contact payload, reserves Google Meet space, inserts Notion row, and sends confirmation email. |
| `/api/newsletter`                         |  `POST`  | None |   None    | Adds subscriber email address into Notion newsletter database.                                           |
| `/api/certificate`                        |  `GET`   | None |   3600s   | Parses and returns certifications sorted descending by date from `static/data/certificates.yml`.         |
| `/api/experience`                         |  `GET`   | None |   3600s   | Parses and returns work experiences from `static/data/experiences.yml`.                                  |
| `/api/hackathon`                          |  `GET`   | None |   3600s   | Parses and returns hackathon participation records from `static/data/hackathons.yml`.                    |
| `/certificates/:file`                     |  `GET`   | None |   3600s   | Streams raw certificate PDF or image assets from filesystem storage.                                     |
| `/api/notification/email/subscribe`       |  `POST`  | None |   None    | Registers an email subscriber in local persistent storage (`data:subscription:email`).                   |
| `/api/notification/email/send`            |  `POST`  | None |   None    | Sends a transactional email template (`contact` or `prospect`) to a recipient list.                      |
| `/api/notification/email/:id/send`        |  `POST`  | None |   None    | Dispatches an email template to a specific subscriber ID.                                                |
| `/api/notification/email/:id/unsubscribe` | `DELETE` | None |   None    | Deletes an email subscription by ID from persistent storage.                                             |
| `/api/notification/push/subscribe`        |  `POST`  | None |   None    | Stores Web Push subscription client credentials (`endpoint`, `p256dh`, `auth`).                          |
| `/api/notification/push/send`             |  `POST`  | None |   None    | Broadcasts a push notification payload (`title`, `body`, `url`, `icon`) to all subscribers.              |
| `/api/notification/push/:id/send`         |  `POST`  | None |   None    | Dispatches a push notification to a single subscriber by auth key.                                       |
| `/api/notification/push/:id/unsubscribe`  | `DELETE` | None |   None    | Removes a push notification subscription by auth key.                                                    |

#### Example: Submit Contact Form (`POST /api/contact`)

```bash
curl -X POST https://shirsendu-bairagi.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "company": "Acme Corp",
    "email": "jane@example.com",
    "projectDescription": "Need full-stack architectural design for microfrontends.",
    "meetingTime": "2026-11-01T14:00:00.000Z"
  }'
```

> [!NOTE]
> `meetingTime` must be a valid ISO date string scheduled within business hours (10:00 to 18:00 local meeting time).

---

### Model Context Protocol (MCP) Server

The application implements an MCP server endpoint at `/mcp` using `@nuxtjs/mcp-toolkit` and `@modelcontextprotocol/sdk`.

#### Discovery & Metadata

- **MCP Endpoint:** `/mcp`
- **Server Cards:** `/.well-known/mcp.json`, `/.well-known/mcp/server-card.json`, `/mcp/server-card`
- **LLM Context File:** `/llms-full.txt`

#### Registered Tools

| Tool Name      | Parameters                                                                                    | Required | Description                                                                                                 |
| :------------- | :-------------------------------------------------------------------------------------------- | :------: | :---------------------------------------------------------------------------------------------------------- |
| `get-projects` | `technology` (string)<br>`query` (string)<br>`limit` (int, 1-50)<br>`offset` (int, default 0) |   None   | Search, filter, and paginate projects by technology stack (`nuxt`, `rust`, `typescript`), name, or keyword. |
| `get-project`  | `id` (string)                                                                                 |   `id`   | Fetches full project details (repository URL, live URL, stars, release version) by slug ID.                 |

#### Claude Desktop / Agent Configuration

```json
{
  "mcpServers": {
    "developer-portfolio": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sse", "https://shirsendu-bairagi.dev/mcp"]
    }
  }
}
```

---

### Background Tasks

Nitro automated tasks are located under `server/tasks/`:

- **`company:outreach`** (`server/tasks/company/outreach.ts`): Queries verified companies from Notion, extracts featured projects dynamically from `/api/project`, and dispatches personalized outreach payloads to the external email API, updating the Notion company status to `Initiate`.

Run background tasks using the Nitro task CLI:

```bash
bunx nitropack task run company:outreach
```

---

### Environment Variables

Configure your environment variables in `.env` (or `.env.prod` for production):

| Variable                                  | Environment |   Default    | Description                                                                                                    |
| :---------------------------------------- | :---------: | :----------: | :------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                                |     All     | `production` | Runtime mode (`development` or `production`).                                                                  |
| `PORT`                                    |     All     |    `3000`    | HTTP port the server binds to.                                                                                 |
| `NOTION_API_KEY`                          |   Server    |      —       | Notion Internal Integration Token.                                                                             |
| `NUXT_PRIVATE_NOTION_DB_ID`               |   Server    |      —       | Serialized mapping of Notion Database IDs (`prospect`, `client`, `project`, `asset`, `newsletter`, `company`). |
| `NUXT_PUBLIC_SITE_URL`                    |   Public    |      —       | Canonical base URL (e.g. `https://shirsendu-bairagi.dev`).                                                     |
| `NUXT_PUBLIC_CDN_URL`                     |   Public    |      —       | Base CDN host for IPX optimized images.                                                                        |
| `NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID` |   Public    |      —       | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).                                                            |
| `NUXT_PUBLIC_VAPID_KEY`                   |   Public    |      —       | Public VAPID key for Web Push client subscription.                                                             |
| `NUXT_PRIVATE_VAPID_KEY`                  |   Server    |      —       | Private VAPID key for signing web push payloads.                                                               |
| `NUXT_PRIVATE_VAPID_SUBJECT`              |   Server    |      —       | Contact mailto URI for Web Push (`mailto:admin@example.com`).                                                  |
| `EMAIL_API_URL`                           |   Server    |      —       | External HTTP email API / webhook endpoint URL.                                                                |
| `EMAIL_API_KEY`                           |   Server    |      —       | Bearer token / API authorization key for the external email API.                                               |
| `NUXT_PRIVATE_OAUTH_CLIENT_ID`            |   Server    |      —       | Google Cloud OAuth2 Client ID for Google Meet API.                                                             |
| `NUXT_PRIVATE_OAUTH_CLIENT_SECRET`        |   Server    |      —       | Google Cloud OAuth2 Client Secret.                                                                             |
| `NUXT_PRIVATE_OAUTH_REFRESH_TOKEN`        |   Server    |      —       | Google Cloud OAuth2 Refresh Token for generating access tokens.                                                |
| `NUXT_PRIVATE_SERVER_VALIDATION_KEY`      |   Server    |      —       | Secret Bearer token for protected internal API routes.                                                         |
| `PLATFORM_ENV`                            |    Tauri    |      —       | Set to `native` to toggle static prerendering and disable SSR for Tauri targets.                               |

---

### Deployment

#### Production with Docker Compose

The production stack uses the official image published to GitHub Container Registry:

1. Create a `docker-compose.prod.yml` or use the repository file:

```yaml
services:
  app:
    image: ghcr.io/shba007/portfolio-shirsendu:latest
    env_file:
      - .env
    volumes:
      - portfolio-shirsendu_static:/app/static
      - portfolio-shirsendu_data:/app/.data
    ports:
      - 3000:3000
    restart: on-failure:3

volumes:
  portfolio-shirsendu_static:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /root/portfolio-shirsendu/static
  portfolio-shirsendu_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /root/portfolio-shirsendu/.data
```

2. Start the service:

```bash
docker compose -f docker-compose.prod.yml up -d
```

#### Local Container Build

```bash
# Build Docker image
bun run docker:build

# Run containerized instance locally
bun run docker:start
```

---

<details>
<summary><strong>Local Development & Scripts</strong></summary>

### Prerequisites

- **Bun:** `^1.2.9` (recommended `bun@1.4.3`)
- **Node.js:** `^22.11.0 || ^24.14.0`
- **Rust:** `1.77.2+` (only required for Tauri desktop/mobile builds)
- **k6:** (optional, for load testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/shba007/portfolio-shirsendu.git
cd portfolio-shirsendu

# Install dependencies using Bun
bun install --frozen-lockfile
```

### Development Scripts

| Command            | Description                                                                                |
| :----------------- | :----------------------------------------------------------------------------------------- |
| `bun run dev`      | Starts the Nuxt local development server at `http://localhost:3000`.                       |
| `bun run build`    | Compiles production SSR bundle into `.output` and copies `static` assets.                  |
| `bun run preview`  | Runs local preview of the built Nitro output bundle.                                       |
| `bun run generate` | Prerenders all static routes for static hosting.                                           |
| `bun run start`    | Boots compiled server using Node.js: `node --env-file=.env.prod .output/server/index.mjs`. |
| `bun run clean`    | Cleans `.nuxt`, `.output`, and Tauri Cargo build cache (`cargo clean`).                    |
| `bun run lint`     | Runs ESLint across the codebase with `--fix`.                                              |
| `bun run format`   | Formats all code files using Prettier and `prettier-plugin-tailwindcss`.                   |
| `bun run detect`   | Runs Gitleaks scanner to detect hardcoded secrets or credentials.                          |

### Testing Scripts

| Command                    | Description                                                     |
| :------------------------- | :-------------------------------------------------------------- |
| `bun run test`             | Executes Vitest test suite.                                     |
| `bun run test:watch`       | Runs Vitest in interactive watch mode.                          |
| `bun run test:coverage`    | Generates Vitest code coverage report.                          |
| `bun run test:unit`        | Executes unit tests specifically (`vitest --project unit`).     |
| `bun run test:nuxt`        | Executes Nuxt integration test suite (`vitest --project nuxt`). |
| `k6 run test/load.test.ts` | Runs k6 load performance test against target health endpoint.   |

### Tauri Native Builds

| Command                      | Target  | Description                                                  |
| :--------------------------- | :-----: | :----------------------------------------------------------- |
| `bun run tauri:dev`          | Desktop | Runs Tauri desktop app with HMR.                             |
| `bun run tauri:build`        | Desktop | Compiles native desktop bundles for current OS.              |
| `bun run tauri:dev:mobile`   | Android | Starts Android development emulator/device session.          |
| `bun run tauri:build:mobile` | Android | Compiles universal release APK and Android App Bundle (AAB). |

</details>

---

### License & Contributors

Published under the [GNU GPLv3](https://github.com/shba007/portfolio-shirsendu/blob/main/LICENSE) license.

<br>

<a href="https://github.com/shba007/portfolio-shirsendu/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=shba007/portfolio-shirsendu" alt="Contributors">
</a>
