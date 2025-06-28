using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStoryWithData.Server.Data;
using MyStoryWithData.Server.Models;

namespace MyStoryWithData.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PowerBIReportController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public PowerBIReportController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/PowerBIReport/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<PowerBIReport>> GetPowerBIReport(int id)
		{
			var report = await _context.PowerBIReports.FindAsync(id);

			if (report == null)
			{
				return NotFound();
			}

			return report;
		}

		// POST: api/PowerBIReport
		[HttpPost]
		public async Task<ActionResult<PowerBIReport>> CreatePowerBIReport(PowerBIReport report)
		{
			_context.PowerBIReports.Add(report);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetPowerBIReport), new { id = report.Id }, report);
		}

		// GET: api/PowerBIReports
		[HttpGet]
		public async Task<ActionResult<IEnumerable<PowerBIReport>>> GetPowerBIReports()
		{
			return await _context.PowerBIReports.ToListAsync();
		}
	}
}
