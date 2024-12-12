using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketDashboardApi.Models
{
    public class ProjectInfo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string ProjectName { get; set; }
        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public Guid PersonalInfoId { get; set; } 

        [JsonIgnore]
        public PersonalInfo PersonalInfo { get; set; }

        // Navigation property
        [JsonIgnore]
        public ICollection<ClientContent> ClientContents { get; set; }
    }
}
