using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MyStoryWithData.Server.Data;

namespace MyStoryWithData.Server.Factories
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Choix dynamique de la chaîne de connexion PostgreSQL
            var useDockerDb = Environment.GetEnvironmentVariable("USE_DOCKER_DB");
            string connectionString = !string.IsNullOrEmpty(useDockerDb) && useDockerDb.ToLower() == "true"
                ? builder.Configuration.GetConnectionString("PostgresDocker")
                : builder.Configuration.GetConnectionString("PostgresLocal");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=MyStoryWithDataDB;Username=postgres;Password=postgres");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
