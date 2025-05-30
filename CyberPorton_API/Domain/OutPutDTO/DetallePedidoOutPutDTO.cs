namespace CyberPorton_API.Domain.OutPutDTO
{
    public class DetallePedidoOutputDTO
    {
        public string NombreProducto { get; set; } = string.Empty;
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }

    }

}
