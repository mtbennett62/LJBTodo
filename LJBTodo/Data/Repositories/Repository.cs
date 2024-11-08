using LJBTodo.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationDbContext _context;
        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TEntity> CreateAsync(TEntity entity, bool? saveChanges = null)
        {
            await _context.Set<TEntity>().AddAsync(entity);
            if(saveChanges == true)
            {
                await SaveAsync();
            }
            return entity;
        }

        public async Task DeleteAsync(long id, bool? saveChanges = null)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null) return;
            _context.Set<TEntity>().Remove(entity);
            if (saveChanges == true)
            {
                await SaveAsync();
            }
        }

        public async Task<TEntity> GetByIdAsync(long id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public TEntity UpdateAsync(TEntity entity, bool? saveChanges = null)
        {
            _context.Set<TEntity>().Update(entity);
            if (saveChanges == true)
            {
                _context.SaveChanges();
            }
            return entity;
        }

        public IEnumerable<TEntity> GetAll()
        {
            return  _context.Set<TEntity>().AsNoTracking();
        }

        public async Task<IEnumerable<TEntity>> GetAllWithPredicateAsync(Predicate<TEntity> predicate)
        {
            return await _context.Set<TEntity>().Where(x => predicate(x)).ToListAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }


    }
}
