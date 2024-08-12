using LJBTodo.Models;

namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface ITodoRepository
    {
        void AddTodo(TodoItem todo);
        void DeleteTodo(int id);
        void UpdateTodo(TodoItem todo);
        TodoItem? GetTodoById(int id);
        IEnumerable<TodoItem> GetTodoForUser(Guid userGuid);
        void Save();


    }
}
