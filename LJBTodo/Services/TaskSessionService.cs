using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public class TaskSessionService : ITaskSessionService
    {
        private readonly ITaskSessionRepository _taskSessionRepository;

        public TaskSessionService(ITaskSessionRepository taskSessionRepository)
        {
            _taskSessionRepository = taskSessionRepository;
        }

        public async Task UpdateTasksForSession(long taskSessionId, IEnumerable<long> addedTaskIds, IEnumerable<long> removedTaskIds)
        {
            await _taskSessionRepository.UpdateTasksForSession(taskSessionId, addedTaskIds, removedTaskIds);
        }

        public async Task<TaskSession> CreateTaskSession(TaskSession taskSession)
        {
            return await _taskSessionRepository.CreateAsync(taskSession, true);
        }

        public async Task DeleteTaskSession(long taskSessionId)
        {
            await _taskSessionRepository.DeleteTaskSession(taskSessionId);
        }

        public async Task<TaskSession> GetTaskSessionById(long taskSessionId)
        {
            return await _taskSessionRepository.GetByIdAsync((int)taskSessionId);
        }

        public async Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userId)
        {
            return await _taskSessionRepository.GetTaskSessionsForUser(userId);
        }

        public TaskSession UpdateTaskSession(TaskSession taskSession)
        {
            return  _taskSessionRepository.UpdateAsync(taskSession, true);
        }
    }
}
