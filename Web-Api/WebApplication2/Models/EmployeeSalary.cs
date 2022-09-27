using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class EmployeeSalary
    {
        public int RowId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobName { get; set; }
        public int Salary { get; set; }
        public string CurrencyType { get; set; }
        public int AfterHoursBonus { get; set; }
        public int EmployeeId { get; set; }
    }
}