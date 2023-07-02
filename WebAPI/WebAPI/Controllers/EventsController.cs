using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using WebAPI.Migrations;
using Microsoft.Extensions.Logging;
using WebAPI.Auth;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var events = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);

            if (events == null)
                return BadRequest("Invalid ID");

            return Ok(events);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Event eventss)
        {
            await _context.Events.AddAsync(eventss);
            await _context.SaveChangesAsync();

            return Ok(eventss);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Event e)
        {
            var dbEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            if (dbEvent == null)
            {
                return NotFound();
            }

            dbEvent.EventName = e.EventName;
            dbEvent.EventDescription = e.EventDescription;
            dbEvent.EventStartDate = e.EventStartDate;
            dbEvent.EventEndDate = e.EventEndDate;
            dbEvent.Status = e.Status;

            _context.Events.Update(dbEvent);
            await _context.SaveChangesAsync();

            return Ok(dbEvent);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var ev = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);

            if (ev == null)
                return BadRequest("Invalid id");

            _context.Events.Remove(ev);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
