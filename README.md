
# MyStoryWithData

**MyStoryWithData** est une application ASP.NET Core modulaire conçue pour présenter un portfolio analytique interactif. Elle inclut des rapports Power BI, des modèles ML, des articles de blog, un système d’authentification sécurisé basé sur Identity + JWT, et un backend prêt pour une interface React.

## 🧱 Architecture

Le projet est organisé en 3 projets :

- **MyStoryWithData.Server** : API principale (ASP.NET Core)
- **MyStoryWithData.Auth** : Gestion de l'identité (users, rôles, JWT)
- **MyStoryWithData.Client** *(à venir)* : Interface utilisateur en React/Vite

---

## ⚙️ Fonctionnalités

- Authentification avec ASP.NET Identity et JWT
- Gestion des rôles (`Admin`, etc.) avec création automatique
- Stockage PostgreSQL
- Modèles de données pour :
  - `BlogPost`
  - `PowerBIReport` (avec catégories)
  - `MLModel`
  - `Service`
  - `Feedback`
  - `ContactMessage`
- Swagger configuré (avec support JWT)
- Logging dans fichiers `Logs/mystorywithdata-{Date}.log`

---

## 🐘 Configuration PostgreSQL

Deux connexions possibles :

```json
"ConnectionStrings": {
  "PostgresDocker": "Host=postgres;Port=5432;Database=MyStoryWithDataDB;Username=user;Password=pwd",
  "PostgresLocal": "Host=localhost;Port=5432;Database=MyStoryWithDataDB;Username=user;Password=pwd"
}
```

Par défaut, l'application choisit automatiquement :

- `PostgresDocker` si `USE_DOCKER_DB=true` est défini dans les variables d’environnement
- Sinon, elle utilise `PostgresLocal`

---

## 🚀 Lancer le projet en local

### 1. Prérequis

- .NET 8 SDK
- PostgreSQL en local avec une base `MyStoryWithDataDB`

### 2. Appliquer les migrations (si base vide)

```bash
dotnet ef database update --context AuthDbContext --project MyStoryWithData.Auth --startup-project MyStoryWithData.Server
```

Tu peux aussi ajouter la migration si ce n'est pas encore fait :

```bash
dotnet ef migrations add InitialCreate --context AuthDbContext --project MyStoryWithData.Auth --startup-project MyStoryWithData.Server
```

### 3. Lancer l'application

```bash
dotnet run --project MyStoryWithData.Server
```

Accès à Swagger sur `https://localhost:port/swagger`

---

## 🧪 Swagger + JWT

- Tu peux générer un token via le `AuthController`
- Utilise `Authorize` dans Swagger avec le token JWT obtenu

---

## 📁 À venir

- Interface React avec Vite + Tailwind
- Support de l'abonnement (blog premium)
- Upload de modèles ML
- Déploiement sur Azure / Render / Railway

---

## 🤝 Contribuer

Ce projet est en développement actif. Tu es libre de proposer des idées, créer des issues ou des PRs.

---

## 📜 Licence

MIT © Geovany Batista Polo Laguerre
