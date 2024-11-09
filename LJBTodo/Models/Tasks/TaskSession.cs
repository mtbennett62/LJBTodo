namespace LJBTodo.Models.Tasks
{
    public class TaskSession
    {
        public long Id { get; set; }
        public Guid UserGuid { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual List<TodoItem> TodoItems { get; } = new List<TodoItem>();
        public virtual ApplicationUser User { get; set; }
    }
}
