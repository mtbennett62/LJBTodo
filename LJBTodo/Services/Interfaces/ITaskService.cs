using LJBTodo.Models.Tasks;

namespace LJBTodo.Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TodoItem>> GetAllTasksForUser(Guid userId);
        Task<TodoItem> GetTaskById(long taskId);
        Task<T> CreateTask<T>(T task) where T : TaskItem;
        TodoItem UpdateTask(TodoItem task);
        Task DeleteTask(long taskId);

        Task<IEnumerable<RepeatTaskTemplate>> GetRepeatTaskTemplatesForUser(Guid userGuid);
        RepeatTaskTemplate UpdateRepeatTaskTemplate(RepeatTaskTemplate repeatTaskTemplate);
        Task DeleteRepeatTaskTemplate(long repeatTaskTemplateId);
        Task<RepeatTaskTemplate> GetRepeatTaskTemplateById(long repeatTaskTemplateId);

        Task<Comment> CreateComment(Comment comment);
        Task<Comment> GetCommentById(long commentId);
        Comment UpdateComment(Comment comment);
        Task DeleteComment(long commentId);
        Task<IEnumerable<Comment>> GetCommentsForTask(long taskId);
    }
}
