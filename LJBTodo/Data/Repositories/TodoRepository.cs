
using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddTodo(TodoItem todo)
        {
            await _context.TodoItems.AddAsync(todo);
        }

        public async Task DeleteTodo(int id)
        {
            var todo = await GetTodoById(id);
            if (todo == null) return;
            _context.TodoItems.Remove(todo);
        }

        public async Task<TodoItem?> GetTodoById(int id)
        {
            return await _context.TodoItems.FindAsync(id);
        }

        public async Task<IEnumerable<TodoItem>> GetTodoForUser(Guid userGuid)
        {
            return await _context.TodoItems.Include(t => t.Comments).Where(x => x.UserGuid == userGuid).ToListAsync();
        }

        public void UpdateTodo(TodoItem todo)
        {
           _context.TodoItems.Update(todo);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}