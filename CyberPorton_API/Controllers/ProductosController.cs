using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CyberPorton_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ProductosController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<List<ProductoOutputDTO>>> GetAll()
        {
            var productos = await _productoService.GetAllAsync();
            return Ok(productos);
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoOutputDTO>> GetById(int id)
        {
            var producto = await _productoService.GetByIdAsync(id);
            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        // POST: api/Productos
        [HttpPost]
        public async Task<ActionResult<ProductoOutputDTO>> Create([FromBody] ProductoDTO dto)
        {
            var creado = await _productoService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = creado.Id }, creado);
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductoDTO dto)
        {
            var actualizado = await _productoService.UpdateAsync(id, dto);
            if (!actualizado)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var eliminado = await _productoService.DeleteAsync(id);
            if (!eliminado)
                return NotFound();

            return NoContent();
        }
    }
}