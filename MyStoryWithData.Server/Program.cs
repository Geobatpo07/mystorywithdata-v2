using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Logging;
using MyStoryWithData.Server.Data;
using MyStoryWithData.Server.Logging;
using MyStoryWithData.Server.Middleware;
using MyStoryWithData.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // Add this namespace for AddEntityFrameworkStores extension method


var builder = WebApplication.CreateBuilder(args);

// 📦 Configuration Entity Framework et SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔐 Configuration Identity avec confirmation d'email obligatoire
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
	options.SignIn.RequireConfirmedEmail = true;  // L'email doit être confirmé pour se connecter
	options.User.RequireUniqueEmail = true;       // Les emails doivent être uniques
})
.AddEntityFrameworkStores<ApplicationDbContext>()   // Configure les services de store (EF Core)
.AddDefaultTokenProviders();                        // Ajoute les providers pour générer des tokens de confirmation, réinitialisation, etc.

// 🌐 Ajout des contrôleurs
builder.Services.AddControllers();

// 🧪 Swagger avec support JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "My Story with Data API", Version = "v1" });

	var jwtSecurityScheme = new OpenApiSecurityScheme
	{
		Scheme = "bearer",
		BearerFormat = "JWT",
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.Http,
		Description = "Saisissez uniquement le token JWT ci-dessous",
		Reference = new OpenApiReference
		{
			Id = "Bearer",
			Type = ReferenceType.SecurityScheme
		}
	};

	c.AddSecurityDefinition("Bearer", jwtSecurityScheme);
	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{ jwtSecurityScheme, Array.Empty<string>() }
	});
});

// 📝 Configuration du logging vers fichiers
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddFile("Logs/mystorywithdata-{Date}.log");

var app = builder.Build();

// 🌐 Fichiers statiques pour React
app.UseDefaultFiles();
app.UseStaticFiles();

// 🧪 Swagger en environnement développement
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🛡 Middleware personnalisé JWT
app.UseMiddleware<JwtMiddleware>();

// 📋 Middleware de journalisation des requêtes HTTP
app.UseMiddleware<RequestLoggingMiddleware>();

// 🔐 Authentification & Autorisation
app.UseAuthentication();
app.UseAuthorization();

// 🚀 Contrôleurs API
app.MapControllers();

// 🌍 Fallback pour SPA React
app.MapFallbackToFile("/index.html");

app.Run();
