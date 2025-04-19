namespace MyStoryWithData.Server.Models
{
	public class MLModel
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string Version { get; set; } = "1.0";
		public string ModelUrl { get; set; } = string.Empty; // lien de téléchargement ou API
		public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
	}
}
