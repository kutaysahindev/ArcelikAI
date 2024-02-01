using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcelikWebApi.Migrations
{
    /// <inheritdoc />
    public partial class newvideoadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Videos",
                columns: new[] { "Id", "BlobStorageUrl", "Title", "VideoDuration" },
                values: new object[] { 4, "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4", "Video 4", 11 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
