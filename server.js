// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    password: 'Uranus1123!',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const viewEmployees = async () => {
  const results = await db.promise().query("SELECT * FROM EMPLOYEE;")
  console.table(results[0]);
  console.log("\n");
  appMenu();
}

const viewDepartments = async () => {
  const results = await db.promise().query("INSERT INTO * FROM EMPLOYEE;")
  console.table(results[0]);
  console.log("\n");
  appMenu();
}

const appMenu = async () => {
  const results = await inquirer.prompt([
    { type: "list",
      name: "appMenu",
      message: "Welcome to Employee Tracker, Please Select an Option: ",
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Quit' ]
    }
  ])
  if (results.appMenu === 'View All Employees') {
    viewEmployees()
  }
}

appMenu();