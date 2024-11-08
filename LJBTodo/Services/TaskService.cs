using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;
using LJBTodo.Services.Interfaces;

namespace LJBTodo.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IRepeatTaskTemplateRepository _repeatTaskTemplateRepository;
        private readonly IRepository<Comment> _commentRepository;
        public TaskService(ITodoRepository todoRepository, IRepeatTaskTemplateRepository repeateTaskTemplateRepository, IRepository<Comment> commentRepository)
        {
            _todoRepository = todoRepository;
            _repeatTaskTemplateRepository = repeateTaskTemplateRepository;
            _commentRepository = commentRepository;
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

        public async Task DeleteTask(long taskId)
        {
            await _todoRepository.DeleteAsync(taskId, true);
        }

        public async Task<IEnumerable<TodoItem>> GetAllTasksForUser(Guid userId)
        {
            var tasks = await _todoRepository.GetTodoForUser(userId);

            var orderedTasks = tasks.OrderBy(x => x.DueDate).ThenByDescending(x => x.Priority?.OrderPosition).ToList();

            return orderedTasks;
        }

        public async Task<TodoItem> GetTaskById(long taskId)
        {
            return await _todoRepository.GetByIdAsync(taskId);
        }

        public TodoItem UpdateTask(TodoItem task)
        {
            return _todoRepository.UpdateAsync(task, true);
        }

        public async Task<IEnumerable<RepeatTaskTemplate>> GetRepeatTaskTemplatesForUser(Guid userGuid)
        {
            return await _repeatTaskTemplateRepository.GetAllTemplatesForUser(userGuid);
        }

        public async Task<Comment> CreateComment(Comment comment)
        {
            return await _commentRepository.CreateAsync(comment, true);
        }

        public async Task<Comment> GetCommentById(long commentId)
        {
            return await _commentRepository.GetByIdAsync(commentId);
        }

        public Comment UpdateComment(Comment comment)
        {
            return _commentRepository.UpdateAsync(comment, true);
        }

        public async Task DeleteComment(long commentId)
        {
            await _commentRepository.DeleteAsync(commentId, true);
        }

        public async Task<IEnumerable<Comment>> GetCommentsForTask(long taskId)
        {
            return await _commentRepository.GetAllWithPredicateAsync( x => x.TodoItemId == taskId);
        }

        public RepeatTaskTemplate UpdateRepeatTaskTemplate(RepeatTaskTemplate repeatTaskTemplate)
        {
            return _repeatTaskTemplateRepository.UpdateAsync(repeatTaskTemplate, true);
        }

        public async Task DeleteRepeatTaskTemplate(long repeatTaskTemplateId)
        {
            await _repeatTaskTemplateRepository.DeleteAsync(repeatTaskTemplateId, true);
        }

        public async Task<RepeatTaskTemplate> GetRepeatTaskTemplateById(long repeatTaskTemplateId)
        {
            return await _repeatTaskTemplateRepository.GetByIdAsync(repeatTaskTemplateId);
        }
    }
}
