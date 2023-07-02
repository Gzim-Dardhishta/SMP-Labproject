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
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
                return BadRequest("Invalid ID");

            return Ok(task);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Tasks ts)
        {
            await _context.Tasks.AddAsync(ts);
            await _context.SaveChangesAsync();

            return Ok(ts);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Tasks ts)
        {
            var dbTs = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (dbTs == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbTs.TaskType = ts.TaskType;
            dbTs.Status = ts.Status;
            dbTs.DueDate = ts.DueDate;


            // Update the message in the database
            _context.Tasks.Update(dbTs);
            await _context.SaveChangesAsync();

            return Ok(dbTs);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
                return BadRequest("Invalid id");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
