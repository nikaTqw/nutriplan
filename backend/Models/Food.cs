namespace nutriplan_server.Models;

public class Food
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public double Calories { get; set; }

    public double Protein { get; set; }

    public double Fat { get; set; }

    public double Carbs { get; set; }
}