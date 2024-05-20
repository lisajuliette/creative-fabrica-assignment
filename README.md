## Frameworks and Libraries Used

### Frontend (Next.js & TypeScript)

- **Tailwind**: For its utility-first approach, enabling rapid and consistent UI development with a customizable design system.
- **React Query**: Simplifies data fetching and state management with hooks for fetching, caching, and synchronizing server data.
- **Axios**: A promise-based HTTP client with a simple API, supporting request/response interception and automatic JSON transformation.
- **Jest & Testing Library**: Provides robust unit and integration testing. Testing Library focuses on testing React components from a user interaction perspective.

### Backend (Golang)

- **Gorilla Mux**: A powerful, flexible HTTP request router, well-suited for building Go web applications.
- **RS Cors**: Efficiently handles Cross-Origin Resource Sharing (CORS), allowing secure requests from different origins.

## Setup Instructions

### Running the Project Locally

#### Prerequisites

- Node.js and npm
- Go

```bash
cd creative-fabrica-assignment/backend
go run .
```

```bash
cd creative-fabrica-assignment/frontend
npm install
npm run dev
```

## Running Tests

### Frontend

To run tests for the frontend components and pages:

```bash
 cd creative-fabrica-assignment/frontend
 npm test
```
