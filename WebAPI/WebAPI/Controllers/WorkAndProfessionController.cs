using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkAndProfessionController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public WorkAndProfessionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select Id, Location, DivisionName,DepartmentName,UnitName,JobName,
                    PersonalId,Email, TeamName from 
                    WorkAndProfessions";
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
        public JsonResult Post(WorkAndProfession wap)
        {

            string query = @"
                    insert into WorkAndProfessions values 
                    (
                    '" + wap.DivisionName + @"'
                    ,'" + wap.DepartmentName + @"'
                    ,'" + wap.UnitName + @"'
                    ,'" + wap.JobName + @"'
                    ,'" + wap.PersonalId + @"'
                    ,'" + wap.Email + @"'
                    ,'" + wap.TeamName + @"'
                    )";
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
        public JsonResult Put(WorkAndProfession wap)
        {
            string query = @"
                    update WorkAndProfessions set
                    PersonalId= '" + wap.PersonalId + @"',
                    Location= '" + wap.Location + @"',
                    DivisionName= '" + wap.DivisionName + @"',
                    DepartmentName= '" + wap.DepartmentName + @"',
                    UnitName= '" + wap.UnitName + @"',
                    JobName= '" + wap.JobName + @"',
                    Email= '" + wap.Email + @"',
                    TeamName= '" + wap.TeamName + @"'
                    where Id = " + wap.Id + @" 
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
                    delete from WorkAndProfessions
                    where id = " + id + @" 
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
