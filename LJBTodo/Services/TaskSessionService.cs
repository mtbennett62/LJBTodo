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

        public async Task AddTasksToSession(long taskSessionId, IEnumerable<long> taskIds)
        {
            await _taskSessionRepository.AddTasksToSession(taskSessionId, taskIds);
        }

        public async Task<TaskSession> CreateTaskSession(TaskSession taskSession)
        {
            return await _taskSessionRepository.CreateAsync(taskSession, true);
        }

        public async Task DeleteTaskSession(long taskSessionId)
        {
            await _taskSessionRepository.DeleteAsync((int)taskSessionId, true);
        }

        public async Task<TaskSession> GetTaskSessionById(long taskSessionId)
        {
            return await _taskSessionRepository.GetByIdAsync((int)taskSessionId);
        }

        public Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<TaskSession> UpdateTaskSession(TaskSession taskSession)
        {
            throw new NotImplementedException();
        }
    }
}
