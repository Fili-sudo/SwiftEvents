using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwiftEvents.Data_Access.Migrations
{
    public partial class Removed_NoOfGuests_From_EventModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoOfGuests",
                table: "Events");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NoOfGuests",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
