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
    public class AddressAndContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AddressAndContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var addresscontacts = await _context.AddressAndContacts.ToListAsync();
            return Ok(addresscontacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var addresscontacts = await _context.AddressAndContacts.FirstOrDefaultAsync(x => x.Id == id);

            if (addresscontacts == null)
                return BadRequest("Invalid ID");

            return Ok(addresscontacts);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(AddressAndContact ac)
        {
            await _context.AddressAndContacts.AddAsync(ac);
            await _context.SaveChangesAsync();

            return Ok(ac);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AddressAndContact ac)
        {
            var dbAC = await _context.AddressAndContacts.FirstOrDefaultAsync(m => m.Id == id);

            if (dbAC == null)
            {
                return NotFound();
            }

            dbAC.Address = ac.Address;
            dbAC.WorkPhoneNumber = ac.WorkPhoneNumber;
            dbAC.PrivatePhoneNumber= ac.PrivatePhoneNumber;
            dbAC.ZipCode = ac.ZipCode;
            dbAC.City = ac.City;
            dbAC.Country = ac.Country;
            dbAC.PersonalEmail= ac.PersonalEmail;

            // Update the message in the database
            _context.AddressAndContacts.Update(dbAC);
            await _context.SaveChangesAsync();

            return Ok(dbAC);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var ac = await _context.AddressAndContacts.FirstOrDefaultAsync(x => x.Id == id);

            if (ac == null)
                return BadRequest("Invalid id");

            _context.AddressAndContacts.Remove(ac);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
