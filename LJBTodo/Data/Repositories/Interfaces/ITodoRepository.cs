using LJBTodo.Models.Tasks;

namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface ITodoRepository : IRepository<TodoItem>
    {
        Task<IEnumerable<TodoItem>> GetTodoForUser(Guid userGuid);
    }
}
