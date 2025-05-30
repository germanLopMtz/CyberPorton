using CyberPorton_API.Domain.Enum;

namespace CyberPorton_API.Domain.OutPutDTO
{
    public class PagoOutputDTO
    {
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public MetodoPago MetodoPago { get; set; } = MetodoPago.None;
        public decimal Monto { get; set; }
        public DateTime FechaPago { get; set; }
    }
}
