using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberPorton_API.Infraestructure.API_Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ApplicationDBContext _context;

        public CategoriaService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategoriaOutputDTO>> GetAllAsync()
        {
            return await _context.Categorias
                .Select(c => new CategoriaOutputDTO
                {
                    Id = c.Id,
                    Nombre = c.Nombre
                }).ToListAsync();
        }

        public async Task<CategoriaOutputDTO?> GetByIdAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);

            if (categoria == null) return null;

            return new CategoriaOutputDTO
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre
            };
        }

        public async Task<CategoriaOutputDTO> CreateAsync(CategoriaDTO dto)
        {
            var categoria = new Categoria
            {
                Nombre = dto.Nombre
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return new CategoriaOutputDTO
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) return false;

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
