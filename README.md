# Portfolio - Next.js

Full-Stack Developer & SQA Engineer Portfolio built with Next.js 15, Tailwind CSS, and Shadcn UI.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI (Radix UI)
- **Icons:** React Icons, Lucide React
- **Carousel:** Embla Carousel

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.js              # Root layout with Navigation & Footer
│   ├── page.js                # Home page with hero section
│   ├── globals.css            # Global styles
│   └── _components/           # App-level components
│       ├── Navigation.jsx
│       ├── Footer.jsx
│       └── ScrollToTop.jsx
├── components/                # Shared components
│   ├── ui/                    # Shadcn UI components
│   ├── SocialMedia.jsx
│   ├── Title.jsx
│   ├── SkillCard.jsx
│   ├── Project.jsx
│   ├── ImageCarousel.jsx
│   └── GitHubLinkDetails.jsx
├── features/                  # Feature-based organization
│   ├── skills/
│   │   └── _components/
│   │       └── MySkills.jsx
│   └── projects/
│       └── _components/
│           └── Projects.jsx
├── data/                      # Data files
│   └── skillSets.jsx
├── lib/                       # Utilities
│   └── utils.js
└── public/                    # Static assets
    ├── images/
    ├── cv/
    └── projectsData.json
```

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Features

- ✅ Server-side rendering (SSR)
- ✅ Responsive design
- ✅ Smooth scroll animations
- ✅ Image carousel
- ✅ CV download options
- ✅ Project showcase
- ✅ Skills section with animations
- ✅ Contact section
- ✅ SEO optimized

## Deployment

Deploy easily on Vercel:

```bash
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.
