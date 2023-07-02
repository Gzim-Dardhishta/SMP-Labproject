namespace WebAPI.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventStartDate { get; set; }
        public string EventEndDate { get; set; }
        public string Status { get; set; }
    }
}
