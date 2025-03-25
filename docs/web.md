# Web Application Documentation

## Overview

The web application is a Next.js-based frontend application located in the `apps/web` directory. It serves as the main user interface for the Open SaaS platform.

## Features

- Next.js for server-side rendering and routing
- TypeScript for type safety
- Shared UI components from `@repo/ui` package
- ESLint and Prettier for code quality

## Getting Started

### Development

```bash
# From the root directory
pnpm dev --filter web

# Or navigate to the web directory
cd apps/web
pnpm dev
```

### Building

```bash
# From the root directory
pnpm build --filter web

# Or navigate to the web directory
cd apps/web
pnpm build
```

## Project Structure

```
apps/web/
├── app/              # Next.js app directory
├── components/       # Web-specific components
├── lib/             # Utility functions and shared logic
├── styles/          # Global styles and CSS modules
└── public/          # Static assets
```

## Environment Variables

Create a `.env.local` file in the `apps/web` directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Dependencies

- Next.js
- React
- TypeScript
- Shared UI components from `@repo/ui`
- ESLint and Prettier configurations from shared packages

## Deployment

The web application can be deployed to Vercel or any other platform that supports Next.js applications.

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Best Practices

- Use TypeScript for all new code
- Follow the established component structure
- Write tests for new features
- Keep components small and focused
- Use shared UI components when possible
