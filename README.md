# Pet Clinic - Enterprise Full-Stack Application

A production-ready, scalable veterinary clinic management platform built with modern web technologies.

## Tech Stack

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
**Backend:** Node.js, Express.js, TypeScript
**Animations:** Framer Motion, GSAP, Lenis Scroll
**Forms:** React Hook Form, Zod Validation
**Deployment:** Vercel (Frontend) + VPS (Backend)

## Architecture

```
project/
├── frontend/     # Next.js 15 Application
├── backend/      # Express.js API Server
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn or pnpm

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## Features

- Modern, responsive UI with animations
- Appointment scheduling system
- Service catalog and gallery
- Contact form with validation
- RESTful API architecture
- SEO optimized
- Performance optimized (Lighthouse 90+)

## Deployment

- **Frontend:** Deploy to Vercel
- **Backend:** Deploy to VPS via Docker
