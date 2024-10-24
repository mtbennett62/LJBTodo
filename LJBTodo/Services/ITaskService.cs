using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TodoItem>> GetAllTasksForUser(Guid userId);
        Task<TodoItem> GetTaskById(long taskId);
        Task<T> CreateTask<T>(T task) where T : TaskItem;
        Task<TodoItem> UpdateTask(TodoItem task);
        Task<bool> DeleteTask(long taskId);
    }
}
