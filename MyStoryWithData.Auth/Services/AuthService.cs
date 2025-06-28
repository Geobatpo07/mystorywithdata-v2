using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyStoryWithData.Auth.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyStoryWithData.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterModel model)
        {
            var existingUserByUsername = await _userManager.FindByNameAsync(model.Username);
            if (existingUserByUsername != null)
            {
                return new AuthResponse { Success = false, Message = "Nom d'utilisateur déjà pris." };
            }

            var existingUserByEmail = await _userManager.FindByEmailAsync(model.Email);
            if (existingUserByEmail != null)
            {
                return new AuthResponse { Success = false, Message = "Email déjà utilisé." };
            }

            var newUser = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                EmailConfirmed = true 
            };

            var result = await _userManager.CreateAsync(newUser, model.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return new AuthResponse { Success = false, Message = $"Échec de la création du compte : {errors}" };
            }

            // Assignation d'un rôle par défaut, si besoin
            await _userManager.AddToRoleAsync(newUser, "User");

            return new AuthResponse { Success = true, Message = "Utilisateur créé avec succès." };
        }

        public async Task<AuthResponse> LoginAsync(LoginModel model)
        {
            ApplicationUser? user = null;

            if (model.UsernameOrEmail.Contains("@"))
            {
                user = await _userManager.FindByEmailAsync(model.UsernameOrEmail);
            }
            else
            {
                user = await _userManager.FindByNameAsync(model.UsernameOrEmail);
            }

            if (user == null)
            {
                return new AuthResponse { Success = false, Message = "Utilisateur non trouvé." };
            }

            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return new AuthResponse { Success = false, Message = "Mot de passe incorrect." };
            }

            var token = await GenerateJwtTokenAsync(user);

            return new AuthResponse { Success = true, Token = token };
        }

        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings.GetValue<string>("SecretKey")
                ?? throw new InvalidOperationException("JWT SecretKey is missing.");
            var issuer = jwtSettings.GetValue<string>("Issuer") ?? "";
            var audience = jwtSettings.GetValue<string>("Audience") ?? "";
            var durationInDays = jwtSettings.GetValue<int?>("DurationInDays") ?? 7;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim("email_confirmed", user.EmailConfirmed.ToString().ToLower())
            };

            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role));

            var allClaims = claims.Concat(roleClaims);

            var token = new JwtSecurityToken(
                issuer,
                audience,
                allClaims,
                expires: DateTime.UtcNow.AddDays(durationInDays),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
