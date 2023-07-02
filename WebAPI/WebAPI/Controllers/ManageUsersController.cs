using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebAPI.Auth;
using WebAPI.Data;
using WebAPI.Data;
using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ManageUsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var users = await _context.ManageUsers.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var user = await _context.ManageUsers.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return BadRequest("Invalid ID");
            return Ok(user);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(ManageUsers user)
        {
            await _context.ManageUsers.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ManageUsers user)
        {
            var dbUsers = await _context.ManageUsers.FirstOrDefaultAsync(x => x.Id == id);

            if (dbUsers == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbUsers.PassportNumber = user.PassportNumber;
            dbUsers.PhoneNumber = user.PhoneNumber;
            dbUsers.FirstName= user.FirstName;
            dbUsers.LastName= user.LastName;
            dbUsers.WorkEmail = user.WorkEmail;
            dbUsers.FullTime= user.FullTime;
            dbUsers.IsIntern = user.IsIntern;

            // Update the message in the database
            _context.ManageUsers.Update(dbUsers);
            await _context.SaveChangesAsync();

            return Ok(dbUsers);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await _context.ManageUsers.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return BadRequest("Invalid id");

            _context.ManageUsers.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
