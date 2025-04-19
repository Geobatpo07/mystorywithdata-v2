using System.ComponentModel.DataAnnotations;

namespace MyStoryWithData.Server.Models.Auth
{
	public class LoginModel
	{
		[Required(ErrorMessage = "Le nom d'utilisateur ou l'adresse email est requis.")]
		public string UsernameOrEmail { get; set; } = string.Empty;

		[Required(ErrorMessage = "Le mot de passe est requis.")]
		[DataType(DataType.Password)]
		public string Password { get; set; } = string.Empty;
	}
}
