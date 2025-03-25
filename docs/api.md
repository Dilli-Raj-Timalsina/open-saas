# API Application Documentation

## Overview

The API application is located in the `apps/api` directory and serves as the backend service for the Open SaaS platform. It provides RESTful endpoints and handles business logic for the application.

## Features

- RESTful API endpoints
- TypeScript for type safety
- Database integration
- Authentication and authorization
- API documentation

## Getting Started

### Development

```bash
# From the root directory
pnpm dev --filter api

# Or navigate to the api directory
cd apps/api
pnpm dev
```

### Building

```bash
# From the root directory
pnpm build --filter api

# Or navigate to the api directory
cd apps/api
pnpm build
```

## Project Structure

```
apps/api/
├── src/
│   ├── controllers/    # Route controllers
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── middleware/    # Custom middleware
│   └── utils/         # Utility functions
├── tests/             # Test files
└── config/            # Configuration files
```

## Environment Variables

Create a `.env` file in the `apps/api` directory with the following variables:

```
PORT=3001
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Dependencies

- Express.js
- TypeScript
- Database ORM
- JWT for authentication
- ESLint and Prettier configurations from shared packages

## Database

The API uses a relational database. Make sure to:

1. Set up the database
2. Run migrations
3. Set up the connection string in environment variables

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## API Documentation

API documentation is available at `/api/docs` when running in development mode.

## Security

- All endpoints are protected with JWT authentication
- Input validation is performed on all requests
- Rate limiting is implemented
- CORS is configured for the web application

## Deployment

The API can be deployed to any Node.js hosting platform. Recommended platforms:

- Heroku
- DigitalOcean
- AWS Elastic Beanstalk

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Write tests for new endpoints
4. Update API documentation
5. Submit a pull request

## Best Practices

- Use TypeScript for all new code
- Write tests for all new endpoints
- Follow RESTful API design principles
- Implement proper error handling
- Use middleware for common functionality
- Keep controllers thin and move business logic to services
