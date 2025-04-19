using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyStoryWithData.Server.Middleware
{
	public class RequestLoggingMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<RequestLoggingMiddleware> _logger;

		public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
		{
			_next = next;
			_logger = logger;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			var request = context.Request;
			var user = context.User.Identity?.IsAuthenticated == true
				? context.User.Identity.Name
				: "Anonymous";

			_logger.LogInformation("➡️ HTTP {Method} {Path}{Query} by {User}",
				request.Method,
				request.Path,
				request.QueryString,
				user);

			await _next(context); // Passer au middleware suivant

			_logger.LogInformation("⬅️ HTTP {StatusCode} {Path}", context.Response.StatusCode, request.Path);
		}
	}
}
