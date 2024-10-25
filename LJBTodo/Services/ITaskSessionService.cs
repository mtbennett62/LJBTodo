using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public interface ITaskSessionService
    {
        Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userId);
        Task<TaskSession> GetTaskSessionById(long taskSessionId);
        Task<TaskSession> CreateTaskSession(TaskSession taskSession);
        Task<TaskSession> UpdateTaskSession(TaskSession taskSession);
        Task DeleteTaskSession(long taskSessionId);
        Task AddTasksToSession(long taskSessionId, IEnumerable<long> taskIds);
    }
}
