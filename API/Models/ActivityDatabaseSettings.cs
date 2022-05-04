namespace API.Models
{
    public class ActivityDatabaseSettings : IActivityDatabaseSettings
    {
        public string ActivitiesCollectionName { get; set; }
        public string ConnectionString { get; set ; }
        public string DatabaseName { get ; set ; }
    }

    public interface IActivityDatabaseSettings
    {
        string ActivitiesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}