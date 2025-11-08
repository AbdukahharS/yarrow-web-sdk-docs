# Yarrow Web SDK Documentation

Vue 3 + TypeScript documentation site for the Yarrow Web SDK, built with Vite.

## Development

### Standard Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Setup

#### Development with Docker

Run the development server with hot reload:

```bash
docker-compose up dev
```

The application will be available at `http://localhost:5173`

#### Production with Docker

Build and run the production version:

```bash
# Using docker-compose
docker-compose up prod

# Or build and run manually
docker build -t yarrow-docs .
docker run -p 8080:80 yarrow-docs
```

The application will be available at `http://localhost:8080`

## Features

- Multi-language support (English, Uzbek, Russian)
- Animated background with floating circles
- Syntax highlighting with PrismJS
- Responsive design
- Accessibility compliant
