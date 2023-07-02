using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Auth;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DepartmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var departments = await _context.Departments.ToListAsync();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.ID == id);

            if (department == null)
                return BadRequest("Invalid ID");

            return Ok(department);
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
        public async Task<IActionResult> Put(int id, [FromBody] Department department)
        {
            var dbDepartment = await _context.Departments.FirstOrDefaultAsync(x => x.ID == id);

            if (dbDepartment == null)
            {
                return NotFound();
            }

            dbDepartment.Name = department.Name;
            dbDepartment.Location = department.Location;
            dbDepartment.Description = department.Description;

            _context.Departments.Update(dbDepartment);
            await _context.SaveChangesAsync();

            return Ok(dbDepartment);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.ID == id);

            if (department == null)
                return BadRequest("Invalid id");

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
