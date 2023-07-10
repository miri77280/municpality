using Microsoft.AspNetCore.Mvc;

namespace Backend;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    private readonly ILogger<DataController> _logger;

    private static DateTime previousTime = DateTime.MinValue;
    public DataController(ILogger<DataController> logger, IConfiguration configuration)
    {
        _logger = logger;

    }

    [HttpPost]
    public IActionResult Post([FromBody] string email)
    {
        try
        {
            var currentTime = DateTime.Now;

            var diffInSeconds = (currentTime - previousTime).TotalSeconds;
            if (diffInSeconds < 3)
                return new JsonResult(StatusCode(429, new { currentTime = previousTime.ToString("HH:mm") }));

            previousTime = currentTime;
            return new JsonResult(Ok(new { email, currentTime = currentTime.ToString("HH:mm") }));
        }
        catch (Exception ex)
        {
            var err = new ApplicationException("An error occured in posting the data", ex);
            _logger.LogError("AAn error occured in posting the data", ex);
            throw err;
        }
    }


}
