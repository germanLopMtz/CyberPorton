using CyberPorton_API.Data;
using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberPorton_API.Infraestructure.API_Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ApplicationDBContext _context;

        public UsuarioService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<UsuarioOutputDTO> CreateAsync(UsuarioDTO dto)
        {
            var entity = new Usuario
            {
                NombreCompleto = dto.NombreCompleto,
                CorreoElectronico = dto.CorreoElectronico,
                Contrasena = dto.Contrasena,
                Direccion = dto.Direccion,
                Telefono = dto.Telefono
            };

            _context.Usuarios.Add(entity);
            await _context.SaveChangesAsync();

            return new UsuarioOutputDTO
            {
                Id = entity.Id,
                NombreCompleto = entity.NombreCompleto,
                CorreoElectronico = entity.CorreoElectronico,
                Direccion = entity.Direccion,
                Telefono = entity.Telefono
            };
        }

        public async Task<UsuarioOutputDTO?> GetByIdAsync(int id)
        {
            var entity = await _context.Usuarios.FindAsync(id);
            if (entity == null) return null;

            return new UsuarioOutputDTO
            {
                Id = entity.Id,
                NombreCompleto = entity.NombreCompleto,
                CorreoElectronico = entity.CorreoElectronico,
                Direccion = entity.Direccion,
                Telefono = entity.Telefono
            };
        }

        public async Task<List<UsuarioOutputDTO>> GetAllAsync()
        {
            var usuarios = await _context.Usuarios.ToListAsync();

            return usuarios.Select(u => new UsuarioOutputDTO
            {
                Id = u.Id,
                NombreCompleto = u.NombreCompleto,
                CorreoElectronico = u.CorreoElectronico,
                Direccion = u.Direccion,
                Telefono = u.Telefono
            }).ToList();
        }

        public async Task<UsuarioOutputDTO?> UpdateAsync(int id, UsuarioDTO dto)
        {
            var entity = await _context.Usuarios.FindAsync(id);
            if (entity == null) return null;

            entity.NombreCompleto = dto.NombreCompleto;
            entity.CorreoElectronico = dto.CorreoElectronico;
            entity.Contrasena = dto.Contrasena;
            entity.Direccion = dto.Direccion;
            entity.Telefono = dto.Telefono;

            await _context.SaveChangesAsync();

            return new UsuarioOutputDTO
            {
                Id = entity.Id,
                NombreCompleto = entity.NombreCompleto,
                CorreoElectronico = entity.CorreoElectronico,
                Direccion = entity.Direccion,
                Telefono = entity.Telefono
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Usuarios.FindAsync(id);
            if (entity == null) return false;

            _context.Usuarios.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UsuarioOutputDTO?> LoginAsync(LoginDTO dto)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.CorreoElectronico == dto.CorreoElectronico
                                       && u.Contrasena == dto.Contrasena);

            if (usuario == null) return null;

            return new UsuarioOutputDTO
            {
                Id = usuario.Id,
                NombreCompleto = usuario.NombreCompleto,
                CorreoElectronico = usuario.CorreoElectronico,
                Direccion = usuario.Direccion,
                Telefono = usuario.Telefono
            };
        }

    }
}
