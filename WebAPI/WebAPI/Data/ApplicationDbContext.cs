
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<AddressAndContact> AddressAndContacts { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Countries> Countries { get; set; }
        public DbSet<EmployeeSalary> EmployeesSalary { get; set; }
        public DbSet<ManageUsers> ManageUsers { get; set; }
        public DbSet<PersonalData> PersonalDatas { get; set; }
        public DbSet<WorkAndProfession> WorkAndProfessions { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Units> Units { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<WorkType> WorkType { get; set; }
        public DbSet<NewHires> NewHires { get; set; }
        public DbSet<Message> Messages { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}