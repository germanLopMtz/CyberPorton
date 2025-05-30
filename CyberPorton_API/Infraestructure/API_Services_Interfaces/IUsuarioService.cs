using CyberPorton_API.Domain.DTOs;
using CyberPorton_API.Domain.OutPutDTO;

namespace CyberPorton_API.Infraestructure.API_Services_Interfaces
{
    public interface IUsuarioService
    {
        Task<UsuarioOutputDTO> CreateAsync(UsuarioDTO dto);
        Task<UsuarioOutputDTO?> GetByIdAsync(int id); 
        Task<List<UsuarioOutputDTO>> GetAllAsync();
        Task<UsuarioOutputDTO?> UpdateAsync(int id, UsuarioDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<UsuarioOutputDTO?> LoginAsync(LoginDTO dto);
    }
}
