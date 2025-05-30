using Microsoft.AspNetCore.Mvc;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using CyberPorton_API.Domain.DTOs;


namespace CyberPorton_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categorias = await _categoriaService.GetAllAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var categoria = await _categoriaService.GetByIdAsync(id);
            if (categoria == null)
                return NotFound();
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoriaDTO dto)
        {
            var nuevaCategoria = await _categoriaService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = nuevaCategoria.Id }, nuevaCategoria);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var eliminado = await _categoriaService.DeleteAsync(id);
            if (!eliminado)
                return NotFound();

            return NoContent();
        }
    }
}

