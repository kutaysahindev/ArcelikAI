using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class QuizMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropColumn(
                name: "testest",
                table: "AiApplications");

            migrationBuilder.AddColumn<int>(
                name: "quizPoint",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "secondsSpendOnQuiz",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Quizzes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Point = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzes", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Quizzes");

            migrationBuilder.DropColumn(
                name: "quizPoint",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "secondsSpendOnQuiz",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "testest",
                table: "AiApplications",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
