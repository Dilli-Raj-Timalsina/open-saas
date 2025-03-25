# Open SaaS Documentation

## Overview

Open SaaS is a modern monorepo project built with Turborepo, featuring a web application and API. The project uses TypeScript throughout and follows best practices for code quality and development workflow.

## Project Structure

```
open-saas/
├── apps/
│   ├── api/         # Backend API application
│   └── web/         # Frontend web application
├── packages/
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── typescript-config/  # Shared TypeScript configuration
│   └── ui/                 # Shared UI component library
└── docs/            # Project documentation
```

## Prerequisites

- Node.js >= 18
- pnpm >= 8.15.6

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development environment:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Run linting across all packages and applications
- `pnpm format` - Format code using Prettier
- `pnpm clear-cache` - Clear Turborepo cache

## Development Workflow

### Monorepo Structure

This project uses Turborepo for managing the monorepo structure. Each application and package is isolated but can share common configurations and components.

### Shared Packages

- `@repo/ui`: A shared React component library
- `@repo/eslint-config`: Shared ESLint configuration
- `@repo/typescript-config`: Shared TypeScript configuration

### Applications

- **Web Application**: Located in `apps/web/`
- **API Application**: Located in `apps/api/`

## Remote Caching

This project supports Turborepo's Remote Caching feature. To enable it:

1. Create a Vercel account if you don't have one
2. Run `npx turbo login` to authenticate
3. Run `npx turbo link` to link your repository to Remote Cache

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[Add your license information here]

## Support

[Add support contact information here]
