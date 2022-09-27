using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkAndProfessionController
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
                    select ROW_ID, LOCATION, DIVISION_NAME,DEPARTMENT_NAME,UNIT_NAME,JOB_NAME,
                    PERSONAL_ID,EMAIL, TEAM_NAME from 
                    dbo.WORK_AND_PROFESSION";
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
                    insert into dbo.WORK_AND_PROFESSION values 
                    (
                    '" + wap.DivisionName+ @"'
                    ,'" + wap.DivisionName + @"'
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
                    update dbo.WORK_AND_PROFESSION set
                    PERSONAL_ID= '" + wap.PersonalId + @"',
                    LOCATION= '" + wap.Location + @"',
                    DIVISION_NAME= '"  + wap.DivisionName + @"',
                    DEPARTMENT_NAME= '" + wap.DepartmentName + @"',
                    UNIT_NAME= '" + wap.UnitName + @"',
                    JOB_NAME= '" + wap.JobName + @"',
                    EMAIL= '" + wap.Email + @"',
                    TEAM_NAME= '" + wap.TeamName + @"'
                    where ROW_ID = " + wap.RowId + @" 
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
                    delete from dbo.WORK_AND_PROFESSION
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
        [Route("GettAllDivisions")]
        [HttpGet]
        public JsonResult GettAllDivisions()
        {
            string query = @"
                    select DIVISION_ID, DIVISION_NAME
                    from 
                    dbo.DIVISION";
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
        [Route("GettAllUnits")]
        [HttpGet]
        public JsonResult GettAllUnits()
        {
            string query = @"
                    select UNIT_ID, UNIT_NAME
                    from 
                    dbo.UNIT";
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
        [Route("GettAllDepartments")]
        [HttpGet]
        public JsonResult GettAllDepartments()
        {
            string query = @"
                    select DEPARTMENT_ID, DEPARTMENT_NAME
                    from 
                    dbo.DEPARTMENTS";
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
        [Route("GettAllTeams")]
        [HttpGet]
        public JsonResult GettAllTeams()
        {
            string query = @"
                    select TEAM_ID,TEAM_NAME
                    from 
                    dbo.TEAM";
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
