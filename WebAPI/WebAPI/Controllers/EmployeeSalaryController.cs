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
    public class EmployeeSalaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeSalaryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var salaries = await _context.EmployeesSalary.ToListAsync();
            return Ok(salaries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var salaries = await _context.Departments.FirstOrDefaultAsync(x => x.ID == id);

            if (salaries == null)
                return BadRequest("Invalid ID");

            return Ok(salaries);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPost]
        public async Task<ActionResult> Post(Department department)
        {
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();

            return Ok(department);
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EmployeeSalary eSalary)
        {
            var dbESalary = await _context.EmployeesSalary.FirstOrDefaultAsync(m => m.Id == id);

            if (dbESalary == null)
            {
                return NotFound();
            }

            dbESalary.FirstName = eSalary.FirstName;
            dbESalary.LastName = eSalary.LastName;
            dbESalary.JobName = eSalary.JobName;
            dbESalary.Salary = eSalary.Salary;
            dbESalary.CurrencyType = eSalary.CurrencyType;
            dbESalary.AfterHoursBonus = eSalary.AfterHoursBonus;

            // Update the message in the database
            _context.EmployeesSalary.Update(dbESalary);
            await _context.SaveChangesAsync();

            return Ok(dbESalary);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var eSalary = await _context.EmployeesSalary.FirstOrDefaultAsync(x => x.Id == id);

            if (eSalary == null)
                return BadRequest("Invalid id");

            _context.EmployeesSalary.Remove(eSalary);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
