using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressAndContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AddressAndContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select Id, Address, WorkPhoneNumber,PrivatePhoneNumber,ZipCode,City,
                    Country,PersonalEmail from 
                    AddressAndContacts";
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

        [HttpPost]
        public JsonResult Post(AddressAndContact ac)
        {
            string query = @"
                    insert into AddressAndContacts values 
                    (
                    '" + ac.Address + @"'
                    ,'" + ac.WorkPhoneNumber + @"'
                    ,'" + ac.PrivatePhoneNumber + @"'
                    ,'" + ac.ZipCode + @"'
                    ,'" + ac.City + @"'
                    ,'" + ac.Country + @"'
                    ,'" + ac.PersonalEmail + @"')";
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
        [HttpPut]
        public JsonResult Put(AddressAndContact ac)
        {
            string query = @"
                    update AddressAndContacts set 
                    Address = '" + ac.Address + @"',
                    WorkPhoneNumber = '" + ac.WorkPhoneNumber + @"',
                    PrivatePhoneNumber = '" + ac.PrivatePhoneNumber + @"',
                    ZipCode = '" + ac.ZipCode + @"',
                    City = '" + ac.City + @"',
                    Country = '" + ac.Country + @"',
                    PersonalEmail = '" + ac.PersonalEmail + @"'
                    where Id = " + ac.Id + @" 
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

            return new JsonResult("Updated Successfully");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from AddressAndContacts
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
