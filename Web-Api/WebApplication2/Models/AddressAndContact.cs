using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class AddressAndContact
    {
        public int RowId { get; set; }
        public string Address { get; set; }
        public int WorkPhoneNumber { get; set; }
        public int PrivatePhoneNumber { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PersonalEmail { get; set; }
        public int EmployeeId { get; set; }
    }
}