using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebAPI.Auth;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UnitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var units = await _context.Units.ToListAsync();
            return Ok(units);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var unit = await _context.Units.FirstOrDefaultAsync(x => x.Id == id);

            if (unit == null)
                return BadRequest("Invalid ID");
            return Ok(unit);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Units unit)
        {
            await _context.Units.AddAsync(unit);
            await _context.SaveChangesAsync();

            return Ok(unit);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Units unit)
        {
            var dbUnits = await _context.Units.FirstOrDefaultAsync(x => x.Id == id);

            if (dbUnits == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbUnits.UnitName = unit.UnitName;
            dbUnits.UnitDescription = unit.UnitDescription;
            dbUnits.CreatedDate = unit.CreatedDate;

            // Update the message in the database
            _context.Units.Update(dbUnits);
            await _context.SaveChangesAsync();

            return Ok(dbUnits);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var unit = await _context.Units.FirstOrDefaultAsync(x => x.Id == id);

            if (unit == null)
                return BadRequest("Invalid id");

            _context.Units.Remove(unit);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
