using Microsoft.AspNetCore.Identity;

namespace MyStoryWithData.Server.Models
{
	public class ApplicationUser : IdentityUser
	{

		public int Id { get; set; }
		public string FirstName { get; set; } = default!;
		public string LastName { get; set; } = default!;
		public string Email { get; set; } = default!;
		public string UserName { get; set; } = default!;
		public string PasswordHash { get; set; } = default!;
	}
}
