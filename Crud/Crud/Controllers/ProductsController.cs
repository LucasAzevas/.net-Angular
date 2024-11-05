using Crud.Models;
using Crud.Services;
using Crud.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;


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

        [HttpPost]
        [Route("api/Register")]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(register.password);


                register.password = hashedPassword;

                service.Register(register.email, register.password, register.role);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/Login")]
        public IActionResult Login([FromBody] LoginModel request)
        {

            var user = service.Users(request.email);
            

              if (user == null || !service.VerifyPassword(request.password, user.PasswordHash))
              {
                 return Unauthorized(); // Retorna 401 se o usuário não for encontrado ou a senha não for válida
               }

            var token = service.GenerateToken(request.email, user.Role);

            return Ok(new { Token = token });
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
