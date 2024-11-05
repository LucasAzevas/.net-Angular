using Crud.Models;

namespace Crud.Repository.Interface
{
    public interface IProductsRepository
    {

        void Register(string email, string passwaord, string role);
        ResponseLoginModel Users(string email);
        void InserirDados(ProductsModel obj);

        List<ProductsId> GetProducts();

        void DeleteItem(int obj);

        void UpdateProducts(UpdateModel obj);
    }
}
