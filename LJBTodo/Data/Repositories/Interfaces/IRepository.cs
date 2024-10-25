namespace LJBTodo.Data.Repositories.Interfaces
{
    public interface IRepository<TEntity>
    {
        Task<TEntity> CreateAsync(TEntity entity, bool? saveChanges = null);

        TEntity UpdateAsync(TEntity entity, bool? saveChanges = null);
        Task DeleteAsync(long id, bool? saveChanges = null);
        Task<TEntity> GetByIdAsync(long id);
        Task SaveAsync();

    }
}
