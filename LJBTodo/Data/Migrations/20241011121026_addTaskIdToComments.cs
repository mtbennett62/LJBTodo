using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class addTaskIdToComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TodoItems_TodoItemId",
                table: "Comments");

            migrationBuilder.AlterColumn<long>(
                name: "TodoItemId",
                table: "Comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TodoItems_TodoItemId",
                table: "Comments",
                column: "TodoItemId",
                principalTable: "TodoItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TodoItems_TodoItemId",
                table: "Comments");

            migrationBuilder.AlterColumn<long>(
                name: "TodoItemId",
                table: "Comments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TodoItems_TodoItemId",
                table: "Comments",
                column: "TodoItemId",
                principalTable: "TodoItems",
                principalColumn: "Id");
        }
    }
}
