using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class new3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "Questions");

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "QuestionId", "Answer1", "Answer2", "Answer3", "Answer4" },
                values: new object[,]
                {
                    { 1, "Paris", "London", null, null },
                    { 2, "William Shakespeare", null, null, null },
                    { 3, "H2O", "CO2", "O2", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "QuestionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "QuestionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "QuestionId",
                keyValue: 3);

            migrationBuilder.AddColumn<int>(
                name: "Answer",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 1,
                column: "Answer",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 2,
                column: "Answer",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 3,
                column: "Answer",
                value: 2);
        }
    }
}
