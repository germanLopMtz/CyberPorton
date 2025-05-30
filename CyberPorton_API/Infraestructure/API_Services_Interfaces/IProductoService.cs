using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;

namespace CyberPorton_API.Infraestructure.API_Services_Interfaces
{
    public interface IProductoService
    {
        Task<List<ProductoOutputDTO>> GetAllAsync();
        Task<ProductoOutputDTO?> GetByIdAsync(int id);
        Task<ProductoOutputDTO> CreateAsync(ProductoDTO dto);
        Task<bool> UpdateAsync(int id, ProductoDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
