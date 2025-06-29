using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MyStoryWithData.Server.Models;
using MyStoryWithData.Auth.Models;

namespace MyStoryWithData.Server.Data
{
	public class DbInitializer
	{
		public static async Task SeedAsync(IServiceProvider serviceProvider)
		{
			using var scope = serviceProvider.CreateScope();

			var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
			var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
			var logger = scope.ServiceProvider.GetRequiredService<ILogger<DbInitializer>>();

			// Créer le rôle Admin s'il n'existe pas
			const string adminRole = "Admin";
			if (!await roleManager.RoleExistsAsync(adminRole))
			{
				var roleResult = await roleManager.CreateAsync(new IdentityRole(adminRole));
				if (!roleResult.Succeeded)
				{
					logger.LogError("Échec lors de la création du rôle Admin : {Errors}", string.Join(", ", roleResult.Errors.Select(e => e.Description)));
					return;
				}
			}

			// Créer l'utilisateur admin s'il n'existe pas
			const string adminUserName = "admin";
			const string adminFirstName = "Admin";
			const string adminLastName = "User";
			const string adminEmail = "admin@mystorywithdata.com";
			const string password = "Admin@123";

			if (await userManager.FindByEmailAsync(adminEmail) == null)
			{
				var admin = new ApplicationUser
				{
					UserName = adminEmail,
					FirstName = adminFirstName,
					LastName = adminLastName,
					Email = adminEmail,
					EmailConfirmed = true
				};

				var result = await userManager.CreateAsync(admin, password);
				if (result.Succeeded)
				{
					await userManager.AddToRoleAsync(admin, adminRole);
					logger.LogInformation("Compte administrateur créé avec succès.");
				}
				else
				{
					logger.LogError("Échec lors de la création du compte administrateur : {Errors}", string.Join(", ", result.Errors.Select(e => e.Description)));
				}
			}
			else
			{
				logger.LogInformation("Le compte administrateur existe déjà.");
			}
		}
	}
}
