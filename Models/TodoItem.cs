using LJBTodo.Models.Enums;

namespace LJBTodo.Models
{

    public abstract class TaskItem
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
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

    public class TodoItem : TaskItem
    {
        public Guid UserGuid { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
        public long? RepeatTaskId { get; set; }


    }

    public class RepeatTaskTemplate : TaskItem
    {
        public Frequency Frequency { get; set; }
        public DateTime MostRecentCompletion { get; set; }
        public int? CustomFrequencyDays { get; set; }

        public virtual List<TodoItem> TodoItems { get; } = new List<TodoItem>();
    }


    public class Comment
    {
        public long Id { get; set; }
        public long TodoItemId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; } = Guid.Empty;
    }
}
