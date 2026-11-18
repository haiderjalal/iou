# Institute of Urbanism — Website Plan

## 1. Goal

Rebuild [iupk.org](https://iupk.org) as a fast, accessible, SEO-friendly NGO / think-tank website that
tells IoU's story — from the _Reclaiming Green Islamabad_ citizens' movement to a policy research
institute — and turns visitors into partners, volunteers and supporters.

## 2. Inspiration review

| Site                   | What we borrow                                                                                                                | What we avoid                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **iupk.org** (current) | Brand colours (leaf green `#7DAD42`, slate `#94969F`), logo, all factual content: story, mission, vision, four thematic areas | Slider-only home page, clip-art banners, thin navigation, empty "Media" menu |
| **sdpi.org**           | Think-tank structure: research focus areas up front, evidence-led tone, credibility strip                                     | Dense, news-heavy home page that IoU has no content for yet                  |
| **solf.org.pk**        | NGO storytelling: impact numbers, causes, story-led "About", clear contact                                                    | Heavy WordPress page builder, cookie-banner clutter                          |

## 3. Brand & design system

- **Colours** — `leaf` scale built around the logo green; `forest` near-black green for dark sections;
  `slate` from the logo grey; warm off-white `paper` background. Text-on-green uses `leaf-700`
  (≥ 4.5:1 contrast) — the bright logo green is reserved for large/decorative use.
- **Type** — _Fraunces_ (editorial serif, think-tank credibility) for headings, _Nunito Sans_
  (continuity with the current site's Nunito) for body. Both self-hosted via `next/font`.
- **Logo** — original wordmark PNG in the header; the shield mark redrawn as SVG for the favicon,
  footer and motion graphics.
- **Imagery** — IoU's own Islamabad Metro photo plus free Unsplash photography (Islamabad, Margalla
  Hills, tree-lined streets, recycling, volunteers). All stored locally and served through `next/image`.

## 4. Information architecture

```
/                         Home (story-led landing page)
/about                    Who we are, story timeline, mission & vision, approach, transparency
/thematic-areas           Overview of the four programmes
/thematic-areas/[slug]    Redefining Urban Mobility · Sustainable Consumption Patterns ·
                          Solid Waste as Resource · Eco-Entrepreneurship
/contact                  Contact form (partner / volunteer / media / research) + details
/docs/iou-transparency.pdf  Transparency document (from the current site)
```

The current site's "Media" menu is empty, so no Media page is created until real content exists.

### Home page narrative

1. **Hero** — Islamabad & the Margalla Hills, slow Ken-Burns zoom, animated line-drawn skyline
   with trees growing in, headline "Nature-inclusive cities for Pakistan".
2. **Credibility marquee** — pausable (WCAG 2.2.2).
3. **Our story** — from a 2015 citizens' movement to a think tank.
4. **Why it matters** — animated statistics taken from IoU's own programme pages, each with source.
5. **Thematic areas** — four image cards.
6. **How we work** — research, advocacy, dialogue, partnerships.
7. **Mission & vision** — parallax band.
8. **Get involved** — partner / volunteer / contact CTA.

## 5. Technical architecture

- **Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.** All pages are static
  (pre-rendered at build time); thematic pages use `generateStaticParams`.
- **Content** lives in typed modules (`src/content`, `src/features/*/data`) — no database is needed
  for a brochure site; it can move to a CMS later without changing components.
- **Client JavaScript is limited to small islands**: mobile menu, active nav state, stat counters,
  marquee pause, contact form, and a reveal fallback for browsers without scroll-driven animations.
- **Animations** are CSS-first: native scroll-driven animations (`animation-timeline: view()`) behind
  `@supports`, an `IntersectionObserver` fallback, and everything gated behind
  `prefers-reduced-motion: no-preference`. Only `transform`/`opacity` are animated.
- **Contact form** — Server Action + Zod validation (works without JS), honeypot, minimum fill time,
  best-effort per-IP rate limit. Email is sent through the Resend REST API when
  `RESEND_API_KEY` / `CONTACT_TO_EMAIL` are configured; otherwise users are told to email
  info@iupk.org directly.

## 6. SEO

Per-page metadata (title template, description, canonical, Open Graph, Twitter), generated OG image,
`sitemap.xml`, `robots.txt`, web manifest, JSON-LD (`NGO` organisation, `BreadcrumbList`, `WebPage`),
one `h1` per page, descriptive link text, semantic landmarks.

## 7. Security

Strict response headers in `next.config.ts`: Content-Security-Policy, HSTS, `X-Content-Type-Options`,
`X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
No third-party scripts. All form input validated and length-limited server-side; secrets server-only.

> Trade-off: the CSP allows `'unsafe-inline'` scripts because Next.js injects inline bootstrap scripts
> and nonce-based CSP would force every page to render dynamically, losing static performance.

## 8. Performance targets

Lighthouse ≥ 95 across the board; LCP < 2.5 s (hero image preloaded with `fetchpriority="high"`,
AVIF/WebP via `next/image`); CLS < 0.1 (fixed aspect ratios); minimal client JS.

## 9. Open items for IoU

- Real impact figures (events held, people reached, trees protected) — the current site has none, so
  the stats section uses the sourced context figures from IoU's own pages instead.
- Media / publications content, team & board profiles, partner logos, social media links.
- Resend account + verified sending domain for the contact form.
