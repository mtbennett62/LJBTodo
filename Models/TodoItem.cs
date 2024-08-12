using LJBTodo.Models.Enums;

namespace LJBTodo.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public Guid UserGuid { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Description { get; set; }
        public Priority Priority { get; set; }
        public virtual List<Escalation> Escalations { get; } = [];
        public virtual List<ApplicationUser> IncludedUsers { get; } = [];
    }
}

