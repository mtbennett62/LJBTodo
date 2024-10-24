
using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data.Repositories
{
    public class TodoRepository : Repository<TodoItem>, ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetTodoForUser(Guid userGuid)
        {
            return await _context.TodoItems.Include(t => t.Comments).Where(x => x.UserGuid == userGuid).ToListAsync();
        }

    }
}