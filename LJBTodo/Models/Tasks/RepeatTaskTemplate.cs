using LJBTodo.Models.Enums;

namespace LJBTodo.Models.Tasks
{
    public class RepeatTaskTemplate : TaskItem
    {
        public Frequency Frequency { get; set; }
        public DateTime MostRecentCompletion { get; set; }
        public int? CustomFrequencyDays { get; set; }

        public virtual List<TodoItem> TodoItems { get; } = new List<TodoItem>();
    }
}
