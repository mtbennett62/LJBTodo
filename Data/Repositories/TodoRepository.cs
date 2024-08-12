
using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models;

namespace LJBTodo.Data.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void AddTodo(TodoItem todo)
        {
            _context.TodoItems.Add(todo);
        }

        public void DeleteTodo(int id)
        {
            var todo = GetTodoById(id);
            if (todo == null) return;
            _context.TodoItems.Remove(todo);
        }

        public TodoItem? GetTodoById(int id)
        {
           return _context.TodoItems.Find(id);
        }

        public IEnumerable<TodoItem> GetTodoForUser(Guid userGuid)
        {
            return _context.TodoItems.Where(x => x.UserGuid == userGuid).ToList();
        }

        public void UpdateTodo(TodoItem todo)
        {
            _context.TodoItems.Update(todo);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}