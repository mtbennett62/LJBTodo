using System.Text.Json.Serialization;

namespace LJBTodo.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Frequency
    {
        Daily,
        Weekly,
        Monthly,
        Yearly,
        AdHoc,
        Custom
    }
}
