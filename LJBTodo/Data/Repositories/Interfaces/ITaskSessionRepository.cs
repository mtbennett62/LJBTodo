using LJBTodo.Models.Tasks;

namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface ITaskSessionRepository : IRepository<TaskSession>
    {
        Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userGuid);
        Task UpdateTasksForSession(long taskSessionId, IEnumerable<long> addedTaskIds, IEnumerable<long> removedTaskIds);
        Task DeleteTaskSession(long taskSessionId);
    }


}
