using Crud.Models;
using Crud.Repository.Interface;
using Dapper;

namespace Crud.Repository
{
    public class ProductsRepository : SqlConnectionFactory, IProductsRepository
    {
        public void DeleteItem(int obj)
        {
            var delete = $"Delete from [Estudos].[dbo].[products] where Id = {obj}";
            
            Connection.Query<int>(delete).FirstOrDefault();
        }

        public List<ProductsId> GetProducts()
        {
            var productsData = "Select * from [Estudos].[dbo].[products]";

            return Connection.Query<ProductsId>(productsData).ToList();
        }

        public IdModel Id()
        {
            var selectId = "Select * from [Estudos].[dbo].[products] order BY [Id] desc";

            return Connection.Query<IdModel>(selectId).FirstOrDefault();
        }

        public void InserirDados(ProductsModel obj)
        {

            var insert = "INSERT INTO [Estudos].[dbo].[products](" +
                "Name," +
                "Category," +
                "Price," +
                "Quantity)" +
                "VALUES(" +
                $"'{obj.Name}'," +
                $"'{obj.Category}'," +
                $"{obj.Price}," +
                $"{obj.Quantity})";

            Connection.Execute(insert);
        }

        public void UpdateProducts(UpdateModel obj)
        {
            if (obj.Price == 0 && obj.Quantity != 0)
            {
                var updateQuantity = $"update [Estudos].[dbo].[products] set Quantity = {obj.Quantity} where Id = {obj.Id}";
                Connection.Execute(updateQuantity);
            }
            else if(obj.Quantity == 0 && obj.Price != 0)
            {
                var updatePrice = $"update [Estudos].[dbo].[products] set Price = {obj.Price} where Id = {obj.Id}";
                Connection.Execute(updatePrice);
            }
            else if(obj.Price != 0 && obj.Quantity != 0)
            {
                var update = $"update [Estudos].[dbo].[products] set Price = {obj.Price}, Quantity = {obj.Quantity} where Id = {obj.Id}";
                Connection.Execute(update);
            }
        }
    }
}
