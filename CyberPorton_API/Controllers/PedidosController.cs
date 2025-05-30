using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CyberPorton_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidoService _pedidoService;

        public PedidosController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        // POST: api/pedidos
        [HttpPost]
        public async Task<IActionResult> CrearPedido([FromBody] PedidoDTO dto)
        {
            try
            {
                var result = await _pedidoService.CrearPedidoAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // GET: api/pedidos
        [HttpGet]
        public async Task<IActionResult> ObtenerPedidos()
        {
            var pedidos = await _pedidoService.ObtenerPedidosAsync();
            return Ok(pedidos);
        }


        // GET: api/pedidos/5
        [HttpGet("{usuarioId}/{id}")]
        public async Task<IActionResult> ObtenerPedidoPorId(int id)
        {
            var pedido = await _pedidoService.ObtenerPedidoPorIdAsync(id);
            if (pedido == null)
                return NotFound(new { mensaje = "Pedido no encontrado." });

            return Ok(pedido);
        }

        
    }
}
