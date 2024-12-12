using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketDashboardApi.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PersonalInfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectInfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    ProjectName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PersonalInfoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectInfos_PersonalInfos_PersonalInfoId",
                        column: x => x.PersonalInfoId,
                        principalTable: "PersonalInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientContents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Details = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProjectInfoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientContents_ProjectInfos_ProjectInfoId",
                        column: x => x.ProjectInfoId,
                        principalTable: "ProjectInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentEditors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    PersonalInfoId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProjectInfoId = table.Column<Guid>(type: "uuid", nullable: false),
                    ClientContentId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentEditors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentEditors_ClientContents_ClientContentId",
                        column: x => x.ClientContentId,
                        principalTable: "ClientContents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentEditors_PersonalInfos_PersonalInfoId",
                        column: x => x.PersonalInfoId,
                        principalTable: "PersonalInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentEditors_ProjectInfos_ProjectInfoId",
                        column: x => x.ProjectInfoId,
                        principalTable: "ProjectInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientContents_ProjectInfoId",
                table: "ClientContents",
                column: "ProjectInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentEditors_ClientContentId",
                table: "DocumentEditors",
                column: "ClientContentId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentEditors_PersonalInfoId",
                table: "DocumentEditors",
                column: "PersonalInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentEditors_ProjectInfoId",
                table: "DocumentEditors",
                column: "ProjectInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectInfos_PersonalInfoId",
                table: "ProjectInfos",
                column: "PersonalInfoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentEditors");

            migrationBuilder.DropTable(
                name: "ClientContents");

            migrationBuilder.DropTable(
                name: "ProjectInfos");

            migrationBuilder.DropTable(
                name: "PersonalInfos");
        }
    }
}
