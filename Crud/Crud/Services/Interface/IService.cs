using Crud.Models;

namespace Crud.Services.Interface
{
    public interface IService
    {
        void IncluirDados(ProductsModel obj);

        List<ProductsId> Products();

        void DeleteData(int obj);

        void UpdateItemDataBase(UpdateModel obj);
    }
}
