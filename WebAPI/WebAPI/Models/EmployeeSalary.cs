namespace WebAPI.Models
{
    public class EmployeeSalary
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int JobName { get; set; }
        public int Salary { get; set; }
        public string CurrencyType { get; set; }
        public int AfterHoursBonus { get; set; }
    }
}
