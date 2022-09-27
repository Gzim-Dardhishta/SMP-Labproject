using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeSalaryController
    {
    private readonly IConfiguration _configuration;

        public EmployeeSalaryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select ROW_ID, FIRST_NAME, LAST_NAME,JOB_NAME,SALARY,CURRENCY_TYPE,
                    AFTER_HOURS_BONUS,EMPLOYEE_ID from 
                    dbo.EMPLOYEE_SALARY";
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
        public JsonResult Post(EmployeeSalary es)
        {
            string query = @"
                    insert into dbo.EMPLOYEE_SALARY values 
                    (
                    '" + es.FirstName + @"'
                    ,'" + es.LastName + @"'
                    ,'" + es.JobName + @"'
                    ,'" + es.Salary + @"'
                    ,'" + es.CurrencyType + @"'
                    ,'" + es.AfterHoursBonus + @"'
                    ,'" + es.EmployeeId + @"')";
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
        public JsonResult Put(EmployeeSalary es)
        {
            string query = @"
                    update dbo.EMPLOYEE_SALARY set 
                    FIRST_NAME= '" + es.FirstName + @"',
                    LAST_NAME = '" + es.LastName + @"',
                    JOB_NAME = '" + es.JobName + @"',
                    SALARY = '" + es.Salary + @"',
                    CURRENCY_TYPE = '" + es.CurrencyType + @"',
                    AFTER_HOURS_BONUS = '" + es.AfterHoursBonus + @"',
                    EMPLOYEE_ID = '" + es.EmployeeId + @"'
                    where ROW_ID = " + es.RowId + @" 
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
                    delete from dbo.EMPLOYEE_SALARY
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
        [Route("GetAllJobs")]
        [HttpGet]
        public JsonResult GetAllJobs()
        {
            string query = @"
                    select JOB_NAME, JOB_ID from 
                    dbo.JOB_POSITIONS";
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
        
    }

    
}