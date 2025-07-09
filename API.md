# MyStoryWithData API Documentation

## Overview
The MyStoryWithData API is a RESTful API built with ASP.NET Core 8 that provides endpoints for managing blog posts, user authentication, Power BI reports, and more.

## Base URL
- Development: `https://localhost:7203`
- Production: `https://mystorywithdata.com` (replace with your actual domain)

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Versioning
The API supports versioning through the URL path:
- Current version: `/api/v1/`

## Rate Limiting
- Default: 100 requests per minute per IP address
- Returns HTTP 429 (Too Many Requests) when exceeded

## Health Check
- **GET** `/health` - Returns the health status of the API and its dependencies

## Authentication Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "usernameOrEmail": "string",
  "password": "string"
}
```

### Get User Profile
- **GET** `/api/auth/profile`
- **Authentication:** Required
- **Response:**
```json
{
  "id": "string",
  "userName": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string"
}
```

### Logout
- **POST** `/api/auth/logout`
- **Authentication:** Required

## Blog Post Endpoints

### Get All Blog Posts
- **GET** `/api/blogposts`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `pageSize` (optional): Number of items per page (default: 10)
  - `isPublic` (optional): Filter by public status

### Get Blog Post by ID
- **GET** `/api/blogposts/{id}`

### Create Blog Post
- **POST** `/api/blogposts`
- **Authentication:** Required
- **Body:**
```json
{
  "title": "string",
  "summary": "string",
  "content": "string",
  "isPublic": true
}
```

### Update Blog Post
- **PUT** `/api/blogposts/{id}`
- **Authentication:** Required
- **Body:**
```json
{
  "title": "string",
  "summary": "string",
  "content": "string",
  "isPublic": true
}
```

### Delete Blog Post
- **DELETE** `/api/blogposts/{id}`
- **Authentication:** Required

## Power BI Reports Endpoints

### Get All Reports
- **GET** `/api/powerbi/reports`

### Get Report by ID
- **GET** `/api/powerbi/reports/{id}`

## Error Responses
The API returns standard HTTP status codes and includes error details in the response body:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Bad Request",
  "status": 400,
  "detail": "The request contains invalid data."
}
```

## Common Status Codes
- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Security
- HTTPS enforced in production
- JWT tokens with configurable expiration
- Password policy enforcement
- Rate limiting
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- CORS configuration

## Development
For development purposes, Swagger documentation is available at `/swagger` when running in Development mode.
