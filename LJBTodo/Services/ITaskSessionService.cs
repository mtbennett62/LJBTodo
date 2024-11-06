using LJBTodo.Models.DTOs;
using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public interface ITaskSessionService
    {
        Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userId);
        Task<TaskSession> GetTaskSessionById(long taskSessionId);
        Task<TaskSession> CreateTaskSession(TaskSession taskSession);
        TaskSession UpdateTaskSession(TaskSession taskSession);
        Task DeleteTaskSession(long taskSessionId);
        Task UpdateTasksForSession(long taskSessionId, IEnumerable<long> addedTaskIds, IEnumerable<long> removedTaskIds);
        Task<AddRepeatTasksToSessionResponse> AddRepeatTasksForSession(long sessionId, List<long> taskIds);
    }
}
