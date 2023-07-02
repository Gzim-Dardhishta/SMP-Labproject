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
    public class WorkTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WorkTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var workTypes = await _context.WorkType.ToListAsync();
            return Ok(workTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var workType = await _context.WorkType.FirstOrDefaultAsync(x => x.Id == id);

            if (workType == null)
                return BadRequest("Invalid ID");

            return Ok(workType);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(WorkType wt)
        {
            await _context.WorkType.AddAsync(wt);
            await _context.SaveChangesAsync();

            return Ok(wt);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] WorkType wt)
        {
            var dbWt = await _context.WorkType.FirstOrDefaultAsync(x => x.Id == id);

            if (dbWt == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbWt.Name = wt.Name;
            dbWt.Email = wt.Email;
            dbWt.TypeOfWork = wt.TypeOfWork;

            // Update the message in the database
            _context.WorkType.Update(dbWt);
            await _context.SaveChangesAsync();

            return Ok(dbWt);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var workType = await _context.WorkType.FirstOrDefaultAsync(x => x.Id == id);

            if (workType == null)
                return BadRequest("Invalid id");

            _context.WorkType.Remove(workType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
