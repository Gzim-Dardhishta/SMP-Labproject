using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalDataController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PersonalDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select ROW_ID,PERSONAL_ID, PASSPORT_NUMBER , PHONE_NUMBER , FIRST_NAME, LAST_NAME,WORK_EMAIL,PERSONAL_EMAIL,DATE_OF_BIRTH,
                    STATE_OF_BIRTH,BIRTH_PLACE,GENDER,NATIONALITY,MARTIAL_STATUS,FULL_TIME, IS_INTERN from 
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
        [Route("GetInterns")]
        [HttpGet]
        public JsonResult GetInterns()
        {
            string query = @"
                    select * from 
                    dbo.PERSONAL_DATA where IS_INTERN = 'yes'";
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

        [Route("GetFullTime")]
        [HttpGet]
        public JsonResult GetFullTime()
        {
            string query = @"
                    select * from 
                    dbo.PERSONAL_DATA where FULL_TIME = 'yes'";
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
        public JsonResult Post(PersonalData pd)
        {
            string query = @"
                    insert into dbo.PERSONAL_DATA values 
                    ('" + pd.PersonalId + @"'
                    ,'" + pd.PassportNumber + @"'
                    ,'" + pd.PhoneNumber + @"'
                    ,'" + pd.FirstName + @"'
                    ,'" + pd.LastName + @"'
                    ,'" + pd.WorkEmail + @"'
                    ,'" + pd.PersonalEmail + @"'
                    ,'" + pd.DateOfBirth + @"'
                    ,'" + pd.StateOfBirth + @"'
                    ,'" + pd.BirthPlace + @"'
                    ,'" + pd.Gender + @"'
                    ,'" + pd.Nationality + @"'
                    ,'" + pd.MartialStatus + @"'
                    ,'" + pd.FullTime + @"'
                    ,'" + pd.IsIntern + @"')";
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
        public JsonResult Put(PersonalData pd)
        {
            string query = @"
                    update dbo.PERSONAL_DATA set
                    PERSONAL_ID = '" + pd.PersonalId + @"',
                    PASSPORT_NUMBER = '" + pd.PassportNumber + @"',
                    PHONE_NUMBER = '" + pd.PhoneNumber + @"',
                    FIRST_NAME = '" + pd.FirstName + @"',
                    LAST_NAME = '" + pd.LastName + @"',
                    WORK_EMAIL = '" + pd.WorkEmail + @"',
                    PERSONAL_EMAIL = '" + pd.PersonalEmail + @"',
                    DATE_OF_BIRTH = '" + pd.DateOfBirth + @"',
                    STATE_OF_BIRTH = '" + pd.StateOfBirth + @"',
                    BIRTH_PLACE = '" + pd.BirthPlace + @"',
                    GENDER = '" + pd.Gender + @"',
                    NATIONALITY = '" + pd.Nationality + @"',
                    MARTIAL_STATUS = '" + pd.MartialStatus + @"',
                    FULL_TIME = '" + pd.FullTime + @"',
                    IS_INTERN = '" + pd.IsIntern + @"'
                    where PERSONAL_ID = " + pd.PersonalId + @" 
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
                    delete from dbo.PERSONAL_DATA
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
    }

    
}