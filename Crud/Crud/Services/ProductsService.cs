using Crud.Models;
using Crud.Repository.Interface;
using Crud.Services.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;


namespace Crud.Services
{
    public class ProductsService : IService
    {
        private readonly IProductsRepository repos;

        private readonly IConfiguration _configuration;
        public ProductsService(IProductsRepository repos, IConfiguration configuration)
        {
            this.repos = repos;
            _configuration = configuration;
        }

        public bool VerifyPassword(string plainPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
        }

        public void Register(string email, string passaword, string role)
        {
            try
            {
                 repos.Register(email, passaword, role);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseLoginModel Users(string email)
        {
            try
            {
                return repos.Users(email);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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

        public string GenerateToken(string username, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, username),
                new Claim("role",role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:7190",
                Audience = "https://localhost:4200",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
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
