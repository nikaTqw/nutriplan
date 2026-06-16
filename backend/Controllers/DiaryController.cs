using Microsoft.AspNetCore.Mvc;
using nutriplan_server.Data;
using nutriplan_server.DTOs;
using nutriplan_server.Models;

namespace nutriplan_server.Controllers;

[ApiController]
[Route("api/diary")]
public class DiaryController : ControllerBase
{
    private readonly AppDbContext _db;

    public DiaryController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> Add(AddDiaryEntryRequest request)
    {
        var entry = new FoodDiaryEntry
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            FoodId = request.FoodId,
            WeightInGrams = request.WeightInGrams,
            Date = request.Date
        };

        _db.FoodDiaryEntries.Add(entry);

        await _db.SaveChangesAsync();

        return Ok("Запись добавлена");
    }

    [HttpGet("day")]
    public IActionResult GetDay(Guid userId, DateTime date)
    {
        try
        {
            Console.WriteLine($"UserId: {userId}, Date: {date}"); // Добавьте для отладки

            var entries = _db.FoodDiaryEntries
                .Where(x => x.UserId == userId && x.Date.Date == date.Date)
                .ToList();

            Console.WriteLine($"Найдено записей: {entries.Count}"); // Добавьте для отладки

            double calories = 0;
            double protein = 0;
            double fat = 0;
            double carbs = 0;

            foreach (var entry in entries)
            {
                var food = _db.Foods.FirstOrDefault(f => f.Id == entry.FoodId);

                if (food == null)
                    continue;

                calories += food.Calories * entry.WeightInGrams / 100;
                protein += food.Protein * entry.WeightInGrams / 100;
                fat += food.Fat * entry.WeightInGrams / 100;
                carbs += food.Carbs * entry.WeightInGrams / 100;
            }

            return Ok(new
            {
                Calories = Math.Round(calories, 1),
                Protein = Math.Round(protein, 1),
                Fat = Math.Round(fat, 1),
                Carbs = Math.Round(carbs, 1)
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ошибка: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            return StatusCode(500, new { message = ex.Message });
        }
    }
}