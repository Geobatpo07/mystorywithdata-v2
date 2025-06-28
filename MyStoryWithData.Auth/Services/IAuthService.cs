using MyStoryWithData.Auth.Models;
using System.Threading.Tasks;

namespace MyStoryWithData.Auth.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterModel model);
        Task<AuthResponse> LoginAsync(LoginModel model);
    }
}
