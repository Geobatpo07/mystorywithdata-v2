# MyStoryWithData

**MyStoryWithData** is a modular ASP.NET 8 full-stack application designed to showcase a personal portfolio featuring blog articles, Power BI reports, machine learning models, services, and user feedback.

## 🧱 Project Architecture

This project is composed of three main layers:

- **MyStoryWithData.Client** — Frontend built with React (Vite)
- **MyStoryWithData.Server** — ASP.NET Core 8 API (Controllers, Middleware, ApplicationDbContext)
- **MyStoryWithData.Auth** — Identity-based authentication and authorization layer (AuthDbContext, JWT, IdentityServer ready)

## 🧑‍💻 Technologies Used

- ASP.NET Core 8
- Entity Framework Core 8 (PostgreSQL)
- React (Vite)
- PostgreSQL
- JWT Authentication
- Docker (optional)
- Identity with custom `ApplicationUser`
- Swagger (with JWT support)

## 🔐 Authentication

User authentication is managed through ASP.NET Core Identity with JWT-based access. It includes:

- Registration & Login
- Email confirmation (ready)
- Admin seeding and role creation
- Role-based access control

## 🧠 Features

- 📚 **Blog Section** — Add/edit articles (public or premium)
- 📊 **Power BI Reports** — Embeddable reports with metadata
- 🤖 **Machine Learning Models** — Versioned models with metadata
- 💼 **Services** — Display your offered services
- ⭐ **Feedback** — Public ratings and comments
- 📬 **Contact** — Send messages via a form
- 🔐 **JWT Middleware** — Injects authenticated user info in requests
- 📝 **Request Logging** — Logs HTTP requests to file

## 🛠️ Setup

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/) (for the React client)

### Local Database

Ensure you have a PostgreSQL database with the following:

- Host: `localhost`
- Database: `MyStoryWithDataDB`
- User: `user`
- Password: `pwd`

Or change the credentials in `appsettings.json`.

### Database Migrations

```bash
# Apply migrations
dotnet ef database update --context ApplicationDbContext --project MyStoryWithData.Server --startup-project MyStoryWithData.Server
```

### Running the app

```bash
# Backend
cd MyStoryWithData.Server
dotnet run

# Frontend
cd MyStoryWithData.Client
npm install
npm run dev
```

### Docker (Optional)

You can build the full system with:

```bash
docker compose build
docker compose up
```

Set the environment variable `USE_DOCKER_DB=true` if you want to use the containerized PostgreSQL connection string.

## 📁 Folder Structure

```
MyStoryWithData-v2/
├── MyStoryWithData.Auth/        # Identity & Auth logic
├── MyStoryWithData.Server/      # API + Database + Middleware
├── MyStoryWithData.Client/      # React frontend
├── README.md
```

## ✅ To Do

- [ ] Email confirmation workflow
- [ ] Role management in frontend
- [ ] Deployment pipeline (GitHub Actions / Azure)
- [ ] Tests & CI

## 📜 License

Apache License 2.0

---

Built with ❤️ by Geovany Batista Polo Laguerre | Data Science & Analytics Engineer