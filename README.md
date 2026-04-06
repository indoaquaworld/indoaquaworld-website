# Indo Aquaworld Website

Corporate website for Indo Aquaworld — a fish competition management platform provider.

## Tech Stack

- [Astro](https://astro.build/) — static site generator
- Deployed to GitHub Pages via GitHub Actions
- Domain: `indoaquaworld.com`

## Structure

```
src/
  pages/          — page routes (.astro files)
  layouts/        — shared layout templates
  components/     — reusable UI components
  content/        — Markdown content (events, galleries)
  assets/         — images, logo, fonts
public/           — static files (CNAME, favicon)
```

## Content Authoring

Non-technical users can add/edit content directly on GitHub:

1. Navigate to `src/content/` in the GitHub web editor
2. Create or edit Markdown files with frontmatter
3. Upload photos to the corresponding folder
4. Commit — GitHub Actions builds and deploys automatically

## Local Development

```sh
npm install
npm run dev       # dev server at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```

## Related Projects

- **aquaworld-app** — competition management web app (Spring Boot + Thymeleaf), deployed at `app.indoaquaworld.com`
