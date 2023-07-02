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
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var messages = await _context.Messages.ToListAsync();
            return Ok(messages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
                return BadRequest("Invalid ID");

            return Ok(message);
        }
        //[Authorize(Roles = UserRoles.Manager)]
        [HttpPost]
        public async Task<ActionResult> Post(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Message message)
        {
            var dbMessage = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);

            if (dbMessage == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbMessage.Name = message.Name;
            dbMessage.LastName = message.LastName;
            dbMessage.Email = message.Email;
            dbMessage.EmployeeMessage = message.EmployeeMessage;

            // Update the message in the database
            _context.Messages.Update(dbMessage);
            await _context.SaveChangesAsync();

            return Ok(dbMessage);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
                return BadRequest("Invalid id");

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    } 
}
