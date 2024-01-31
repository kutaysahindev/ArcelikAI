using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class BugFixedQuizTable : Migration
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
                    Pdfs_Urls = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiApplications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationSettings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LandingUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupportedFileTypes = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationSettings", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionID);
                });

            migrationBuilder.CreateTable(
                name: "Videos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BlobStorageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoDuration = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Videos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Choices",
                columns: table => new
                {
                    ChoiceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    ChoiceText = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Choices", x => x.ChoiceID);
                    table.ForeignKey(
                        name: "FK_Choices_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CorrectSorting",
                columns: table => new
                {
                    CorrectSortingID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    SortingOrder = table.Column<int>(type: "int", nullable: false),
                    SortingScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorrectSorting", x => x.CorrectSortingID);
                    table.ForeignKey(
                        name: "FK_CorrectSorting_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CorrectText",
                columns: table => new
                {
                    CorrectTextID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    CorrectTextAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorrectText", x => x.CorrectTextID);
                    table.ForeignKey(
                        name: "FK_CorrectText_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isWatchedAll = table.Column<bool>(type: "bit", nullable: false),
                    isTutorialDone = table.Column<bool>(type: "bit", nullable: false),
                    QuizPoint = table.Column<int>(type: "int", nullable: false),
                    WatchedVideoId = table.Column<int>(type: "int", nullable: false),
                    WatchedTimeInSeconds = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                    table.ForeignKey(
                        name: "FK_Users_Videos_WatchedVideoId",
                        column: x => x.WatchedVideoId,
                        principalTable: "Videos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                table: "ApplicationSettings",
                columns: new[] { "id", "LandingUrl", "SupportedFileTypes" },
                values: new object[] { 1, "Somelink will be here", "Pdf" });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionID", "QuestionText", "QuestionType" },
                values: new object[,]
                {
                    { 1, "What is the capital of France?", "MultipleChoice" },
                    { 2, "Which of the following are prime numbers?", "MultipleChoiceAndAnswers" },
                    { 3, "Is the sky blue?", "TrueFalse" },
                    { 4, "The complexity of bubble sort algorithm is _______ to the square of the number of elements.", "FillInTheBlank" },
                    { 5, "Arrange the following data structures in ascending order of their average time complexity for searching: Linked List, Binary Search Tree, Hash Table, Array", "Sorting" }
                });

            migrationBuilder.InsertData(
                table: "Videos",
                columns: new[] { "Id", "BlobStorageUrl", "Title", "VideoDuration" },
                values: new object[,]
                {
                    { 1, "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4", "Video 1", 5 },
                    { 2, "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4", "Video 2", 8 },
                    { 3, "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4", "Video 3", 10 }
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
                    { 10, "False", 3 },
                    { 11, "Linked List", 5 },
                    { 12, "Binary Search Tree", 5 },
                    { 13, "Hash Table", 5 },
                    { 14, "Binary Search", 5 }
                });

            migrationBuilder.InsertData(
                table: "CorrectSorting",
                columns: new[] { "CorrectSortingID", "QuestionID", "SortingOrder", "SortingScore" },
                values: new object[] { 1, 5, 14131112, 15 });

            migrationBuilder.InsertData(
                table: "CorrectText",
                columns: new[] { "CorrectTextID", "CorrectTextAnswer", "QuestionID", "TextScore" },
                values: new object[] { 1, "1", 4, 5 });

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
                name: "IX_Choices_QuestionID",
                table: "Choices",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_CorrectChoices_ChoiceID",
                table: "CorrectChoices",
                column: "ChoiceID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CorrectChoices_QuestionID",
                table: "CorrectChoices",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_CorrectSorting_QuestionID",
                table: "CorrectSorting",
                column: "QuestionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CorrectText_QuestionID",
                table: "CorrectText",
                column: "QuestionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_WatchedVideoId",
                table: "Users",
                column: "WatchedVideoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiApplications");

            migrationBuilder.DropTable(
                name: "ApplicationSettings");

            migrationBuilder.DropTable(
                name: "CorrectChoices");

            migrationBuilder.DropTable(
                name: "CorrectSorting");

            migrationBuilder.DropTable(
                name: "CorrectText");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Choices");

            migrationBuilder.DropTable(
                name: "Videos");

            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
