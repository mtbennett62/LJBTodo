using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class AddPriorityTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "NewPriority",
                table: "Escalations");

            migrationBuilder.AddColumn<int>(
                name: "PriorityId",
                table: "TodoItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Escalated",
                table: "Escalations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "NewPriorityId",
                table: "Escalations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ColourCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderPosition = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_PriorityId",
                table: "TodoItems",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Escalations_NewPriorityId",
                table: "Escalations",
                column: "NewPriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Escalations_Priorities_NewPriorityId",
                table: "Escalations",
                column: "NewPriorityId",
                principalTable: "Priorities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Escalations_Priorities_NewPriorityId",
                table: "Escalations");

            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_Priorities_PriorityId",
                table: "TodoItems");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_PriorityId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_Escalations_NewPriorityId",
                table: "Escalations");

            migrationBuilder.DropColumn(
                name: "PriorityId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "Escalated",
                table: "Escalations");

            migrationBuilder.DropColumn(
                name: "NewPriorityId",
                table: "Escalations");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "TodoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NewPriority",
                table: "Escalations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
