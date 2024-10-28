
using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data.Repositories
{
    public class TaskSessionRepository : Repository<TaskSession>, ITaskSessionRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskSessionRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskSession>> GetTaskSessionsForUser(Guid userGuid)
        {
            return await _context.TaskSessions.Where(x => x.UserGuid == userGuid).Include(ts => ts.TodoItems).ToListAsync();
        }

        public async Task UpdateTasksForSession(long taskSessionId, IEnumerable<long> addedTaskIds, IEnumerable<long> removedTaskIds)
        {
            var taskSession = await _context.TaskSessions.Include(x => x.TodoItems).FirstOrDefaultAsync(x => x.Id == taskSessionId);

            foreach (var id in addedTaskIds)
            {
                var todo = new TodoItem { Id = id };
                _context.Attach(todo);
                taskSession.TodoItems.Add(todo);
            }

            foreach (var id in removedTaskIds)
            {
                var todo = new TodoItem { Id = id };
                _context.Attach(todo);
                taskSession.TodoItems.Remove(todo);
            }

            await _context.SaveChangesAsync();
        }
    }
}