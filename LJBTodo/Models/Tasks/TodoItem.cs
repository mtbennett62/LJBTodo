namespace LJBTodo.Models.Tasks
{
    public class TodoItem : TaskItem
    {
        public bool IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
        public long? RepeatTaskId { get; set; }
    }
}
