using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using WebAPI.Auth;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkAndProfessionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WorkAndProfessionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var wp = await _context.WorkAndProfessions.ToListAsync();
            return Ok(wp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var wp = await _context.WorkAndProfessions.FirstOrDefaultAsync(x => x.Id == id);

            if (wp == null)
                return BadRequest("Invalid ID");

            return Ok(wp);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(WorkAndProfession wp)
        {
            await _context.WorkAndProfessions.AddAsync(wp);
            await _context.SaveChangesAsync();

            return Ok(wp);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] WorkAndProfession wp)
        {
            var dbWp = await _context.WorkAndProfessions.FirstOrDefaultAsync(x => x.Id == id);

            if (dbWp == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbWp.Location = wp.Location;
            dbWp.DivisionName = wp.DivisionName;
            dbWp.DepartmentName = wp.DepartmentName;
            dbWp.UnitName= wp.UnitName;
            dbWp.JobName = wp.JobName;
            dbWp.PersonalId= wp.PersonalId;
            dbWp.Email = wp.Email;
            dbWp.TeamName = wp.TeamName;

            // Update the message in the database
            _context.WorkAndProfessions.Update(dbWp);
            await _context.SaveChangesAsync();

            return Ok(dbWp);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var wp = await _context.WorkAndProfessions.FirstOrDefaultAsync(x => x.Id == id);

            if (wp == null)
                return BadRequest("Invalid id");

            _context.WorkAndProfessions.Remove(wp);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
