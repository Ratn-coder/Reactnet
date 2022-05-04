using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using MongoDB.Driver;

public class ActivityService
{
    private readonly IMongoCollection<Activity> _config;

    public ActivityService(IActivityDatabaseSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _config = database.GetCollection<Activity>(settings.ActivitiesCollectionName);
    }

    public async Task<List<Activity>> GetAllAsync()
    {
        return await _config.Find(s => true).ToListAsync();
    }

    public async Task<Activity> GetByIdAsync(string id)
    {
        return await _config.Find<Activity>(s => s.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Activity> CreateAsync(Activity activity)
    {
        await _config.InsertOneAsync(activity);
        return activity;
    }

    public async Task UpdateAsync(string id, Activity activity)
    {
        await _config.ReplaceOneAsync(s => s.Id == id, activity);
    }

    public async Task DeleteAsync(string id)
    {
        await _config.DeleteOneAsync(s => s.Id == id);
    }
}