using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System;

namespace Crud.Repository
{
    public class SqlConnectionFactory : IDisposable
    {
        public IDbConnection Connection { get; }
        private IConfiguration configuration;

        public SqlConnectionFactory()
        {
            try
            {
                // Carrega o arquivo de configuração
                configuration = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .Build();

                string DatabaseHost = Environment.GetEnvironmentVariable("DB_HOST") ?? configuration["DatabaseSettings:DB_HOST"];
                string DatabaseName = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? configuration["DatabaseSettings:DATABASE_NAME"];

                string connectionString = $"Data Source={DatabaseHost};Initial Catalog={DatabaseName};Integrated Security=True;";
                Connection = new SqlConnection(connectionString);
                Connection.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }

        public void Dispose()
        {
            Connection.Dispose();
        }
    }
}
