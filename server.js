// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    ////////// USE YOUR OWN MYSQL PASSWORD HERE //////////
    password: 'password',
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



///// SECTION FOR ADDING NEW DEPARTMENT /////

// Function that is being called from main menu inquirer when "Add Department" is selected
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
  console.table(depQuery[0]);
  return depQuery[0];
}

// Function that is being called from main menu inquirer when "Add Role" is selected
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
    message: "Which department does the new role belong to?",
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
// Will also be used to list role choices for updating an employee
const roleChoices = async () => {
  const roleQuery = await db.promise().query("SELECT id AS value, title FROM role;");
  console.log("\nROLE ID REFERENCE TABLE:\n");
  console.table(roleQuery[0]);
  return roleQuery[0];
}

// Used to retrieve from db all the current employees that can be assigned as a manager to the new employee
const managerChoices = async () => {
  const managerQuery = await db.promise().query("SELECT id AS value, first_name, last_name FROM employee;");
  console.log("\nMANAGER ID REFERENCE TABLE:\n")
  console.table(managerQuery[0]);
  console.log("\nREFERENCE ROLE ID AND MANAGER ID FROM TABLES ABOVE\n");
  return managerQuery[0];
}

// Function that is being called from main menu inquirer when "Add Employee" is selected
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
    message: "What is the employee's role ID? (Reference 'Role ID' table above, use 'value' for role ID)",
    choices: await roleChoices(),
    },
    { type: "list",
    name: "addEmpManager",
    message: "Who is the employee's manager? (Reference 'Manager ID' table above, use 'value' for manager ID)",
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



///// SECTION FOR ALL FUNCTIONS FOR UPDATING EMPLOYEE ROLE /////

// Used to retrieve from db all the employees that can updated
const updateEmployeeList = async () => {
  const empQuery = await db.promise().query("SELECT id AS value, first_name, last_name, role_id FROM employee;");
  console.log("\nEMPLOYEE ID REFERENCE TABLE:\n");
  console.log(empQuery[0]);
  return empQuery[0];
}

// Function that is being called from main menu inquirer when "Update Employee" is selected
const updateEmployee = async () => {

  // Additional Inquirer Prompt to receive user input to select and update an employee's info
  const infoUpdateEmployee = await inquirer.prompt([
    { type: "list",
    name: "updateEmployeeChoice",
    message: "Which employee do you want to update? (Reference 'EMPLOYEE ID' table above, use 'value' for employee ID)",
    choices: await updateEmployeeList(),
    },
    { type: "list",
    name: "updateRoleChoice",
    message: "What is the new role ID for your selected employee? (Reference 'Role ID' table above, use 'value' for role ID)",
    choices: await roleChoices(),
    },
  ])

  // Inserts updated employee information to employee table
  const employeeUpdated = await db.promise().query("UPDATE employee SET role_id=" + 
  `${infoUpdateEmployee.updateRoleChoice}` + " WHERE id="+`${infoUpdateEmployee.updateEmployeeChoice}` + ";")
  
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
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Quit' ]
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
  else if (results.appMenu === 'Update Employee Role') {
    updateEmployee();
  }
  else if (results.appMenu === 'Quit') {
    console.log("\n\n\nGoodbye!\n\nYou may now close the terminal or press CTRL+C then Y to exit.");
  }
}

// Initializes app
appMenu();