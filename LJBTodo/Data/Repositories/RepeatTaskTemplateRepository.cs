using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data.Repositories
{
    public class RepeatTaskTemplateRepository : Repository<RepeatTaskTemplate>, IRepeatTaskTemplateRepository
    {
        private readonly ApplicationDbContext _context;
        public RepeatTaskTemplateRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RepeatTaskTemplate>> GetAllTemplatesForUser(Guid userGuid, Predicate<RepeatTaskTemplate> predicate = null)
        {
            return await _context.RepeatTaskTemplates.Where(x => x.UserGuid == userGuid && (predicate == null || predicate(x))).ToListAsync();
        }
    }
}
