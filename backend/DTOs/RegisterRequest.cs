namespace nutriplan_server.DTOs;

public class RegisterRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public double Weight { get; set; }
    public double Height { get; set; }
    public int Age { get; set; }
    public string Goal { get; set; } = string.Empty;
}