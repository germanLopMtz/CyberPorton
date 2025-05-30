namespace CyberPorton_API.Domain.OutPutDTO
{
    public class PedidoOutputDTO
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; } 
        public DateTime FechaPedido { get; set; }
        public decimal Total { get; set; }
        public string Estado { get; set; } = null!;
        public List<DetallePedidoOutputDTO> Detalles { get; set; } = new();
    }


}
