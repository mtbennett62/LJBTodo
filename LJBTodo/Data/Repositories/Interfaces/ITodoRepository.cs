using LJBTodo.Models.Tasks;

namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface ITodoRepository
    {
        Task AddTodo(TodoItem todo);
        Task DeleteTodo(int id);
        void UpdateTodo(TodoItem todo);
        Task<TodoItem?> GetTodoById(int id);
        Task<IEnumerable<TodoItem>> GetTodoForUser(Guid userGuid);
        Task Save();
    }
}
