using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class WorkAndProfession
    {
        public int RowId { get; set; }
        public string Location { get; set; }
        public string DivisionName { get; set; }
        public string DepartmentName { get; set; }
        public string UnitName { get; set; }
        public string JobName { get; set; }
        public int PersonalId { get; set; }
        public string Email { get; set; }
        public string TeamName { get; set; }
    }
}