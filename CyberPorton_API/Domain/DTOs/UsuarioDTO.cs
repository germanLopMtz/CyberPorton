namespace CyberPorton_API.Domain.DTOs
{
    public class UsuarioDTO
    {
        public string NombreCompleto { get; set; } = string.Empty;
        public string CorreoElectronico { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
    }

}
