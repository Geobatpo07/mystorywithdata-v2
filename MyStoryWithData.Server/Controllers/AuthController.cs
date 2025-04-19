using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyStoryWithData.Server.Models;
using MyStoryWithData.Server.Models.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyStoryWithData.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly IConfiguration _configuration;

		public AuthController(UserManager<ApplicationUser> userManager,
							  SignInManager<ApplicationUser> signInManager,
							  IConfiguration configuration)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
		}

		// POST: api/auth/register
		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);

			var user = new ApplicationUser
			{
				UserName = model.Username,
				FirstName = model.FirstName,
				LastName = model.LastName,
				Email = model.Email,
				EmailConfirmed = true
			};

			var result = await _userManager.CreateAsync(user, model.Password);

			if (!result.Succeeded)
				return BadRequest(result.Errors);

			// Ajouter le rôle par défaut (User)
			await _userManager.AddToRoleAsync(user, "User");

			return Ok(new { message = "Inscription réussie." });
		}

		// POST: api/auth/login
		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginModel model)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);

			ApplicationUser user = model.UsernameOrEmail.Contains("@")
				? await _userManager.FindByEmailAsync(model.UsernameOrEmail)
				: await _userManager.FindByNameAsync(model.UsernameOrEmail);

			if (user == null)
				return Unauthorized(new { message = "Identifiants invalides." });

			var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

			if (!result.Succeeded)
				return Unauthorized(new { message = "Identifiants invalides." });

			var token = await GenerateJwtToken(user);

			return Ok(new
			{
				token,
				user = new
				{
					user.Id,
					user.UserName,
					user.FirstName,
					user.LastName,
					user.Email
				}
			});
		}

		// Génération du token JWT
		private async Task<string> GenerateJwtToken(ApplicationUser user)
		{
			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
				new Claim("email_confirmed", user.EmailConfirmed.ToString().ToLower()),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(ClaimTypes.Name, user.UserName ?? "")
			};

			// Ajoute les rôles comme claims
			var roles = await _userManager.GetRolesAsync(user);
			claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var expires = DateTime.UtcNow.AddDays(double.Parse(_configuration["Jwt:DurationInDays"] ?? "1"));

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: expires,
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
