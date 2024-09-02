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
        public int PriorityId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual List<Escalation> Escalations { get; } = [];
        public virtual List<ApplicationUser> IncludedUsers { get; } = [];
    }
}

