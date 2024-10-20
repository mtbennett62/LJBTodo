using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TodoItem>> GetAllTasksForUser(Guid userId);
        Task<TodoItem> GetTaskById(long taskId);
        Task<TodoItem> CreateTask(TodoItem task);
        Task<TodoItem> UpdateTask(TodoItem task);
        Task<bool> DeleteTask(long taskId);
    }
}
