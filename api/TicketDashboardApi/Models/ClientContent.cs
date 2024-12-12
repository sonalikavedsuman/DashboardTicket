namespace TicketDashboardApi.Models
{
    public class ClientContent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string ShortName { get; set; }
        public string DetailName { get; set; }
        public string ClientProjectNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public Guid ProjectInfoId { get; set; }
        public ProjectInfo ProjectInfo { get; set; }
    }
}
