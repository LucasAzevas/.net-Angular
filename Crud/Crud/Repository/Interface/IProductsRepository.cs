using Crud.Models;

namespace Crud.Repository.Interface
{
    public interface IProductsRepository
    {
        void InserirDados(ProductsModel obj);

        List<ProductsId> GetProducts();

        void DeleteItem(int obj);

        void UpdateProducts(UpdateModel obj);
    }
}
