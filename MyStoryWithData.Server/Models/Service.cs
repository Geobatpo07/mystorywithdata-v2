namespace MyStoryWithData.Server.Models
{
	public class Service
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public decimal Price { get; set; }
		public bool IsAvailable { get; set; } = true;
	}
}
