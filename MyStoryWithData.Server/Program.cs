using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyStoryWithData.Auth.Data;
using MyStoryWithData.Auth.Helpers;
using MyStoryWithData.Auth.Models;
using MyStoryWithData.Auth.Services;
using MyStoryWithData.Server.Logging;
using MyStoryWithData.Server.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Choix dynamique de la chaîne de connexion PostgreSQL
var useDockerDb = Environment.GetEnvironmentVariable("USE_DOCKER_DB");
string connectionString = !string.IsNullOrEmpty(useDockerDb) && useDockerDb.ToLower() == "true"
    ? builder.Configuration.GetConnectionString("PostgresDocker")
    : builder.Configuration.GetConnectionString("PostgresLocal");

// Ajout du DbContext Auth avec PostgreSQL
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseNpgsql(connectionString));

// Ajout d'Identity avec ApplicationUser et AuthDbContext
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
})
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

// Récupération des paramètres JWT depuis appsettings.json
var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSettings.GetValue<string>("SecretKey");
var issuer = jwtSettings.GetValue<string>("Issuer");
var audience = jwtSettings.GetValue<string>("Audience");

var key = Encoding.ASCII.GetBytes(secretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = issuer,
        ValidateAudience = true,
        ValidAudience = audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Injection du service d'authentification personnalisé
builder.Services.AddScoped<IAuthService, AuthService>();

// Ajout des contrôleurs API
builder.Services.AddControllers();

// Swagger avec support JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My Story with Data API",
        Version = "v1"
    });

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

// Logging vers fichier
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddFile("Logs/mystorywithdata-{Date}.log");

var app = builder.Build();

// Initialisation des rôles + admin par défaut
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await IdentitySeeder.SeedRolesAsync(services);
}

// Fichiers statiques (React)
app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger pour dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Middleware JWT custom
app.UseMiddleware<JwtMiddleware>();

// Logging des requêtes HTTP
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

// Mapping des contrôleurs
app.MapControllers();

// Fallback React SPA
app.MapFallbackToFile("/index.html");

app.Run();
