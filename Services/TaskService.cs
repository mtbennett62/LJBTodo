using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITodoRepository _todoRepository;
        public TaskService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<TodoItem> CreateTask(TodoItem task)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteTask(long taskId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TodoItem>> GetAllTasksForUser(Guid userId)
        {
            var tasks = await _todoRepository.GetTodoForUser(userId);

            var orderedTasks = tasks.OrderBy(x => x.DueDate).ThenByDescending(x => x.Priority?.OrderPosition).ToList();

            return orderedTasks;
        }

        public async Task<TodoItem> GetTaskById(long taskId)
        {
            throw new NotImplementedException();
        }

        public async Task<TodoItem> UpdateTask(TodoItem task)
        {
            throw new NotImplementedException();
        }
    }
}
