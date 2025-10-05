# Personal Portfolio - Frontend

A modern, responsive and visually stunning personal portfolio website built with Next.js, TypeScript and Tailwind CSS.

## Project Overview

This is a comprehensive personal portfolio website designed to showcase professional work, skills and experience in an engaging and interactive manner. The portfolio features a clean, modern design with smooth animations, dark mode support, and an intuitive user interface that provides visitors with a seamless browsing experience across all devices.

Built with performance and accessibility in mind, the portfolio implements modern web development best practices including server-side rendering, optimized images, and semantic HTML. The modular component architecture ensures maintainability and scalability, while the responsive design guarantees an optimal viewing experience on mobile, tablet, and desktop devices.

Whether you're a recruiter, potential client, or fellow developer, this portfolio provides a comprehensive view of professional capabilities through project showcases, skill demonstrations, and easy contact options.

## Features

### Core Functionality
- **Responsive Design** - Mobile-first approach with seamless adaptation to all screen sizes
- **Dark Mode Support** - Toggle between light and dark themes with persistent preference
- **Smooth Animations** - Professional transitions and scroll-based animations
- **SEO Optimized** - Meta tags, structured data, and optimized content for search engines
- **Fast Performance** - Server-side rendering and optimized asset loading

### Interactive Elements
- Smooth scroll navigation
- Animated skill bars and progress indicators
- Interactive project cards with hover effects
- Form validation and submission
- Dynamic content loading

## Tech Stack

- **Framework**: Next.js v15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rrishiddh/portfolio-project-frontend.git
   cd portfolio-project-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
   # Add any API keys for contact forms or analytics
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```


## Project Structure

```
src/
├── app/                    
│   ├── about/              # About page
│   ├── projects/           # Projects showcase
│   ├── contact/            # Contact page
│   ├── blog/               # Blog section (optional)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, About, Skills)
│   └── common/             # Common components
├── lib/                    
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Constants and configuration
├── public/                 
│   ├── images/             # Images and assets
│   └── files/              # Downloadable files (resume, etc.)
└── types/                  
    └── index.ts            # TypeScript type definitions
```

## Customization

### Personal Information
Update the following files with your information:
- `src/lib/constants.ts` - Personal details, social links
- `public/` - Replace images and resume
- `src/app/layout.tsx` - Update metadata and SEO information

### Styling
- **Colors**: Modify `tailwind.config.ts` for theme colors
- **Fonts**: Update font imports in `app/layout.tsx`
- **Animations**: Customize in individual component files

### Content
- **Projects**: Add project data in `src/data/projects.ts`
- **Skills**: Update skills in `src/data/skills.ts`
- **Experience**: Modify experience timeline in `src/data/experience.ts`

## Key Features Implementation

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimized bundle size
- CDN delivery through Vercel

### Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

### SEO Best Practices
- Dynamic meta tags
- Open Graph protocol
- Twitter Card support
- Sitemap generation
- Structured data markup

## Dependencies

### Core Dependencies:
* **next**: 15.5.0
* **react**: 19.1.0
* **react-dom**: 19.1.0
* **typescript**: ^5
* **tailwindcss**: ^4

### UI & Animation:
* **@radix-ui/react-***: Latest (Various components)
* **framer-motion**: ^11
* **lucide-react**: ^0.541.0
* **class-variance-authority**: ^0.7.1
* **clsx**: ^2.1.1
* **tailwind-merge**: ^3.3.1

### Forms & Validation:
* **react-hook-form**: ^7.62.0
* **@hookform/resolvers**: ^5.2.1
* **zod**: ^4.1.0

### Dev Dependencies:
* **@types/node**: ^20
* **@types/react**: ^19
* **@types/react-dom**: ^19
* **eslint**: ^9
* **eslint-config-next**: 15.5.0
* **@tailwindcss/postcss**: ^4

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com
```


## Deployment

### Live Demo (Frontend): [https://portfolio-frontend-rrishiddh.vercel.app/](https://portfolio-frontend-rrishiddh.vercel.app/)

### GitHub-Repo-Backend-API: [https://github.com/rrishiddh/portfolio-project-backend](https://github.com/rrishiddh/portfolio-project-backend)

### Live Demo (API): [https://portfolio-backend-rrishiddh.vercel.app/](https://portfolio-backend-rrishiddh.vercel.app/)