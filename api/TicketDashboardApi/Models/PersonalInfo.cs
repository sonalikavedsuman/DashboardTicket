using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketDashboardApi.Models
{
    [Table("Personal_Information")]
    public class PersonalInfo
    {
        [Key,Required]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation property
        [JsonIgnore]
        public ICollection<ProjectInfo> ProjectInfos { get; set; }
    }
}
