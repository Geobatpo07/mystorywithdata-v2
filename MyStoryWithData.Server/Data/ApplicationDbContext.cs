﻿using Microsoft.EntityFrameworkCore;
using MyStoryWithData.Server.Models;
using MyStoryWithData.Auth.Models;

namespace MyStoryWithData.Server.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		public DbSet<ApplicationUser> ApplicationUsers { get; set; }
		public DbSet<BlogPost> BlogPosts { get; set; }
		public DbSet<PowerBIReport> PowerBIReports { get; set; }
		public DbSet<MLModel> MLModels { get; set; }
		public DbSet<Service> Services { get; set; }
		public DbSet<Feedback> Feedbacks { get; set; }
		public DbSet<ContactMessage> ContactMessages { get; set; }
	}
}
