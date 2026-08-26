set shell := ["pwsh", "-c"]

# Default recipe -- shows available commands when you run just with no args
default:
    just --list

# Install dependencies
install:
    npm install

# Start the development server at http://localhost:3000
dev:
    npm run dev

# TypeScript type-check (tsc --noEmit)
lint:
    npm run lint

# Production build -> dist/
build:
    npm run build

# Preview the production build locally
preview:
    npm run preview

# Remove the dist/ folder
clean:
    npm run clean

# Build and run with Docker (serves on http://localhost:8080)
docker-up:
    docker compose up --build

# Stop and remove Docker containers
docker-down:
    docker compose down
