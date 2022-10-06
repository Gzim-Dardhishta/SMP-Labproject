namespace WebAPI.Models
{
    public class ManageUsers
    {
        public int Id { get; set; }
        public int PassportNumber { get; set; }
        public int PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string WorkEmail { get; set; }
        public string FullTime { get; set; }
        public string IsIntern { get; set; }
    }
}
