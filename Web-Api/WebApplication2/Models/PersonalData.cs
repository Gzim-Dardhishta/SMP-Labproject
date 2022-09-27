using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class PersonalData
    {
        public int? RowId { get; set; }
        public int? PersonalId { get; set; }
        public string? PassportNumber { get; set; }
        public int? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? WorkEmail { get; set; }
        public string? PersonalEmail { get; set; }
        public string? DateOfBirth { get; set; }
        public string? StateOfBirth { get; set; }
        public string? BirthPlace { get; set; }
        public string? Gender { get; set; }
        public string? Nationality { get; set; }
        public string? MartialStatus { get; set; }
        public string? FullTime { get; set; }
        public string? IsIntern { get; set; }
    }
}