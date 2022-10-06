namespace WebAPI.Models
{
    public class AddressAndContact
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public int WorkPhoneNumber { get; set; }
        public int PrivatePhoneNumber { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PersonalEmail { get; set; }
    }
}
