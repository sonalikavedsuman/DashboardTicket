namespace TicketDashboardApi.Models
{
    public class DocumentEditor
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid PersonalInfoId { get; set; }
        public Guid ProjectInfoId { get; set; }
        public Guid ClientContentId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public PersonalInfo PersonalInfo { get; set; }
        public ProjectInfo ProjectInfo { get; set; }
        public ClientContent ClientContent { get; set; }
    }
}
