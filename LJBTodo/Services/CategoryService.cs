using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models;
using LJBTodo.Services.Interfaces;

namespace LJBTodo.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;

        public CategoryService(IRepository<Category> repository)
        {
            _categoryRepository = repository;
        }

        public async Task<Category> CreateCategory(Category category)
        {
            return await _categoryRepository.CreateAsync(category);
        }

        public async Task DeleteCategory(long categoryId)
        {
            await _categoryRepository.DeleteAsync(categoryId);
        }

        public IEnumerable<Category> GetCategories()
        {
            return  _categoryRepository.GetAll();
        }

        public async Task<Category> GetCategoryById(long categoryId)
        {
            return await _categoryRepository.GetByIdAsync(categoryId);
        }

        public Category UpdateCategory(Category category)
        {
            return _categoryRepository.UpdateAsync(category);
        }
    }
}
