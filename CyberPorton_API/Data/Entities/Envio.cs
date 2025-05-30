namespace CyberPorton_API.Data.Entities
{

    public class Envio
    {
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; } = null!;
        public string DireccionEnvio { get; set; } = string.Empty;
        public DateTime? FechaEntrega { get; set; }
    }
}
