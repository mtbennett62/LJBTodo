namespace LJBTodo.Models.Tasks
{
    public class Comment
    {
        public long Id { get; set; }
        public long TodoItemId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; } = Guid.Empty;
    }
}
