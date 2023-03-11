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
  const results = await db.promise().query("SELECT * FROM employee;")
  console.table(results[0]);
  console.log("\n");
  appMenu();
}

const viewDepartments = async () => {
  const results = await db.promise().query("SELECT * FROM department;")
  console.table(results[0]);
  console.log("\n");
  appMenu();
}

const viewRoles = async () => {
  const results = await db.promise().query("SELECT * FROM role;")
  console.table(results[0]);
  console.log("\n");
  appMenu();
}

// INSERT INTO * FROM EMPLOYEE;
const appMenu = async () => {
  const results = await inquirer.prompt([
    { type: "list",
      name: "appMenu",
      message: "Welcome to Employee Tracker, Please Select an Option: ",
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Quit' ]
    }
  ])
  if (results.appMenu === 'View All Employees') {
    viewEmployees();
  }
  else if (results.appMenu === 'View All Departments') {
    viewDepartments();
  }
  else if (results.appMenu === 'View All Roles') {
    viewRoles();
  }
}

appMenu();