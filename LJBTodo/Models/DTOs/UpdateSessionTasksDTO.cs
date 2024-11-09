namespace LJBTodo.Models.DTOs
{
    public class UpdateSessionTasksDTO
    {
        public long TaskSessionId { get; set; }
        public IEnumerable<long> AddedTaskIds { get; set; }
        public IEnumerable<long> RemovedTaskIds { get; set; }
    }
}
