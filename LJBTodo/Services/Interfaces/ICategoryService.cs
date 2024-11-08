using LJBTodo.Models;

namespace LJBTodo.Services.Interfaces
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();
        Task<Category> GetCategoryById(long categoryId);
        Task<Category> CreateCategory(Category category);
        Category UpdateCategory(Category category);
        Task DeleteCategory(long categoryId);

    }
}
