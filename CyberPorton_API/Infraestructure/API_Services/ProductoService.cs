using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.EntityFrameworkCore;


namespace CyberPorton_API.Infraestructure.API_Services
{
    public class ProductoService : IProductoService
    {
        private readonly ApplicationDBContext _context;

        public ProductoService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<ProductoOutputDTO>> GetAllAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Select(p => new ProductoOutputDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    Stock = p.Stock,
                    ImagenUrl = p.ImagenUrl,
                    CategoriaNombre = p.Categoria.Nombre
                })
                .ToListAsync();
        }

        public async Task<ProductoOutputDTO?> GetByIdAsync(int id)
        {
            var p = await _context.Productos
                .Include(p => p.Categoria)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null) return null;

            return new ProductoOutputDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock,
                ImagenUrl = p.ImagenUrl,
                CategoriaNombre = p.Categoria.Nombre
            };
        }

        public async Task<ProductoOutputDTO> CreateAsync(ProductoDTO dto)
        {
            var entity = new Producto
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Stock = dto.Stock,
                ImagenUrl = dto.ImagenUrl,
                CategoriaId = dto.CategoriaId
            };

            _context.Productos.Add(entity);
            await _context.SaveChangesAsync();

            var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);

            return new ProductoOutputDTO
            {
                Id = entity.Id,
                Nombre = entity.Nombre,
                Descripcion = entity.Descripcion,
                Precio = entity.Precio,
                Stock = entity.Stock,
                ImagenUrl = entity.ImagenUrl,
                CategoriaNombre = categoria?.Nombre ?? string.Empty
            };
        }

        public async Task<bool> UpdateAsync(int id, ProductoDTO dto)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return false;

            producto.Nombre = dto.Nombre;
            producto.Descripcion = dto.Descripcion;
            producto.Precio = dto.Precio;
            producto.Stock = dto.Stock;
            producto.ImagenUrl = dto.ImagenUrl;
            producto.CategoriaId = dto.CategoriaId;

            _context.Productos.Update(producto);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return false;

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ProductoOutputDTO>> GetByCategoriaAsync(int categoriaId)
        {
            var productos = await _context.Productos
                .Where(p => p.CategoriaId == categoriaId)
                .Include(p => p.Categoria)
                .ToListAsync();

            return productos.Select(p => new ProductoOutputDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock,
                ImagenUrl = p.ImagenUrl,
                CategoriaId = p.CategoriaId,
                CategoriaNombre = p.Categoria.Nombre
            }).ToList();

        }

    }
    }
