using CyberPorton_API.Domain.Enum;

namespace CyberPorton_API.Data.Entities
{

    public class Pago
    {
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; } = null!;
        public DateTime FechaPago { get; set; } = DateTime.UtcNow;
        public MetodoPago MetodoPago { get; set; } = MetodoPago.None;
        public decimal Monto { get; set; }
    }
}
