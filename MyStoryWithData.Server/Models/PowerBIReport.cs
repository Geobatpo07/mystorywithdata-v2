namespace MyStoryWithData.Server.Models
{
	public class PowerBIReport
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string EmbedUrl { get; set; } = string.Empty; // lien vers rapport intégré
		public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
	}
}
