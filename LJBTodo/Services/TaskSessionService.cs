using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.DTOs;
using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public class TaskSessionService : ITaskSessionService
    {
        private readonly ITaskSessionRepository _taskSessionRepository;
        private readonly ITodoRepository _todoRepository;
        
        public TaskSessionService(ITaskSessionRepository taskSessionRepository, ITodoRepository todoRepository)
        {
            _taskSessionRepository = taskSessionRepository;
            _todoRepository = todoRepository;
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
        public async Task<AddRepeatTasksToSessionResponse> AddRepeatTasksForSession(long sessionId, List<long> taskIds)
        {
            var taskSession = await _taskSessionRepository.GetByIdAsync((int)sessionId);

            var repeatTaskTemplates = await _taskSessionRepository.GetRepeatTaskTemplatesByIds(taskIds);

            var addedTodoItems = new List<TodoItem>();

            foreach (var repeatTaskTemplate in repeatTaskTemplates)
            {
                var createdTodoItem = await CreateTodoItemFromRepeatTask(repeatTaskTemplate);

                addedTodoItems.Add(createdTodoItem);
            }

            taskSession.TodoItems.AddRange(addedTodoItems);

            await _todoRepository.SaveAsync();

            return new AddRepeatTasksToSessionResponse { TaskSessionId = sessionId, AddedTodoItems = addedTodoItems };
        }

        private async Task<TodoItem> CreateTodoItemFromRepeatTask(RepeatTaskTemplate repeatTask)
        {
            var newTask = new TodoItem
            {
                Category = repeatTask.Category,
                CategoryId = repeatTask.CategoryId,
                Description = repeatTask.Description,
                EstimatedHours = repeatTask.EstimatedHours,
                IsComplete = false,
                Name = repeatTask.Name,
                UserGuid = repeatTask.UserGuid,
                Priority = repeatTask.Priority,
                PriorityId = repeatTask.PriorityId,
                RepeatTaskId = repeatTask.Id
            };

            return await _todoRepository.CreateAsync(newTask);
      
            throw new NotImplementedException();
        }
    }
}
