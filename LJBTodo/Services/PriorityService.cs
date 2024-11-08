using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models;
using LJBTodo.Services.Interfaces;

namespace LJBTodo.Services
{
    public class PriorityService : IPriorityService
    {
        private readonly IRepository<Priority> _priorityRepository;
        public PriorityService(IRepository<Priority> repository)
        {
            _priorityRepository = repository;
        }

        public async Task<Priority> CreatePriority(Priority priority)
        {
            return await _priorityRepository.CreateAsync(priority, true);
        }

        public Task DeletePriority(long priorityId)
        {
            return _priorityRepository.DeleteAsync(priorityId, true);
        }

        public IEnumerable<Priority> GetPriorities()
        {
            return  _priorityRepository.GetAll();
        }

        public async Task<Priority> GetPriorityById(long priorityId)
        {
            return await _priorityRepository.GetByIdAsync(priorityId);
        }

        public Priority UpdatePriority(Priority priority)
        {
            return _priorityRepository.UpdateAsync(priority, true);
        }
    }
}
