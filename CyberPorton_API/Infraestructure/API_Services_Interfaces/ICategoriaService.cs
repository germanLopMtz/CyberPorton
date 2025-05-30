using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;

namespace CyberPorton_API.Infraestructure.API_Services_Interfaces
{
    public interface ICategoriaService
    {
        Task<List<CategoriaOutputDTO>> GetAllAsync();
        Task<CategoriaOutputDTO?> GetByIdAsync(int id);
        Task<CategoriaOutputDTO> CreateAsync(CategoriaDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

