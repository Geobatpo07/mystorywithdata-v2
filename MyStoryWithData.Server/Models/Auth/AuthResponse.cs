namespace MyStoryWithData.Server.Models.Auth
{
	public class AuthResponse
	{
		public bool Success { get; set; }
		public string? Message { get; set; }
		public string? Token { get; set; }
	}
}
