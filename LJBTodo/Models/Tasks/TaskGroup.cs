namespace LJBTodo.Models.Tasks
{
    public class TaskGroup
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<RepeatTaskTemplate> RepeatTasks { get; set; }
    }
}
