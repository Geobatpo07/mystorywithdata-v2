using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyStoryWithData.Server.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        // Navigation inverse
        public ICollection<MLModel> MLModels { get; set; } = new List<MLModel>();
        public ICollection<PowerBIReport> PowerBIReports { get; set; } = new List<PowerBIReport>();
    }
}
