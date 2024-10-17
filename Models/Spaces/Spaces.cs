namespace LJBTodo.Models.Spaces
{
    public class Space
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int? ParentSpaceId { get; set; }

        public virtual ICollection<Space> SubSpaces { get; set; }
    }
}
