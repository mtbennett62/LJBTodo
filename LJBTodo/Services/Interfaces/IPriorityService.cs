using LJBTodo.Models;

namespace LJBTodo.Services.Interfaces
{
    public interface IPriorityService
    {
        IEnumerable<Priority> GetPriorities();
        Task<Priority> GetPriorityById(long priorityId);
        Task<Priority> CreatePriority(Priority priority);
        Priority UpdatePriority(Priority priority);
        Task DeletePriority(long priorityId);
    }
}
