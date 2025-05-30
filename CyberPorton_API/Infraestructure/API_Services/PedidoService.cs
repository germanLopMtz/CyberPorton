using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.Enum;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberPorton_API.Infraestructure.API_Services
{
    public class PedidoService : IPedidoService
    {
        private readonly ApplicationDBContext _context;

        public PedidoService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<PedidoOutputDTO> CrearPedidoAsync(PedidoDTO dto)
        {
            var usuario = await _context.Usuarios.FindAsync(dto.UsuarioId);
            if (usuario == null)
                throw new Exception("Usuario no encontrado.");

            var detalles = new List<DetallePedido>();

            foreach (var d in dto.Detalles)
            {
                var producto = await _context.Productos.FindAsync(d.ProductoId);
                if (producto == null)
                    throw new Exception($"Producto con ID {d.ProductoId} no encontrado.");

                detalles.Add(new DetallePedido
                {
                    ProductoId = d.ProductoId,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = producto.Precio,
                    Producto = producto
                });
            }

            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                FechaPedido = DateTime.UtcNow,
                Estado = EstadoPedido.Pendiente,
                Detalles = detalles
            };

            pedido.Total = pedido.Detalles.Sum(d => d.Cantidad * d.PrecioUnitario);

            try
            {
                _context.Pedidos.Add(pedido);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR: " + ex.InnerException?.Message);
                throw;
            }

            // Cargar productos para nombre y subtotal en salida
            await _context.Entry(pedido).Collection(p => p.Detalles).Query().Include(d => d.Producto).LoadAsync();

            return new PedidoOutputDTO
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                FechaPedido = pedido.FechaPedido,
                Estado = pedido.Estado.ToString(),
                Total = pedido.Total,
                Detalles = pedido.Detalles.Select(d => new DetallePedidoOutputDTO
                {
                    ProductoId = d.ProductoId,
                    NombreProducto = d.Producto.Nombre,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario,
                    Subtotal = d.Cantidad * d.PrecioUnitario
                }).ToList()
            };
        }


        public async Task<List<PedidoOutputDTO>> ObtenerPedidosAsync()
        {
            return await _context.Pedidos
                .Include(p => p.Detalles).ThenInclude(d => d.Producto)
                .Select(p => new PedidoOutputDTO
                {
                    Id = p.Id,
                    UsuarioId = p.UsuarioId,
                    FechaPedido = p.FechaPedido,
                    Estado = p.Estado.ToString(),
                    Total = p.Total,
                    Detalles = p.Detalles.Select(d => new DetallePedidoOutputDTO
                    {
                        ProductoId = d.ProductoId,
                        NombreProducto = d.Producto.Nombre,
                        Cantidad = d.Cantidad,
                        PrecioUnitario = d.PrecioUnitario,
                        Subtotal = d.Cantidad * d.PrecioUnitario
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<PedidoOutputDTO?> ObtenerPedidoPorIdAsync(int id)
        {
            var pedido = await _context.Pedidos
                .Include(p => p.Detalles)
                .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null) return null;

            return new PedidoOutputDTO
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                FechaPedido = pedido.FechaPedido,
                Estado = pedido.Estado.ToString(),
                Total = pedido.Total,
                Detalles = pedido.Detalles.Select(d => new DetallePedidoOutputDTO
                {
                    ProductoId = d.ProductoId,
                    NombreProducto = d.Producto.Nombre,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario,
                    Subtotal = d.Cantidad * d.PrecioUnitario
                }).ToList()
            };
        }
    }


}
