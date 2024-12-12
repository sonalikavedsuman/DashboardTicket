using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketDashboardApi.Migrations
{
    /// <inheritdoc />
    public partial class fourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectNumber",
                table: "ProjectInfos");

            migrationBuilder.RenameColumn(
                name: "ProjectNumber",
                table: "ClientContents",
                newName: "ClientProjectNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClientProjectNumber",
                table: "ClientContents",
                newName: "ProjectNumber");

            migrationBuilder.AddColumn<int>(
                name: "ProjectNumber",
                table: "ProjectInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
