using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class new4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Options",
                table: "Options");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answers",
                table: "Answers");

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

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "QuestionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "QuestionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "QuestionId",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Option1",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "Option2",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "Option3",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "Option4",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "Answer1",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "Answer2",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "Answer3",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "Answer4",
                table: "Answers");

            migrationBuilder.RenameColumn(
                name: "Question",
                table: "Questions",
                newName: "QuestionType");

            migrationBuilder.AddColumn<string>(
                name: "QuestionText",
                table: "Questions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OptionId",
                table: "Options",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Option",
                table: "Options",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "AnswerId",
                table: "Answers",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Options",
                table: "Options",
                column: "OptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answers",
                table: "Answers",
                column: "AnswerId");

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "AnswerId", "Answer", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Paris", 1 },
                    { 2, "London", 1 }
                });

            migrationBuilder.InsertData(
                table: "Options",
                columns: new[] { "OptionId", "Option", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Paris", 1 },
                    { 2, "London", 1 },
                    { 3, "Berlin", 1 },
                    { 4, "Madrid", 1 }
                });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "QuestionText", "QuestionType" },
                values: new object[] { "What is the capital of France?", "Multiple Choice" });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "QuestionText", "QuestionType" },
                values: new object[] { "Who wrote 'Romeo and Juliet'?", "Multiple Choice" });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "QuestionText", "QuestionType" },
                values: new object[] { "What is the chemical symbol for water?", "Multiple Choice" });

            migrationBuilder.CreateIndex(
                name: "IX_Options_QuestionId",
                table: "Options",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Options",
                table: "Options");

            migrationBuilder.DropIndex(
                name: "IX_Options_QuestionId",
                table: "Options");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answers",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers");

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "AnswerId",
                keyColumnType: "int",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "AnswerId",
                keyColumnType: "int",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionId",
                keyColumnType: "int",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionId",
                keyColumnType: "int",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionId",
                keyColumnType: "int",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionId",
                keyColumnType: "int",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "QuestionText",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "OptionId",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "Option",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "Answer",
                table: "Answers");

            migrationBuilder.RenameColumn(
                name: "QuestionType",
                table: "Questions",
                newName: "Question");

            migrationBuilder.AddColumn<string>(
                name: "Option1",
                table: "Options",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option2",
                table: "Options",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option3",
                table: "Options",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Option4",
                table: "Options",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Answer1",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Answer2",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Answer3",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Answer4",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Options",
                table: "Options",
                column: "QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answers",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "QuestionId", "Answer1", "Answer2", "Answer3", "Answer4" },
                values: new object[,]
                {
                    { 1, "Paris", "London", null, null },
                    { 2, "William Shakespeare", null, null, null },
                    { 3, "H2O", "CO2", "O2", null }
                });

            migrationBuilder.InsertData(
                table: "Options",
                columns: new[] { "QuestionId", "Option1", "Option2", "Option3", "Option4" },
                values: new object[,]
                {
                    { 1, "Paris", "London", "Berlin", "Madrid" },
                    { 2, "William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain" },
                    { 3, "H2O", "CO2", "O2", "NaCl" }
                });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 1,
                column: "Question",
                value: "What is the capital of France?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 2,
                column: "Question",
                value: "Who wrote 'Romeo and Juliet'?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "id",
                keyValue: 3,
                column: "Question",
                value: "What is the chemical symbol for water?");
        }
    }
}
