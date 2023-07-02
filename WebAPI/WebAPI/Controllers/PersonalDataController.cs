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
    public class PersonalDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PersonalDataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var personalData = await _context.PersonalDatas.ToListAsync();
            return Ok(personalData);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var pd = await _context.PersonalDatas.FirstOrDefaultAsync(x => x.Id == id);

            if (pd == null)
                return BadRequest("Invalid ID");

            return Ok(pd);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(PersonalData pd)
        {
            await _context.PersonalDatas.AddAsync(pd);
            await _context.SaveChangesAsync();

            return Ok(pd);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PersonalData pd)
        {
            var dbPD = await _context.PersonalDatas.FirstOrDefaultAsync(x => x.Id == id);

            if (dbPD == null)
            {
                return NotFound();
            }

            // Update the message properties
            dbPD.PersonalId = pd.PersonalId;
            dbPD.PassportNumber= pd.PassportNumber;
            dbPD.PhoneNumber= pd.PhoneNumber;
            dbPD.FirstName = pd.FirstName;
            dbPD.LastName = pd.LastName;
            dbPD.WorkEmail=pd.WorkEmail;
            dbPD.PersonalEmail=pd.PersonalEmail;
            dbPD.DateOfBirth=pd.DateOfBirth;
            dbPD.StateOfBirth=pd.StateOfBirth;
            dbPD.BirthPlace = pd.BirthPlace;
            dbPD.Gender=pd.Gender;
            dbPD.Nationality=pd.Nationality;
            dbPD.MartialStatus=pd.MartialStatus;
            dbPD.FullTime = pd.FullTime;
            dbPD.IsIntern = pd.IsIntern;


            // Update the message in the database
            _context.PersonalDatas.Update(dbPD);
            await _context.SaveChangesAsync();

            return Ok(dbPD);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var pd = await _context.PersonalDatas.FirstOrDefaultAsync(x => x.Id == id);

            if (pd == null)
                return BadRequest("Invalid id");

            _context.PersonalDatas.Remove(pd);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
