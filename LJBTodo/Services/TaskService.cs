using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;

namespace LJBTodo.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IRepository<RepeatTaskTemplate> _repeatTaskTemplateRepository;
        public TaskService(ITodoRepository todoRepository, IRepository<RepeatTaskTemplate> repeateTaskTemplateRepository)
        {
            _todoRepository = todoRepository;
            _repeatTaskTemplateRepository = repeateTaskTemplateRepository;
        }

        public async Task<T> CreateTask<T>(T task) where T : TaskItem
        {
            if (task.PriorityId == 0)
            {
                task.PriorityId = task.Priority != null ? task.Priority.Id : 1;
            }

            if (typeof(T) == typeof(TodoItem))
            {
                var todoTask = task as TodoItem;
                return await _todoRepository.CreateAsync(todoTask, true) as T;
            }
            else if (typeof(T) == typeof(RepeatTaskTemplate))
            {
                var repeatTask = task as RepeatTaskTemplate;
                return await _repeatTaskTemplateRepository.CreateAsync(repeatTask, true) as T;
            }
            else
            {
                throw new ArgumentException("Invalid task type.");
            }
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
