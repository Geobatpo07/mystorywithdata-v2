using Microsoft.EntityFrameworkCore;
using MyStoryWithData.Server.Data;
using MyStoryWithData.Server.Middleware;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Logging;
using MyStoryWithData.Server.Logging;

var builder = WebApplication.CreateBuilder(args);

// Ajout du DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Ajout des contrôleurs
builder.Services.AddControllers();

// Swagger avec support pour l'auth (optionnel)
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

// Configure le logger vers un fichier
builder.Logging.ClearProviders();
builder.Logging.AddConsole(); // Garde la console si tu veux voir aussi dans la sortie terminal
builder.Logging.AddFile("Logs/mystorywithdata-{Date}.log");

var app = builder.Build();

// Fichiers statiques (React)
app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger en mode dev
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔐 Middleware JWT perso
app.UseMiddleware<JwtMiddleware>();

// Middleware de journalisation des requêtes
app.UseMiddleware<MyStoryWithData.Server.Middleware.RequestLoggingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

// Map des contrôleurs
app.MapControllers();

// Fallback pour React
app.MapFallbackToFile("/index.html");

app.Run();