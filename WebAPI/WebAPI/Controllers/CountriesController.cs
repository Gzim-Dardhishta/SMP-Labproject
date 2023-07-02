using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Auth;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CountriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var countries = await _context.Countries.ToListAsync();
            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var countries = await _context.Countries.FirstOrDefaultAsync(x => x.ID == id);

            if (countries == null)
                return BadRequest("Invalid ID");

            return Ok(countries);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Countries countries)
        {
            await _context.Countries.AddAsync(countries);
            await _context.SaveChangesAsync();

            return Ok(countries);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Countries countries)
        {
            var dbCountries = await _context.Countries.FirstOrDefaultAsync(x => x.ID == id);

            if (dbCountries == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbCountries.NAME = countries.NAME;
            dbCountries.ISO = countries.ISO;

            // Update the message in the database
            _context.Countries.Update(dbCountries);
            await _context.SaveChangesAsync();

            return Ok(dbCountries);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var country = await _context.Countries.FirstOrDefaultAsync(x => x.ID == id);

            if (country == null)
                return BadRequest("Invalid id");

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
