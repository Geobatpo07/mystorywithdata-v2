using System;
using System.ComponentModel.DataAnnotations;

namespace MyStoryWithData.Server.Models
{
    public class MLModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Version { get; set; } = "1.0";

        [Required]
        [Url]
        public string ModelUrl { get; set; } = string.Empty;

        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;

        // Foreign key et navigation
        public int CategoryId { get; set; }
        public Category Category { get; set; } = default!;
    }
}
