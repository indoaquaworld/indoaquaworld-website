# CLAUDE.md — Indo Aquaworld Website

## Project Overview

Corporate website for Indo Aquaworld, a fish competition management platform provider. Built with Astro SSG, deployed to Cloudflare Pages.

Indo Aquaworld is NOT a fish community — it is the company that builds and operates the competition management platform. Its sole client is DUFI (Djoak United Flowerhorn Indonesia).

## DUFI — Djoak United Flowerhorn Indonesia

DUFI is one of two major flowerhorn (louhan) competition organizations in Indonesia. The other is P2LI (Perhimpunan Pecinta Louhan Indonesia) which is national-level. DUFI operates at an international scale.

- **Flagship event:** Indonesia Louhan Championship (ILC) — multi-chapter national competition held across cities (Semarang, Jakarta/Mangga 2 Square, etc.)
- **Regional events:** DUFI chapters in Lampung, Bengkulu, and other provinces run local mini-contests
- **Competition scale:** events draw 100-200+ fish entries from multiple provinces, across ~12 nomination categories
- **Scoring criteria:** head, face, body, pearly, colour, marking, fantail, overall
- **Social media:** Instagram [@dufi_official](https://instagram.com/dufi_official), [@dufiofficial.event](https://instagram.com/dufiofficial.event)
- **No website** — `dufi.indoaquaworld.com` serves as DUFI's de facto online presence

## Stack

- Astro (static site generator)
- Cloudflare Pages (hosting, auto-deploys from GitHub on push to main)
- Cloudflare Pages Functions (hostname-based routing)
- Domains: `indoaquaworld.com` (corporate), `dufi.indoaquaworld.com` (DUFI)
- DNS managed via Cloudflare

## Site Structure

Multi-page site:

- `/` — Home: hero, featured event, platform overview, DUFI spotlight
- `/platform` — Platform features detail
- `/dufi` — DUFI client page: events, timeline, fish gallery, IG links
- `/about` — Company info, stats, tech, contact

`dufi.indoaquaworld.com` serves `/dufi` content at the root via Cloudflare Pages Functions middleware (`functions/_middleware.ts`).

## Content Strategy

This website is **complementary** to DUFI's Instagram accounts and the competition management app. It is NOT an event archive or photo gallery.

- Event timeline on the website is a high-level summary — Instagram has the full feed
- When the app is complete, link to it for competition results and details
- Do not replicate Instagram content on the website

## Design

- Colors: primary #0065FF, accent #F34913, accent-gold #D4A017, dark #0D1B2A, dark-mid #172B4D, text #344563, gray #E4E5E9
- Fonts: Bebas Neue (display), Source Sans 3 (body)
- Logo: same SVG as the aquaworld-app project
- Fish photos from DUFI Instagram used as hero backgrounds and gallery

## Deployment

- **Hosting:** Cloudflare Pages (project: `indoaquaworld-website`)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Domains:** `indoaquaworld.com`, `dufi.indoaquaworld.com`
- **DNS:** Cloudflare (nameservers: ignacio.ns.cloudflare.com, kami.ns.cloudflare.com)
- **App subdomain:** `app.indoaquaworld.com` → A record to VPS 103.175.221.12

## Related Projects

- **aquaworld-app** (`../aquaworld-app/`) — competition management web app (Spring Boot + Thymeleaf + HTMX), deployed at `app.indoaquaworld.com`
- **indo-aquaworld-be** (`../indo-aquaworld-be/`) — original Spring Boot backend (reference only)
- **indo-aquaworld-mobile** (`../indo-aquaworld-mobile/`) — original Flutter app (reference only)

## What NOT To Do

- Do not position Indo Aquaworld as a fish community — it is a platform provider
- Do not use fallback/default values — throw errors in logs
- Do not add JavaScript frameworks beyond what Astro provides
