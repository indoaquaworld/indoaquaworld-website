# CLAUDE.md — Indo Aquaworld Website

## Project Overview

Corporate website for Indo Aquaworld, a fish competition management platform provider. Built with Astro SSG, deployed to GitHub Pages.

Indo Aquaworld is NOT a fish community — it is the company that builds and operates the competition management platform. Its sole client is DUFI (Djoak United Flowerhorn Indonesia).

## DUFI — Djoak United Flowerhorn Indonesia

DUFI is one of two major flowerhorn (louhan) competition organizations in Indonesia. The other is P2LI (Perhimpunan Pecinta Louhan Indonesia) which is national-level. DUFI operates at an international scale.

- **Flagship event:** Indonesia Louhan Championship (ILC) — multi-chapter national competition held across cities (Semarang, Jakarta/Mangga 2 Square, etc.)
- **Regional events:** DUFI chapters in Lampung, Bengkulu, and other provinces run local mini-contests
- **Competition scale:** events draw 100-200+ fish entries from multiple provinces, across ~12 nomination categories
- **Scoring criteria:** head, face, body, pearly, colour, marking, fantail, overall
- **Social media:** Instagram [@dufi_official](https://instagram.com/dufi_official), [@dufiofficial.event](https://instagram.com/dufiofficial.event)
- **No website** — this site serves as DUFI's de facto online presence due to personnel constraints

## Stack

- Astro (static site generator)
- GitHub Pages (hosting, via GitHub Actions)
- Domain: `indoaquaworld.com`

## Site Structure

1. **Hero** — Indo Aquaworld as a fish competition management platform
2. **Features** — platform capabilities (event management, scoring, ranking, tank registration)
3. **DUFI section** — client spotlight, event timeline, links to Instagram
4. **About** — company info
5. **Contact/Footer**

The DUFI section serves as DUFI's de facto online presence since they have no website of their own.

## Content Strategy

This website is **complementary** to DUFI's Instagram accounts and the competition management app. It is NOT an event archive or photo gallery.

- Event timeline on the website is a high-level summary — Instagram has the full feed
- When the app is complete, link to it for competition results and details
- Do not replicate Instagram content on the website

## Design

- Colors: primary #0065FF, accent #F34913, dark #172B4D, text #344563, gray #E4E5E9
- Font: Roboto (Google Fonts)
- Logo: same SVG as the aquaworld-app project
- Shared design system with `app.indoaquaworld.com`

## Related Projects

- **aquaworld-app** (`../aquaworld-app/`) — competition management web app (Spring Boot + Thymeleaf + HTMX), deployed at `app.indoaquaworld.com`
- **indo-aquaworld-be** (`../indo-aquaworld-be/`) — original Spring Boot backend (reference only)
- **indo-aquaworld-mobile** (`../indo-aquaworld-mobile/`) — original Flutter app (reference only)

## What NOT To Do

- Do not position Indo Aquaworld as a fish community — it is a platform provider
- Do not use fallback/default values — throw errors in logs
- Do not add dynamic server-side features — this is a static site
- Do not add JavaScript frameworks beyond what Astro provides
