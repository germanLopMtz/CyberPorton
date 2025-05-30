using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CyberPorton_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagosController : ControllerBase
    {
        private readonly IPagoService _pagoService;

        public PagosController(IPagoService pagoService)
        {
            _pagoService = pagoService;
        }

        [HttpPost]
        public async Task<IActionResult> CrearPago([FromBody] PagoDTO dto)
        {
            try
            {
                var result = await _pagoService.CrearPagoAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPagos()
        {
            var pagos = await _pagoService.ObtenerPagosAsync();
            return Ok(pagos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPagoPorId(int id)
        {
            var pago = await _pagoService.ObtenerPagoPorIdAsync(id);
            if (pago == null)
                return NotFound(new { mensaje = "Pago no encontrado." });

            return Ok(pago);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPago(int id, [FromBody] PagoDTO dto)
        {
            var result = await _pagoService.ActualizarPagoAsync(id, dto);
            if (result == null)
                return NotFound(new { mensaje = "Pago no encontrado para actualizar." });

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarPago(int id)
        {
            var success = await _pagoService.EliminarPagoAsync(id);
            if (!success)
                return NotFound(new { mensaje = "Pago no encontrado para eliminar." });

            return Ok(new { mensaje = "Pago eliminado correctamente." });
        }
    }
}

