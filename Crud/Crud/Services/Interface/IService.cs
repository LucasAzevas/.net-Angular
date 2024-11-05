using Crud.Models;

namespace Crud.Services.Interface
{
    public interface IService
    {

        bool VerifyPassword(string plainPassword, string hashedPassword);

        void Register(string email, string password, string role);

        ResponseLoginModel Users(string email);

        string GenerateToken(string username, string role);

        void IncluirDados(ProductsModel obj);

        List<ProductsId> Products();

        void DeleteData(int obj);

        void UpdateItemDataBase(UpdateModel obj);
    }
}
