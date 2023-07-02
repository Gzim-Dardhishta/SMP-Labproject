using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Auth;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HolidayController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var holidays = await _context.Holidays.ToListAsync();
            return Ok(holidays);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var holiday = await _context.Holidays.FirstOrDefaultAsync(x => x.Id == id);

            if (holiday == null)
                return BadRequest("Invalid ID");

            return Ok(holiday);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Holiday holiday)
        {
            await _context.Holidays.AddAsync(holiday);
            await _context.SaveChangesAsync();

            return Ok(holiday);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Holiday holiday)
        {
            var dbHoliday = await _context.Holidays.FirstOrDefaultAsync(x => x.Id == id);

            if (dbHoliday == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbHoliday.HolidayType = holiday.HolidayType;
            dbHoliday.HolidayStartDate = holiday.HolidayStartDate;
            dbHoliday.HolidayEndDate = holiday.HolidayEndDate;

            // Update the message in the database
            _context.Holidays.Update(dbHoliday);
            await _context.SaveChangesAsync();

            return Ok(dbHoliday);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var holiday = await _context.Holidays.FirstOrDefaultAsync(x => x.Id == id);

            if (holiday == null)
                return BadRequest("Invalid id");

            _context.Holidays.Remove(holiday);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
