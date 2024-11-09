using System.Text.Json.Serialization;

namespace LJBTodo.Models
{
    //[JsonConverter(typeof(JsonStringEnumConverter))]
    //public enum Priority
    //{
    //    [JsonPropertyName("Low")]
    //    Low,
    //    [JsonPropertyName("Medium")]
    //    Medium,
    //    [JsonPropertyName("High")]
    //    High
    //}

    public class Priority
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ColourCode { get; set; }
        public int OrderPosition { get; set; }
    }
}
