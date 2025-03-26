# SaeLae - Next.js PWA Application

This is a Progressive Web Application (PWA) built with [Next.js](https://nextjs.org/), combining the power of server-side rendering with the capabilities of a native-like web application.

## Features

- **Progressive Web App (PWA)** - Can be installed on mobile devices
- **Server-Side Rendering** - Optimized page loading and better SEO
- **Modern Tech Stack** - Built with Next.js, React, and TypeScript
- **Responsive Design** - Optimized for both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository or unzip the project files:

2. Navigate to the project root directory. Create .env.local file & add environment variables.
   Required variables
    ```bash
    BASE_URL=http://XXXXXX
    AUTH_COOKIE_NAME=XXXXXX
    NEXT_PUBLIC_BASE_URL=https://XXXXXX
    NEXT_PUBLIC_AUTH_COOKIE_NAME=XXXXXX
    NEXT_PUBLIC_NODE_ENV=production
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Production Build

1. Build the production-ready application:
    ```bash
    npm run build
    ```
2. Start the production server:
    ```bash
    npm start
    ```

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, 
- **Styling & UI**: Tailwind CSS, Shadcn UI
- **State Management**: Zustand
- **PWA Features**: next-pwa
- **Code Quality**: ESLint, Prettier
