namespace LJBTodo.Models.Spaces
{
    public class Tool
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;

        public int? SpaceId { get; set; }

        public virtual Space Space { get; set; }
    }
}
