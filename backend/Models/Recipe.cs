namespace nutriplan_server.Models;

public class Recipe
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int CookingTime { get; set; } // в минутах
    public int Calories { get; set; }
    public double Protein { get; set; }
    public double Fat { get; set; }
    public double Carbs { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // Завтрак, Обед, Ужин и т.д.
    public List<string> Ingredients { get; set; } = new List<string>();
    public List<string> Steps { get; set; } = new List<string>();
    public Guid UserId { get; set; } // кто создал рецепт
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}