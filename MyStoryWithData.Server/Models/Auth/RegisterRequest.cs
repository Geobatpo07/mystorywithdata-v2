﻿namespace MyStoryWithData.Server.Models.Auth
{
	public class RegisterRequest
	{
		public string Email { get; set; } = default!;
		public string Password { get; set; } = default!;
		public string ConfirmPassword { get; set; } = default!;
	}
}
