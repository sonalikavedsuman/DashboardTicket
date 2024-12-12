using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketDashboardApi.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "ClientContents",
                newName: "ShortName");

            migrationBuilder.RenameColumn(
                name: "Details",
                table: "ClientContents",
                newName: "DetailName");

            migrationBuilder.AddColumn<int>(
                name: "ProjectNumber",
                table: "ProjectInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectNumber",
                table: "ProjectInfos");

            migrationBuilder.RenameColumn(
                name: "ShortName",
                table: "ClientContents",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "DetailName",
                table: "ClientContents",
                newName: "Details");
        }
    }
}
