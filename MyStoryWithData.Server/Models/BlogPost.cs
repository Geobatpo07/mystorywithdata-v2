using System;
using System.ComponentModel.DataAnnotations;

namespace MyStoryWithData.Server.Models
{
	public class BlogPost
	{
		public int Id { get; set; }

		[Required]
		public string Title { get; set; }

		public string Summary { get; set; }

		[Required]
		public string Content { get; set; }

		public DateTime PublishedAt { get; set; } = DateTime.UtcNow;

		public bool IsPublic { get; set; } = false; // true = public, false = réservé aux abonnés
        public string CreatedBy { get; internal set; }
    }
}
