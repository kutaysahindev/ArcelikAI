using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class ThreeQuestions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.CreateTable(
                name: "CorrectChoices",
                columns: table => new
                {
                    CorrectChoiceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    ChoiceID = table.Column<int>(type: "int", nullable: false),
                    PartialScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorrectChoices", x => x.CorrectChoiceID);
                    table.ForeignKey(
                        name: "FK_CorrectChoices_Choices_ChoiceID",
                        column: x => x.ChoiceID,
                        principalTable: "Choices",
                        principalColumn: "ChoiceID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CorrectChoices_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionID", "QuestionText", "QuestionType" },
                values: new object[,]
                {
                    { 1, "What is the capital of France?", "MultipleChoice" },
                    { 2, "Which of the following are prime numbers?", "MultipleChoiceAndAnswers" },
                    { 3, "Is the sky blue?", "TrueFalse" }
                });

            migrationBuilder.InsertData(
                table: "Choices",
                columns: new[] { "ChoiceID", "ChoiceText", "QuestionID" },
                values: new object[,]
                {
                    { 1, "Berlin", 1 },
                    { 2, "Paris", 1 },
                    { 3, "London", 1 },
                    { 4, "Madrid", 1 },
                    { 5, "2", 2 },
                    { 6, "5", 2 },
                    { 7, "8", 2 },
                    { 8, "11", 2 },
                    { 9, "True", 3 },
                    { 10, "False", 3 }
                });

            migrationBuilder.InsertData(
                table: "CorrectChoices",
                columns: new[] { "CorrectChoiceID", "ChoiceID", "PartialScore", "QuestionID" },
                values: new object[,]
                {
                    { 1, 2, 10, 1 },
                    { 2, 5, 1, 2 },
                    { 3, 6, 1, 2 },
                    { 4, 8, 1, 2 },
                    { 5, 9, 10, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CorrectChoices_ChoiceID",
                table: "CorrectChoices",
                column: "ChoiceID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CorrectChoices_QuestionID",
                table: "CorrectChoices",
                column: "QuestionID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CorrectChoices");

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Choices",
                keyColumn: "ChoiceID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "QuestionID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "QuestionID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "QuestionID",
                keyValue: 3);

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    AnswerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChoiceID = table.Column<int>(type: "int", nullable: false),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    PartialScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.AnswerID);
                    table.ForeignKey(
                        name: "FK_Answers_Choices_ChoiceID",
                        column: x => x.ChoiceID,
                        principalTable: "Choices",
                        principalColumn: "ChoiceID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ChoiceID",
                table: "Answers",
                column: "ChoiceID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionID",
                table: "Answers",
                column: "QuestionID");
        }
    }
}
