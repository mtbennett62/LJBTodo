namespace LJBTodo.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public Guid UserGuid { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public int PriorityId { get; set; }
        public int? CategoryId { get; set; }
        public int? EstimatedHours { get; set; }

        public virtual Category Category { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual List<Escalation> Escalations { get; } = new List<Escalation>();
        public virtual List<ApplicationUser> IncludedUsers { get; } = new List<ApplicationUser>();
        public virtual List<Comment> Comments { get; } = new List<Comment>();
    }

    public class Comment
    {
        public long Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; } = Guid.Empty;
    }
}
