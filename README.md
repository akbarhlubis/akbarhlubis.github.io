# akbarhlubis.github.io

Personal portfolio website — built with **Astro 5** and **TypeScript**. Dark terminal aesthetic with JetBrains Mono typography.

## Tech Stack

- **Astro 5** — Static site generator with component islands
- **TypeScript** — Type-safe data layer and components
- **CSS3** — Custom properties, grid, flexbox, animations
- **JavaScript** — IntersectionObserver, typewriter effect, carousel

## Features

- Typewriter hero with role rotation
- Bento grid project showcase with category filtering (highlight + dim)
- Skill matrix with level-based labels (Advanced / Proficient / Intermediate / Beginner)
- LinkedIn recommendations carousel
- Scroll-triggered reveal animations
- Marquee ticker for technology tags
- Responsive layout with hamburger navigation
- Keyboard accessible (focus-visible styles)
- Dark/Light theme toggle

## Sections

| # | Section | Description |
|---|---------|-------------|
| 001 | Works | Selected projects in bento grid layout |
| 002 | Expertise | Skills grouped by Backend / Frontend / DevOps |
| 003 | About | Bio, stats, and profile photo |
| 004 | Recommendations | LinkedIn recommendations carousel |
| 005 | Contact | Email, LinkedIn, and GitHub links |

## Project Structure

```text
src/
├── pages/          # Astro pages (index.astro)
├── layouts/        # Base layout
├── components/     # UI components (Nav, Footer, ProjectCard, etc.)
├── data/           # JSON data files (projects, skills, certifications, experience, testimonials)
├── services/       # Data access layer with typed interfaces
├── types/          # TypeScript type definitions
└── styles/         # CSS files
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Automatically deployed via **GitHub Pages** using GitHub Actions. Push to `main` triggers the build and deploy pipeline.

## Author

**Akbar Hamonangan Lubis**  
Web Developer & Systems Operations Specialist  
[LinkedIn](https://linkedin.com/in/akbarhlubis) · [GitHub](https://github.com/akbarhlubis) · [Email](mailto:alubis87@gmail.com)
