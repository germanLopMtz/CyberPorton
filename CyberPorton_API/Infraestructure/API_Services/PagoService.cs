using CyberPorton_API.Data.DataDB;
using CyberPorton_API.Data.Entities;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;
using CyberPorton_API.Infraestructure.API_Services_Interfaces;
using Microsoft.EntityFrameworkCore;


namespace CyberPorton_API.Infraestructure.API_Services
{
    public class PagoService : IPagoService
    {
        private readonly ApplicationDBContext _context;

        public PagoService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<PagoOutputDTO> CrearPagoAsync(PagoDTO dto)
        {
            var pedido = await _context.Pedidos.FindAsync(dto.PedidoId);
            if (pedido == null)
                throw new Exception("Pedido no encontrado.");

            var pago = new Pago
            {
                PedidoId = dto.PedidoId,
                MetodoPago = dto.MetodoPago,
                Monto = dto.Monto,
                FechaPago = DateTime.UtcNow
            };

            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            return MapToOutput(pago);
        }

        public async Task<List<PagoOutputDTO>> ObtenerPagosAsync()
        {
            var pagos = await _context.Pagos.ToListAsync();
            return pagos.Select(MapToOutput).ToList();
        }

        public async Task<PagoOutputDTO?> ObtenerPagoPorIdAsync(int id)
        {
            var pago = await _context.Pagos.FirstOrDefaultAsync(p => p.Id == id);
            if (pago == null) return null;

            return MapToOutput(pago);
        }

        public async Task<PagoOutputDTO?> ActualizarPagoAsync(int id, PagoDTO dto)
        {
            var pago = await _context.Pagos.FindAsync(id);
            if (pago == null) return null;

            pago.MetodoPago = dto.MetodoPago;
            pago.Monto = dto.Monto;
            pago.FechaPago = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToOutput(pago);
        }

        public async Task<bool> EliminarPagoAsync(int id)
        {
            var pago = await _context.Pagos.FindAsync(id);
            if (pago == null) return false;

            _context.Pagos.Remove(pago);
            await _context.SaveChangesAsync();
            return true;
        }

        private static PagoOutputDTO MapToOutput(Pago pago) => new PagoOutputDTO
        {
            Id = pago.Id,
            PedidoId = pago.PedidoId,
            MetodoPago = pago.MetodoPago,
            Monto = pago.Monto,
            FechaPago = pago.FechaPago
        };
    }
}
