using LJBTodo.Models.Tasks;

namespace LJBTodo.Data.Repositories
{
    public class RepeatTaskTemplateRepository : Repository<RepeatTaskTemplate>
    {
        private readonly ApplicationDbContext _context;
        public RepeatTaskTemplateRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
