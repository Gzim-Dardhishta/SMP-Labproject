using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;


namespace WebAPI.Controllers
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
                    select Id,PersonalId, PassportNumber , PhoneNumber , FirstName, LastName,WorkEmail,PersonalEmail,DateOfBirth,
                    StateOfBirth,BirthPlace,Gender,Nationality,MartialStatus,FullTime, IsIntern from 
                    PersonalDatas";
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
                    insert into PersonalDatas values 
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
                    update PersonalDatas set
                    PersonalId = '" + pd.PersonalId + @"',
                    PassportNumber = '" + pd.PassportNumber + @"',
                    PhoneNumber = '" + pd.PhoneNumber + @"',
                    FirstName = '" + pd.FirstName + @"',
                    LastName = '" + pd.LastName + @"',
                    WorkEmail = '" + pd.WorkEmail + @"',
                    PersonalEmail = '" + pd.PersonalEmail + @"',
                    DateOfBirth = '" + pd.DateOfBirth + @"',
                    StateOfBirth = '" + pd.StateOfBirth + @"',
                    BirthPlace = '" + pd.BirthPlace + @"',
                    Gender = '" + pd.Gender + @"',
                    Nationality = '" + pd.Nationality + @"',
                    MartialStatus = '" + pd.MartialStatus + @"',
                    FullTime = '" + pd.FullTime + @"',
                    IsIntern = '" + pd.IsIntern + @"'
                    where PId = " + pd.Id + @" 
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
                    delete from PersonalDatas
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
