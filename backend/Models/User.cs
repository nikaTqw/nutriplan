namespace nutriplan_server.Models;

public class User
{
    public Guid Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public double Weight { get; set; }

    public double Height { get; set; }

    public int Age { get; set; }

    public string Goal { get; set; } = string.Empty;
}