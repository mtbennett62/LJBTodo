using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class AddTaskSessions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskSessions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskSessions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

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
                name: "IX_TaskSessions_UserId",
                table: "TaskSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskSessionTodoItem_TodoItemsId",
                table: "TaskSessionTodoItem",
                column: "TodoItemsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskSessionTodoItem");

            migrationBuilder.DropTable(
                name: "TaskSessions");
        }
    }
}
