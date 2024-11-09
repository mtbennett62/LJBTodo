using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LJBTodo.Data.Migrations
{
    public partial class UpdateRepeatTasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserGuid",
                table: "RepeatTaskTemplates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserGuid",
                table: "RepeatTaskTemplates");
        }
    }
}
