using Microsoft.EntityFrameworkCore;
using nutriplan_server.Models;

namespace nutriplan_server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Food> Foods => Set<Food>();
    public DbSet<FoodDiaryEntry> FoodDiaryEntries => Set<FoodDiaryEntry>();
    public DbSet<Recipe> Recipes => Set<Recipe>();  // Добавить эту строку
}