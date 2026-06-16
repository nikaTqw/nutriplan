namespace nutriplan_server.DTOs;

public class AddDiaryEntryRequest
{
    public Guid UserId { get; set; }

    public Guid FoodId { get; set; }

    public double WeightInGrams { get; set; }

    public DateTime Date { get; set; }
}