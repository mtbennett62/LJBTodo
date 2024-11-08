using LJBTodo.Models;

namespace LJBTodo.Data.Repositories
{
    public class PriorityRepository: Repository<Priority>
    {
        public PriorityRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
