
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
            return await _context.TaskSessions.Where(x => x.UserGuid == userGuid).ToListAsync();
        }

        public async Task AddTasksToSession(long taskSessionId, IEnumerable<long> taskIds)
        {
            var taskSession = await _context.TaskSessions.Include(x => x.TodoItems).FirstOrDefaultAsync(x => x.Id == taskSessionId);

            foreach (var id in taskIds)
            {
                var todo = new TodoItem { Id = id };
                _context.Attach(todo);
                taskSession.TodoItems.Add(todo);
            }

            await _context.SaveChangesAsync();
        }
    }
}