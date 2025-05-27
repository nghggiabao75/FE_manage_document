# Document Management System

A React-based document management system that allows users to manage documents and their details efficiently.

## Features

### Document Management
- View list of documents
- Create new documents
- Edit existing documents
- Delete documents
- View document details

### Document Detail Management
- View list of document details
- Create new document details
- Edit existing document details
- Delete document details

## Tech Stack

- React
- TypeScript
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Integration

The application integrates with a REST API for data management. API endpoints are configured in `src/config/api.ts`.

### Document Endpoints
- GET `/api/documents` - Get all documents
- POST `/api/documents` - Create new document
- PUT `/api/documents/{id}` - Update document
- DELETE `/api/documents/{id}` - Delete document

### Document Detail Endpoints
- GET `/api/document-details?documentNumber={number}` - Get document details
- POST `/api/document-details` - Create new document detail
- PUT `/api/document-details/{id}` - Update document detail
- DELETE `/api/document-details/{id}` - Delete document detail
