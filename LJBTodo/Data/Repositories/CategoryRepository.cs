using LJBTodo.Models;

namespace LJBTodo.Data.Repositories
{
    public class CategoryRepository: Repository<Category>
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
