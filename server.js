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

///// View All Employees /////
const viewEmployees = async () => {
  // Retrieves data from employee table
  const results = await db.promise().query("SELECT * FROM employee;");
  // Logs the data in a table format in the console
  console.table(results[0]);
  console.log("\n");
  // Recalls the main menu
  appMenu();
}

///// View All Departments /////
const viewDepartments = async () => {
  // Retrieves data from department table
  const results = await db.promise().query("SELECT * FROM department;");
  // Logs the data in a table format in the console
  console.table(results[0]);
  console.log("\n");
  // Recalls the main menu
  appMenu();
}

///// View All Roles /////
const viewRoles = async () => {
  // Retrieves data from role table
  const results = await db.promise().query("SELECT * FROM role;");
  // Logs the data in a table format in the console
  console.table(results[0]);
  console.log("\n");
  // Recalls the main menu
  appMenu();
}

///// SECTION FOR ALL FUNCTIONS FOR ADDING NEW DEPARTMENT /////

const addDepartment = async () => {

  // Additional Inquirer Prompt to receive user input for new department's info
  const infoDep = await inquirer.prompt([
    { type: "input",
      name: "addDepName",
      message: "What is the name of the new department?",
    },
  ])

  // Inserts new department information to department table
  const newDepartment = await db.promise().query(`INSERT INTO department (name) VALUES ('${infoDep.addDepName}')`)
  
  // Selects the newly updated table
  const results = await db.promise().query("SELECT * FROM department;");

  // Prints the newly updated table
  console.log("\nNewly Updated Department Table: ");
  console.table(results[0]);
  console.log("\n");

  // Recalls the appMenu so the user can make another new selection
  appMenu();
}

///// SECTION FOR ALL FUNCTIONS FOR ADDING NEW ROLE /////

// Used to retrieve from db all the departments that can be assigned for the new role
const depChoices = async () => {
  const depQuery = await db.promise().query("SELECT id AS value, name FROM department;");
  console.log("\nDEPARTMENT ID REFERENCE TABLE:\n")
  console.log(depQuery[0]);
  console.log("\nREFERENCE DEPARTMENT ID FROM TABLES ABOVE\n");
  return depQuery[0];
}

const addRole = async () => {

  // Additional Inquirer Prompt to receive user input for new role info
  const infoRole = await inquirer.prompt([
    { type: "input",
      name: "addRoleName",
      message: "What is the title of the new role?",
    },
    { type: "input",
    name: "addRoleSalary",
    message: "What is the salary of the new role?",
    },
    { type: "list",
    name: "addRoleDep",
    message: "Which department does the new role belong to? (Reference 'Department ID' Table above)",
    choices: await depChoices(),
    },
  ])

  // Inserts new role information to role table
  const newRole = await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${infoRole.addRoleName}', '${infoRole.addRoleSalary}', '${infoRole.addRoleDep}')`)
  
  // Selects the newly updated table
  const results = await db.promise().query("SELECT * FROM role;");

  // Prints the newly updated table
  console.log("\nNewly Updated Role Table: ");
  console.table(results[0]);
  console.log("\n");

  // Recalls the appMenu so the user can make another new selection
  appMenu();
}

///// SECTION FOR ALL FUNCTIONS FOR ADDING NEW EMPLOYEE /////

// Used to retrieve from db all the roles that can be assigned to a new employee
const roleChoices = async () => {
  const roleQuery = await db.promise().query("SELECT id AS value, title FROM role;");
  console.log("\nROLE ID REFERENCE TABLE:\n");
  console.log(roleQuery[0]);
  return roleQuery[0];
}

// Used to retrieve from db all the current employees that can be assigned as a manager to the new employee
const managerChoices = async () => {
  const managerQuery = await db.promise().query("SELECT id AS value, first_name, last_name FROM employee;");
  console.log("\nMANAGER ID REFERENCE TABLE:\n")
  console.log(managerQuery[0]);
  console.log("\nREFERENCE ROLE ID AND MANAGER ID FROM TABLES ABOVE\n");
  return managerQuery[0];
}

const addEmployee = async () => {

  // Additional Inquirer Prompt to receive user input for new employee's info
  const infoEmployee = await inquirer.prompt([
    { type: "input",
      name: "addFirstName",
      message: "What's the employee's first name?",
    },
    { type: "input",
    name: "addLastName",
    message: "What's the employee's last name?",
    },
    { type: "list",
    name: "addEmpRole",
    message: "What is the employee's role ID? (Reference 'Role ID' table above for ID)",
    choices: await roleChoices(),
    },
    { type: "list",
    name: "addEmpManager",
    message: "Who is the employee's manager? (USE MANAGER ID - Reference 'Manager ID' table above for ID)",
    choices: await managerChoices(),
    },
  ])

  // Inserts new employee information to employee table
  const newEmployee = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${infoEmployee.addFirstName}', '${infoEmployee.addLastName}', '${infoEmployee.addEmpRole}', '${infoEmployee.addEmpManager}')`)
  
  // Selects the newly updated table
  const results = await db.promise().query("SELECT * FROM employee;");

  // Prints the newly updated table
  console.log("\nNewly Updated Employee Table: ");
  console.table(results[0]);
  console.log("\n");

  // Recalls the appMenu so the user can make another new selection
  appMenu();
}



///// Main App Menu /////
const appMenu = async () => {

  // Inquirer Prompts that present all the choices for viewing the database
  const results = await inquirer.prompt([
    { type: "list",
      name: "appMenu",
      message: "Welcome to Employee Tracker, Please Select an Option: ",
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Quit' ]
    }
  ])

  // If Statements to verify the choices above and calls the respective functions.
  if (results.appMenu === 'View All Employees') {
    viewEmployees();
  }
  else if (results.appMenu === 'View All Departments') {
    viewDepartments();
  }
  else if (results.appMenu === 'View All Roles') {
    viewRoles();
  }
  else if (results.appMenu === 'Add Employee') {
    addEmployee();
  }
  else if (results.appMenu === 'Add Role') {
    addRole();
  }
  else if (results.appMenu === 'Add Department') {
    addDepartment();
  }
  else if (results.appMenu === 'Quit') {
    console.log("\n\n\nGoodbye!\n\nYou may now close the terminal or press CTRL+C then Y to exit.");
  }
}

appMenu();