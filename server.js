//Import MySQL2
const mysql = require("mysql");
//Import Inquirer
const inquirer = require("inquirer");
//Import console.table
const cTable = require("console.table");

require("dotenv").config()

//Connection to db
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employee_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    afterConnection();
});

//Function after connection is established
afterConnection = () => {
        console.log(`
        =========================
        Welcome to Your Staff Hub
        =========================
        `);
        prompUser();

        //First inquirer prompt when user starts application
        const prompUser = () => {
                inquirer.prompt([{
                        type: "list",
                        name: "choices",
                        message: "What would you like to do?",
                        choices: ["View all departments",
                            "View all roles",
                            "View all employees",
                            "Add a department",
                            "Add a role",
                            "Add an employee",
                            "Update an employee role",
                            "No action"
                        ]
                    }])
                    .then((answers) => {
                            const {
                                choices
                            } = answers;

                            if (choices === "View all departments") {
                                showDepartments();

                                if (choices === "View all roles") {
                                    showRoles();
                                }

                                if (choices === "View all employees") {
                                    showEmployees();
                                }

                                if (choices === "Add a department") {
                                    addDepartment();
                                }

                                if (choices === "Add a role") {
                                    addRole();
                                }

                                if (choices === "Add an employee") {
                                    addEmployee();
                                }

                                if (choices === "Update an employee role") {
                                    updateEmployee();
                                }

                                if (choices === "No action") {
                                    connection.end()
                                };

                            });
                    };

                //Function to show (view) all departments
                showDepartments = () => {
                    console.log("Showing all departments...\n");
                    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

                    connection.promise().query(sql, (err, rows) => {
                        if (err) throw err;
                        console.table(rows);
                        promptUser();
                    });
                };

                //Function to show (view) all roles
                showRoles = () => {
                    console.log("Showing all roles...\n");

                    const sql = `SELECT role.title, role.id, department.name AS department, role.salary
                FROM role
                INNER JOIN department ON role.department_id = department.id`;

                    connection.promise().query(sql, (err, rows) => {
                        if (err) throw err;
                        console.table(rows);
                        promptUser;
                    })
                };

                //Function to show (view) all employees
                showEmployees = () => {
                        console.log("Showing all employees...\n");
                        const sql = `SELECT employee.id, 
                                            employee.first_name, 
                                            employee.last_name, 
                                            role.title, 
                                            department.name AS department, 
                                            role.salary, 
                                            CONCAT (manager.first_name, " ", manager.last_name) AS manager
                                            FROM employee
                                            LEFT JOIN role on employee.role_id = rile.id
                                            LEFT JOIN department on role.department_id = department_id
                                            LEFT JOIN employee manager ON employee.manager_id = manager_id`;
                    
                        connection.promise().query(sql, (err, rows) => {
                            if (err) throw err;
                            console.table(rows);
                            promptUser();
                        });
                };

                //Function to add a department
                addDepartment = () => {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "addDept",
                            message: "What department do you want to add?",
                            validate: addDept => {
                                if (addDept) {
                                    return true;
                                } else {
                                    console.log("Please enter a department.");
                                    return false;
                                }
                            }
                        }
                    ])

                    .then(answer => {
                        const sql = `INSERT INTO department (name)
                                    VALUES (?)`;
                        connection.query(sql, answer.addDept, (err, result) => {
                            if (err) throw err;
                            console.log("Added" + answer.addDept + " to departments.");
                            
                            showDepartments();
                        });
                    });
                };

                //Function to add a role
                addRole = () => {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "role",
                            message: "What role do you want to add?",
                            validate: addRole => {
                                if (addRole) {
                                    return true;
                                } else {
                                    console.log("Please enter a role.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "What is this role's salary?",
                            validate: addSalary => {
                                if (isNaN(addSalary)) {
                                    return true;
                                } else {
                                    console.log("Please enter a salary.");
                                    return false;
                                }
                            }
                        }
                    ])

                    .then(answer => {
                        const params = [answer.role, answer.salary];

                        //Get department from department table
                        const roleSql = `SELECT name, id FROM department`;

                        connection.promise().query(roleSql, (err, data) => {
                            if (err) throw err;

                            const dept = data.map(({ name, id }) => ({ name: name, value: id}));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "dept",
                                    message: "What department is the role in?",
                                    choices: dept
                                }
                            ])

                            .then(deptChoice => {
                                const dept = deptChoice.dept;
                                params.push(dept);

                                const sql = `INSERT INTO role (title, salary, department_id)
                                            VALUESb(?, ?, ?)`;

                                connection.query(sql, params, (err, result) => {
                                    if (err) throw err;
                                    console.log('Added' + answer.role + " to roles.");

                                    showRoles();
                                });

                            });
                        });
                    });
                };
                

                //Function to add an employee
                addEmployee
                WHEN I choose to add an employee
                THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database


                //Function to update an employee role
                updateRole
                WHEN I choose to update an employee role
                THEN I am prompted to select an employee to update and their new role and this information is updated in the database



                //Function to update an employee manager
                updateManager


                //Function to view employee by department
                employeeDepartment


                //Function to delete department
                deleteDepartment


                //Function to delete role
                deleteRole


                //Function to delete employees
                deleteEmployees


                //Function to view department budget
                viewBudget
                    )
            }

        }