using Azure;
using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;

namespace CyberPorton_API.Infraestructure.API_Services_Interfaces
{
    public interface IPedidoService
    {
        Task<PedidoOutputDTO> CrearPedidoAsync(PedidoDTO dto);
        Task<List<PedidoOutputDTO>> ObtenerPedidosAsync();
        Task<PedidoOutputDTO?> ObtenerPedidoPorIdAsync(int id);
    }


}