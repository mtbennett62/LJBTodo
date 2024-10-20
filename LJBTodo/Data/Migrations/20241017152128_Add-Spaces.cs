using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class AddSpaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "RepeatTaskId",
                table: "TodoItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RepeatTaskTemplateId",
                table: "TodoItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RepeatTaskTemplateId",
                table: "Escalations",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RepeatTaskTemplateId",
                table: "Comments",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RepeatTaskTemplateId",
                table: "AspNetUsers",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RepeatTaskTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Frequency = table.Column<int>(type: "int", nullable: false),
                    MostRecentCompletion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomFrequencyDays = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    EstimatedHours = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepeatTaskTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepeatTaskTemplates_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RepeatTaskTemplates_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Spaces",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentSpaceId = table.Column<int>(type: "int", nullable: true),
                    SpaceId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spaces_Spaces_SpaceId",
                        column: x => x.SpaceId,
                        principalTable: "Spaces",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tools",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpaceId = table.Column<int>(type: "int", nullable: true),
                    SpaceId1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tools", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tools_Spaces_SpaceId1",
                        column: x => x.SpaceId1,
                        principalTable: "Spaces",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_RepeatTaskTemplateId",
                table: "TodoItems",
                column: "RepeatTaskTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Escalations_RepeatTaskTemplateId",
                table: "Escalations",
                column: "RepeatTaskTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_RepeatTaskTemplateId",
                table: "Comments",
                column: "RepeatTaskTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RepeatTaskTemplateId",
                table: "AspNetUsers",
                column: "RepeatTaskTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_RepeatTaskTemplates_CategoryId",
                table: "RepeatTaskTemplates",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_RepeatTaskTemplates_PriorityId",
                table: "RepeatTaskTemplates",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Spaces_SpaceId",
                table: "Spaces",
                column: "SpaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Tools_SpaceId1",
                table: "Tools",
                column: "SpaceId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "AspNetUsers",
                column: "RepeatTaskTemplateId",
                principalTable: "RepeatTaskTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "Comments",
                column: "RepeatTaskTemplateId",
                principalTable: "RepeatTaskTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Escalations_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "Escalations",
                column: "RepeatTaskTemplateId",
                principalTable: "RepeatTaskTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "TodoItems",
                column: "RepeatTaskTemplateId",
                principalTable: "RepeatTaskTemplates",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Escalations_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "Escalations");

            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_RepeatTaskTemplates_RepeatTaskTemplateId",
                table: "TodoItems");

            migrationBuilder.DropTable(
                name: "RepeatTaskTemplates");

            migrationBuilder.DropTable(
                name: "Tools");

            migrationBuilder.DropTable(
                name: "Spaces");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_RepeatTaskTemplateId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_Escalations_RepeatTaskTemplateId",
                table: "Escalations");

            migrationBuilder.DropIndex(
                name: "IX_Comments_RepeatTaskTemplateId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RepeatTaskTemplateId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RepeatTaskId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "RepeatTaskTemplateId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "RepeatTaskTemplateId",
                table: "Escalations");

            migrationBuilder.DropColumn(
                name: "RepeatTaskTemplateId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "RepeatTaskTemplateId",
                table: "AspNetUsers");
        }
    }
}
