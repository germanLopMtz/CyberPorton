using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;

namespace CyberPorton_API.Infraestructure.API_Services_Interfaces
{
    public interface IPagoService
    {
        Task<PagoOutputDTO> CrearPagoAsync(PagoDTO dto);
        Task<List<PagoOutputDTO>> ObtenerPagosAsync();
        Task<PagoOutputDTO?> ObtenerPagoPorIdAsync(int id);
        Task<PagoOutputDTO?> ActualizarPagoAsync(int id, PagoDTO dto);
        Task<bool> EliminarPagoAsync(int id);
    }
}
