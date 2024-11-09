namespace LJBTodo.Models
{
    public class Escalation
    {
        public int Id { get; set; } // Primary key
        public DateTime EscalationDate { get; set; }
        public Priority NewPriority { get; set; }
        public long TodoItemId { get; set; }
        public bool Escalated { get; set; }
    }
}
