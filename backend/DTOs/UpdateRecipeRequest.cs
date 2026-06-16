namespace nutriplan_server.DTOs;

public class UpdateRecipeRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int CookingTime { get; set; }
    public int Calories { get; set; }
    public double Protein { get; set; }
    public double Fat { get; set; }
    public double Carbs { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public List<string> Ingredients { get; set; } = new List<string>();
    public List<string> Steps { get; set; } = new List<string>();
}