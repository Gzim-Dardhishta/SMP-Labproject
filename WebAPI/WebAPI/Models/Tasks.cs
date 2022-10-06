namespace WebAPI.Models
{
    public class Tasks
    {
        public int Id { get; set; }
        public string TaskType { get; set; }
        public string Status { get; set; }
        public int DueDate { get; set; }
    }
}
