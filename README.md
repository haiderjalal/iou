# Institute of Urbanism — Website

The website of the **Institute of Urbanism (IoU)**, an Islamabad-based policy research institute and
think tank working for nature-inclusive, just urban development in Pakistan.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript (strict)** and
**Tailwind CSS v4**. See [`docs/site-plan.md`](docs/site-plan.md) for the design rationale, information
architecture and technical decisions.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command              | Purpose                              |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the development server         |
| `npm run build`      | Production build (prerenders pages)  |
| `npm run start`      | Serve the production build           |
| `npm run lint`       | ESLint                               |
| `npm run typecheck`  | TypeScript type check                |
| `npm run format`     | Format with Prettier                 |

Before opening a pull request, run `npm run lint`, `npm run typecheck` and `npm run build`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values.

| Variable               | Required | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical site URL (defaults to `https://iupk.org`)                |
| `RESEND_API_KEY`       | No\*     | [Resend](https://resend.com) API key for the contact form          |
| `CONTACT_TO_EMAIL`     | No\*     | Inbox that receives contact form messages                          |
| `CONTACT_FROM_EMAIL`   | No\*     | Verified sender, e.g. `IoU Website <website@iupk.org>`             |

\* Without these, the contact form still validates input but asks visitors to email `info@iupk.org` directly.

## Project structure

```
src/
├── app/                 Routes, layout, metadata routes (sitemap, robots, manifest), error/404
├── components/
│   ├── layout/          Header, navigation, footer
│   ├── shared/          Reusable sections and client islands (reveal, count-up, marquee)
│   └── ui/              Base UI primitives
├── content/site.ts      Organisation copy: mission, vision, milestones, stats
├── features/
│   ├── about/           Timeline
│   ├── contact/         Server Action, Zod schema, email service, form
│   ├── home/            Home page sections and hero motion graphic
│   └── thematic-areas/  Programme data, types and components
└── lib/                 SEO helpers, logger, rate limiter, utilities
```

Content changes (copy, statistics, programmes) are made in `src/content/site.ts` and
`src/features/thematic-areas/data/thematicAreas.ts` — components stay presentation-only.

## Performance, accessibility & security

- All pages are prerendered; client JavaScript is limited to small interactive islands.
- Animations are CSS-first (native scroll-driven animations with an `IntersectionObserver` fallback)
  and fully disabled for users who prefer reduced motion.
- Images are local and served through `next/image` (AVIF/WebP, responsive sizes, blur placeholders).
- Strict security headers (CSP, HSTS, frame, referrer and permissions policies) are set in `next.config.ts`.
- The contact form is validated with Zod on the server and protected by a honeypot, a minimum fill time
  and a best-effort rate limit.

## Image credits

Photography from [Unsplash](https://unsplash.com) (free to use under the Unsplash License), plus the
Islamabad Metrobus photo and logo from IoU's existing website.
