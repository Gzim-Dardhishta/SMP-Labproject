using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
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
                    select ROW_ID, ADDRESS, WORK_PHONE_NUMBER,PRIVATE_PHONE_NUMBER,ZIP_CODE,CITY,
                    COUNTRY,PERSONAL_EMAIL, EMPLOYEE_ID from 
                    dbo.ADDRESS_AND_CONTACT";
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
                    insert into dbo.ADDRESS_AND_CONTACT values 
                    (
                    '" + ac.Address + @"'
                    ,'" + ac.WorkPhoneNumber + @"'
                    ,'" + ac.PrivatePhoneNumber + @"'
                    ,'" + ac.ZipCode + @"'
                    ,'" + ac.City + @"'
                    ,'" + ac.Country + @"'
                    ,'" + ac.PersonalEmail + @"'
                    ,'" + ac.EmployeeId + @"')";
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
                    update dbo.ADDRESS_AND_CONTACT set 
                    ADDRESS = '" + ac.Address + @"',
                    WORK_PHONE_NUMBER = '" + ac.WorkPhoneNumber + @"',
                    PRIVATE_PHONE_NUMBER = '" + ac.PrivatePhoneNumber + @"',
                    ZIP_CODE = '" + ac.ZipCode + @"',
                    CITY = '" + ac.City + @"',
                    COUNTRY = '" + ac.Country + @"',
                    PERSONAL_EMAIL = '" + ac.PersonalEmail + @"',
                    EMPLOYEE_ID = '" + ac.EmployeeId + @"'
                    where ROW_ID = " + ac.RowId + @" 
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
                    delete from dbo.ADDRESS_AND_CONTACT
                    where ROW_ID = " + id + @" 
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
        [Route("GettAllEmployees")]
        [HttpGet]
        public JsonResult GetAllEmployees()
        {
            string query = @"
                    select PERSONAL_ID, FIRST_NAME, LAST_NAME
                    from 
                    dbo.PERSONAL_DATA";
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
    }
}
