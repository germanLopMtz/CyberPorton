using CyberPorton_API.Domain.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace CyberPorton_API.Data.Entities
{

    public class Pedido
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
        public DateTime FechaPedido { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }
        public EstadoPedido Estado { get; set; } = EstadoPedido.Pendiente;

        public ICollection<DetallePedido> Detalles { get; set; } = new List<DetallePedido>();
        public Pago? Pago { get; set; }
        public Envio? Envio { get; set; }
    }
}
