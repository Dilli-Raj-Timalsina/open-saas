# Shared Packages Documentation

## Overview

The `packages` directory contains shared packages used across the monorepo. These packages provide common functionality and configurations to maintain consistency across applications.

## Available Packages

### @repo/ui

A shared React component library used by both the web and docs applications.

#### Features

- Reusable React components
- TypeScript support
- Storybook documentation
- Consistent styling

#### Usage

```tsx
import { Button } from "@repo/ui";

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

#### Development

```bash
# From the root directory
pnpm dev --filter @repo/ui

# Or navigate to the ui package
cd packages/ui
pnpm dev
```

### @repo/eslint-config

Shared ESLint configuration for consistent code style across the monorepo.

#### Features

- TypeScript support
- React specific rules
- Prettier integration
- Accessibility rules

#### Usage

In your package's `package.json`:

```json
{
  "eslintConfig": {
    "extends": ["@repo/eslint-config"]
  }
}
```

### @repo/typescript-config

Shared TypeScript configuration for consistent type checking across the monorepo.

#### Features

- Strict type checking
- Path aliases
- Module resolution settings
- React support

#### Usage

In your package's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

## Package Development

### Creating a New Package

1. Create a new directory in `packages/`
2. Initialize with `pnpm init`
3. Add necessary dependencies
4. Update `package.json` with appropriate name and version
5. Add to workspace in root `pnpm-workspace.yaml`

### Building Packages

```bash
# Build all packages
pnpm build --filter "@repo/*"

# Build specific package
pnpm build --filter @repo/ui
```

### Testing Packages

```bash
# Test all packages
pnpm test --filter "@repo/*"

# Test specific package
pnpm test --filter @repo/ui
```

## Best Practices

### Package Structure

```
packages/package-name/
├── src/              # Source code
├── tests/            # Test files
├── package.json      # Package manifest
├── tsconfig.json     # TypeScript configuration
└── README.md         # Package documentation
```

### Versioning

- Follow semantic versioning
- Update version numbers in `package.json`
- Document breaking changes

### Dependencies

- Keep dependencies minimal
- Use peer dependencies when appropriate
- Document required peer dependencies

### Testing

- Write unit tests for all new functionality
- Include integration tests for complex features
- Maintain good test coverage

### Documentation

- Include README.md in each package
- Document all public APIs
- Provide usage examples
- Include TypeScript types documentation

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Update tests and documentation
4. Submit a pull request

## Publishing

To publish packages to npm:

```bash
# Login to npm
npm login

# Publish package
pnpm publish --filter @repo/package-name
```

## Maintenance

- Regularly update dependencies
- Monitor package size
- Keep documentation up to date
- Address security vulnerabilities promptly
