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
    public class NewHiresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public NewHiresController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var newHires = await _context.NewHires.ToListAsync();
            return Ok(newHires);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var newHires = await _context.NewHires.FirstOrDefaultAsync(x => x.Id == id);

            if (newHires == null)
                return BadRequest("Invalid ID");

            return Ok(newHires);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(NewHires newHire)
        {
            await _context.NewHires.AddAsync(newHire);
            await _context.SaveChangesAsync();

            return Ok(newHire);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NewHires newHire)
        {
            var dbNewHires = await _context.NewHires.FirstOrDefaultAsync(x => x.Id == id);

            if (dbNewHires == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbNewHires.Name = newHire.Name; 
            dbNewHires.LastName = newHire.LastName;
            dbNewHires.DateJoined = newHire.DateJoined;
            dbNewHires.JobPosition = newHire.JobPosition;

            // Update the message in the database
            _context.NewHires.Update(dbNewHires);
            await _context.SaveChangesAsync();

            return Ok(dbNewHires);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var newHire = await _context.NewHires.FirstOrDefaultAsync(x => x.Id == id);

            if (newHire == null)
                return BadRequest("Invalid id");

            _context.NewHires.Remove(newHire);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
