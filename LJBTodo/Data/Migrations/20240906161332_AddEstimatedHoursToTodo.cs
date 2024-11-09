using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class AddEstimatedHoursToTodo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstimatedHours",
                table: "TodoItems",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedHours",
                table: "TodoItems");
        }
    }
}
