namespace MyStoryWithData.Server.Models
{
	public class Feedback
	{
		public int Id { get; set; }
		public string Author { get; set; } = "Anonyme";
		public string Comment { get; set; } = string.Empty;
		public int Rating { get; set; } // ex: 1 à 5 étoiles
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	}
}
