using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication2.Models;

namespace WebApplication2.Models
{
    public class ManageUsers
    {
        public int PersonalId { get; set; }
        public int PassportNumber { get; set; }
        public int PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string WorkEmail { get; set; }
        public string FullTime { get; set; }
        public string IsIntern { get; set; }
    }
}