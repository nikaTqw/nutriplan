namespace nutriplan_server.Models;

public class FoodDiaryEntry
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid FoodId { get; set; }

    public DateTime Date { get; set; }

    public double WeightInGrams { get; set; }
}