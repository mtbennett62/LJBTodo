using LJBTodo.Models.Enums;

namespace LJBTodo.Models
{
    public class Escalation
    {
        public DateTime EscalationDate { get; set; }
        public Priority NewPriority { get; set; }
        public long TodoItemId { get; set; }
    }
}
