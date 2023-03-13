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

// const viewDepartments = async () => {
//   const results = await db.promise().query("SELECT * FROM department;")
//   console.table(results[0]);
//   console.log("\n");
//   appMenu();
// }

// const viewRoles = async () => {
//   const results = await db.promise().query("SELECT * FROM role;")
//   console.table(results[0]);
//   console.log("\n");
//   appMenu();
// }

// const addEmployee = async () => {
//   const infoEmployee = await inquirer.prompt([
//     { type: "input",
//       name: "addFirstName",
//       message: "What's the employee's first name?",
//     },
//     { type: "input",
//     name: "addLastName",
//     message: "What's the employee's last name?",
//     },
//     { type: "list",
//     name: "addEmpRole",
//     message: "What's the employee's role?",
//     },
//     { type: "list",
//     name: "addEmpManager",
//     message: "Who is the employee's manager?",
//     },
//   ])


//   // Inserts new employee information to employee table
//   const newEmployee = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${addFirstName}, ${addLastName}, ${addEmpRole}, ${addEmpManager})`)
  
//   // Selects the newly updated table
//   const results = await db.promise().query("SELECT * FROM employee;");

//   // Prints the newly updated table
//   console.table(results[0]);
//   console.log("\n");

//   // Recalls the appMenu so the user can make another or new selection
//   appMenu();
// }

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

  // else if (results.appMenu === 'Quit') {
  //   return quit();
  // }
}

appMenu();