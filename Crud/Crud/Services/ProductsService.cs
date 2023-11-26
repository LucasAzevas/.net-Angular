using Crud.Models;
using Crud.Repository.Interface;
using Crud.Services.Interface;
using System.Linq.Expressions;

namespace Crud.Services
{
    public class ProductsService : IService
    {
        private readonly IProductsRepository repos;

      public ProductsService(IProductsRepository repos)
        {
            this.repos = repos;
        }

        public void DeleteData(int obj)
        {
            try
            {
                repos.DeleteItem(obj);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void IncluirDados(ProductsModel obj)
        {
            try
            {
                repos.InserirDados(obj);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
          
        }

        public List<ProductsId> Products()
        {
            try
            {
                return repos.GetProducts();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        void IService.UpdateItemDataBase(UpdateModel obj)
        {
            try
            {
                repos.UpdateProducts(obj);
            }
            catch (Exception ex)
            {

            }
        }
    }
    
}
