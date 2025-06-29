using MyStoryWithData.Auth.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStoryWithData.Server.Models
{
    public class BlogPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Summary { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;

        public bool IsPublic { get; set; } = false;

        [Required]
        public string CreatedBy { get; set; } = string.Empty;

        // Optional: ForeignKey to ApplicationUser
        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser? Author { get; set; }
    }
}
