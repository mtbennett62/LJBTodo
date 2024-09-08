namespace LJBTodo.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentCategoryId { get; set; }

        public virtual ICollection<TodoItem> TodoItems { get; set; }
    }
}
