using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class RemoveTaskSessionsFromTodoItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskSessionTodoItem");

            migrationBuilder.AddColumn<long>(
                name: "TaskSessionId",
                table: "TodoItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_TaskSessionId",
                table: "TodoItems",
                column: "TaskSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_TaskSessions_TaskSessionId",
                table: "TodoItems",
                column: "TaskSessionId",
                principalTable: "TaskSessions",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_TaskSessions_TaskSessionId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_TaskSessionId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "TaskSessionId",
                table: "TodoItems");

            migrationBuilder.CreateTable(
                name: "TaskSessionTodoItem",
                columns: table => new
                {
                    TaskSessionsId = table.Column<long>(type: "bigint", nullable: false),
                    TodoItemsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskSessionTodoItem", x => new { x.TaskSessionsId, x.TodoItemsId });
                    table.ForeignKey(
                        name: "FK_TaskSessionTodoItem_TaskSessions_TaskSessionsId",
                        column: x => x.TaskSessionsId,
                        principalTable: "TaskSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskSessionTodoItem_TodoItems_TodoItemsId",
                        column: x => x.TodoItemsId,
                        principalTable: "TodoItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskSessionTodoItem_TodoItemsId",
                table: "TaskSessionTodoItem",
                column: "TodoItemsId");
        }
    }
}
