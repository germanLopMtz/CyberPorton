namespace CyberPorton_API.Domain.DTOs
{
    public class PedidoDTO
    {
        public int UsuarioId { get; set; }
        public List<DetallePedidoDTO> Detalles { get; set; } = new();
    }

}
