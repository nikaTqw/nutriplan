using Microsoft.AspNetCore.Mvc;
using nutriplan_server.Data;
using nutriplan_server.Models;

namespace nutriplan_server.Controllers;

[ApiController]
[Route("api/food")]
public class FoodController : ControllerBase
{
    private readonly AppDbContext _db;

    public FoodController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("seed")]
    public async Task<IActionResult> Seed()
    {
        if (_db.Foods.Any())
            return Ok("Продукты уже добавлены");

        var foods = new List<Food>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Куриная грудка",
                Calories = 165,
                Protein = 31,
                Fat = 3.6,
                Carbs = 0
            },

            new()
            {
                Id = Guid.NewGuid(),
                Name = "Рис",
                Calories = 130,
                Protein = 2.7,
                Fat = 0.3,
                Carbs = 28
            },

            new()
            {
                Id = Guid.NewGuid(),
                Name = "Яйцо",
                Calories = 155,
                Protein = 13,
                Fat = 11,
                Carbs = 1
            },

            new()
            {
                Id = Guid.NewGuid(),
                Name = "Овсянка",
                Calories = 352,
                Protein = 12,
                Fat = 6,
                Carbs = 61
            }
        };

        _db.Foods.AddRange(foods);

        await _db.SaveChangesAsync();

        return Ok("Продукты добавлены");
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_db.Foods.ToList());
    }
}