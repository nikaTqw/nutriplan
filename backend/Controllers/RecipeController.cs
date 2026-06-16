using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nutriplan_server.Data;
using nutriplan_server.DTOs;
using nutriplan_server.Models;
using System.Security.Claims;

namespace nutriplan_server.Controllers;

[ApiController]
[Route("api/recipes")]
[Authorize]
public class RecipeController : ControllerBase
{
    private readonly AppDbContext _db;

    public RecipeController(AppDbContext db)
    {
        _db = db;
    }

    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            throw new UnauthorizedAccessException();
        return Guid.Parse(userIdClaim.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var recipes = await _db.Recipes.ToListAsync();
        return Ok(recipes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var recipe = await _db.Recipes.FirstOrDefaultAsync(r => r.Id == id);
        if (recipe == null)
            return NotFound(new { message = "Рецепт не найден" });

        return Ok(recipe);
    }

    [HttpGet("user/my")]
    public async Task<IActionResult> GetMyRecipes()
    {
        var userId = GetCurrentUserId();
        var recipes = await _db.Recipes.Where(r => r.UserId == userId).ToListAsync();
        return Ok(recipes);
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var recipes = await _db.Recipes
            .Where(r => r.Category.ToLower() == category.ToLower())
            .ToListAsync();
        return Ok(recipes);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRecipeRequest request)
    {
        var userId = GetCurrentUserId();

        var recipe = new Recipe
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            CookingTime = request.CookingTime,
            Calories = request.Calories,
            Protein = request.Protein,
            Fat = request.Fat,
            Carbs = request.Carbs,
            ImageUrl = request.ImageUrl,
            Category = request.Category,
            Ingredients = request.Ingredients,
            Steps = request.Steps,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Recipes.Add(recipe);
        await _db.SaveChangesAsync();

        return Ok(recipe);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateRecipeRequest request)
    {
        var userId = GetCurrentUserId();
        var recipe = await _db.Recipes.FirstOrDefaultAsync(r => r.Id == id);

        if (recipe == null)
            return NotFound(new { message = "Рецепт не найден" });

        if (recipe.UserId != userId)
            return Forbid();

        recipe.Name = request.Name;
        recipe.Description = request.Description;
        recipe.CookingTime = request.CookingTime;
        recipe.Calories = request.Calories;
        recipe.Protein = request.Protein;
        recipe.Fat = request.Fat;
        recipe.Carbs = request.Carbs;
        recipe.ImageUrl = request.ImageUrl;
        recipe.Category = request.Category;
        recipe.Ingredients = request.Ingredients;
        recipe.Steps = request.Steps;

        await _db.SaveChangesAsync();

        return Ok(recipe);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetCurrentUserId();
        var recipe = await _db.Recipes.FirstOrDefaultAsync(r => r.Id == id);

        if (recipe == null)
            return NotFound(new { message = "Рецепт не найден" });

        if (recipe.UserId != userId)
            return Forbid();

        _db.Recipes.Remove(recipe);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Рецепт удален" });
    }
}