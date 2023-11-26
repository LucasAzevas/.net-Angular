using Crud.Models;
using Crud.Services;
using Crud.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IService service;
        public ProductsController(IService service)
        {
            this.service = service;
        }
        [HttpGet]
        [Route("api/GetProducts")]
        public ActionResult GetProducts()
        {
            try
            {
                var products = service.Products();
                return Ok(products);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpPost]
        [Route("api/InsertProducts")]
        public ActionResult InsertDataBase([FromBody] ProductsModel product)
        {
            try
            {
                service.IncluirDados(product);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
                
        }

        [HttpDelete]
        [Route("api/DeleteProduct/{id}")]
        public ActionResult DeleteItemDataBase(int id)
        {
            try
            {
                service.DeleteData(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        [Route("api/UpdateProduct")]
        public ActionResult UpdateItemDataBase([FromBody] UpdateModel obj)
        {
            try
            {
                service.UpdateItemDataBase(obj);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
