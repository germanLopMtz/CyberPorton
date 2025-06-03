using Microsoft.AspNetCore.Mvc;
using CyberPorton_API.Data.DataDB;

namespace CyberPorton_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestDbController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public TestDbController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                // Intenta acceder a la base de datos
                var canConnect = _context.Database.CanConnect();
                return Ok(new { success = canConnect });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }
    }
}