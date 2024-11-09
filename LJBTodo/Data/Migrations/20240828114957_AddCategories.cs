using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class AddCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems");

            migrationBuilder.AlterColumn<int>(
                name: "PriorityId",
                table: "TodoItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "TodoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "TodoItems");

            migrationBuilder.AlterColumn<int>(
                name: "PriorityId",
                table: "TodoItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id");
        }
    }
}
