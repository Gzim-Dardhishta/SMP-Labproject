using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebAPI.Models;
using WebAPI.Auth;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeMessageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeMessageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select Id, Name , LastName, Email, Message from EmployeeMessages";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public JsonResult Post(EmployeeMessage message)
        {
            string query = @"
                    insert into EmployeeMessages values 
                    ('" + message.Name + @"'
                    ,'" + message.LastName + @"'
                    ,'" + message.Email + @"' 
                    ,'" + message.Message + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [Authorize(Roles = UserRoles.AdminOrManager)]
        [HttpPut]
        public JsonResult Put(EmployeeMessage message)
        {
            string query = @"
                    update EmployeeMessages set 
                    Name = '" + message.Name + @"',
                    LastName = '" + message.LastName + @"',
                    Email = '" + message.Email + @"',
                    Message = '" + message.Message + @"'
                    where ID = " + message.Id + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from EmployeeMessages
                    where Id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
