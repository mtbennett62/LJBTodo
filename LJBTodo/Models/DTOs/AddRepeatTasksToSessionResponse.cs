using LJBTodo.Models.Tasks;

namespace LJBTodo.Models.DTOs
{
    public class AddRepeatTasksToSessionResponse
    {
        public long TaskSessionId { get; set; }
        public List<TodoItem> AddedTodoItems { get; set; }
    }
}
