using CyberPorton_API.Domain.Enum;

namespace CyberPorton_API.Domain.DTOs
{
    public class PagoDTO
    {
        public int PedidoId { get; set; }
        public MetodoPago MetodoPago { get; set; } = MetodoPago.None; 
        public decimal Monto { get; set; }
    }
}
