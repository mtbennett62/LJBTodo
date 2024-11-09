using LJBTodo.Models.Tasks;

namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface IRepeatTaskTemplateRepository : IRepository<RepeatTaskTemplate>
    {
        Task<IEnumerable<RepeatTaskTemplate>> GetAllTemplatesForUser(Guid userGuid, Predicate<RepeatTaskTemplate> predicate = null);

    }
}
