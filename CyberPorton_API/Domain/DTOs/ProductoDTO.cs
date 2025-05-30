namespace CyberPorton_API.Domain.DTOs
{
    public class ProductoDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public string ImagenUrl { get; set; } = string.Empty;
        public int CategoriaId { get; set; }
    }
}
