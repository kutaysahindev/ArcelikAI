using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class Latest_migraitons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AiApplications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WelcomeMessage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SystemPrompt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SelectedModel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UseKnowledgebase = table.Column<bool>(type: "bit", nullable: false),
                    EnableUploadPdfFile = table.Column<bool>(type: "bit", nullable: false),
                    ConversationRetentionPeriod = table.Column<int>(type: "int", nullable: false),
                    ModalTemperature = table.Column<float>(type: "real", nullable: false),
                    Pdfs_Urls = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiApplications", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiApplications");
        }
    }
}
