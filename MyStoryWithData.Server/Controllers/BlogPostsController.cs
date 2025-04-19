using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStoryWithData.Server.Data;
using MyStoryWithData.Server.Models;
using System.Security.Claims;

namespace MyStoryWithData.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class BlogPostsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public BlogPostsController(ApplicationDbContext context)
		{
			_context = context;
		}

		// ✅ Lecture publique (ou étendue selon statut utilisateur)
		[HttpGet]
		public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPosts([FromQuery] bool publicOnly = false)
		{
			IQueryable<BlogPost> query = _context.BlogPosts
				.AsNoTracking()
				.OrderByDescending(b => b.PublishedAt);

			bool isAuthenticated = User.Identity?.IsAuthenticated ?? false;

			if (publicOnly || !isAuthenticated)
			{
				// Cas 1 : visiteur anonyme OU demande explicite de posts publics
				query = query.Where(b => b.IsPublic);
			}
			else
			{
				// Cas 2 : utilisateur connecté, on vérifie l'email
				string? emailConfirmedClaim = User.FindFirst("email_confirmed")?.Value;

				if (string.IsNullOrEmpty(emailConfirmedClaim) || emailConfirmedClaim != "true")
				{
					return Forbid("Vous devez confirmer votre adresse email pour accéder aux publications privées.");
				}
			}

			return await query.ToListAsync();
		}

		// ✅ Lecture complète pour Admin uniquement
		[Authorize(Roles = "Admin")]
		[HttpGet("admin")]
		public async Task<ActionResult<IEnumerable<BlogPost>>> GetAllForAdmin()
		{
			var posts = await _context.BlogPosts
				.OrderByDescending(b => b.PublishedAt)
				.ToListAsync();

			return Ok(posts);
		}

		// ✅ Récupération d’un article par ID
		[HttpGet("{id}")]
		public async Task<ActionResult<BlogPost>> GetBlogPost(int id)
		{
			var blogPost = await _context.BlogPosts
				.AsNoTracking()
				.FirstOrDefaultAsync(p => p.Id == id);

			if (blogPost == null)
				return NotFound();

			// Si le post est privé, appliquer la même logique de vérification que plus haut
			if (!blogPost.IsPublic)
			{
				bool isAuthenticated = User.Identity?.IsAuthenticated ?? false;
				if (!isAuthenticated || User.FindFirst("email_confirmed")?.Value != "true")
				{
					return Forbid("Ce post est privé. Vous devez être connecté avec une adresse email confirmée.");
				}
			}

			return blogPost;
		}

		// 🛡️ Seul Admin peut créer
		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<ActionResult<BlogPost>> CreateBlogPost([FromBody] BlogPost blogPost)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			blogPost.PublishedAt = DateTime.UtcNow;
			blogPost.CreatedBy = User.Identity?.Name ?? "unknown";

			_context.BlogPosts.Add(blogPost);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetBlogPost), new { id = blogPost.Id }, blogPost);
		}

		// 🛡️ Seul Admin peut modifier
		[Authorize(Roles = "Admin")]
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] BlogPost blogPost)
		{
			if (id != blogPost.Id)
				return BadRequest("ID mismatch");

			_context.Entry(blogPost).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!_context.BlogPosts.Any(e => e.Id == id))
					return NotFound();

				throw;
			}

			return NoContent();
		}

		// 🛡️ Seul Admin peut supprimer
		[Authorize(Roles = "Admin")]
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteBlogPost(int id)
		{
			var blogPost = await _context.BlogPosts.FindAsync(id);

			if (blogPost == null)
				return NotFound();

			_context.BlogPosts.Remove(blogPost);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
