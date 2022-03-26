//Required dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

require("dotenv").config()

//Create connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password22",
    database: "employee_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    afterConnection();
});

//Function when connection is established
afterConnection = () => {
    console.log(`
    ==================================
        Welcome to your Staff Hub
    ==================================
    `)
    promptUser();
};

//First inquirer prompt
const promptUser = () => {
    inquirer.prompt([{
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Update an employee manager",
                "View employees by department",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "View a department budget",
                "Exit"
            ]
        }])

        .then((answers) => {
            const {
                choices
            } = answers;

            if (choices === "View all departments") {
                viewDepartments();
            }

            if (choices === "View all roles") {
                viewRoles();
            }

            if (choices === "View all emplyees") {
                viewEmployees();
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

            if (choices === "Update an employee manager") {
                updateManager();
            }

            if (choices === "View employees by department") {
                employeeDepartment();
            }

            if (choices === "Delete a department") {
                deleteDepartment();
            }

            if (choices === "Delete a role") {
                deleteRole();
            }

            if (choices === "Delete an employee") {
                deleteEmployee();
            }

            if (choices === "View a department budget") {
                viewBudget();
            }

            if (choices === "Exit") {
                connection.end()
            };
        });
};

//Function to view all departments -> user is presented with a formatted table with department names & ids
viewDepartments = () => {
    console.log("Showing all departments...\n");

    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

//Function to view all roles -> user is presented with the job title, role id, department the role belongs to, and salary
viewRoles = () => {
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

//Function view all employees -> user is presented with formatted table showing employee data (ids, first names, last names, job titles, departments, salaries, & managers)
viewEmployees = () => {
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

//Function to add a department -> user is prompted to enter the name of the department & that department is added to the db
addDepartment = () => {
    inquirer.prompt([{
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
        }])

        .then(answer => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            connection.query(sql, answer.addDept, (err, _result) => {
                if (err) throw err;
                console.log('Added' + answer.addDept + " to departments.");

                viewDepartments();
            });
        });
};

//Function to add a role -> user is prompted to enter the name, salary, & department for the role, & that the role is added to the db
addRole = () => {
    inquirer.prompt([{
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
                message: "What is the salary for the role?",
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

                const dept = data.map(({
                    name,
                    id
                }) => ({
                    name: name,
                    value: id
                }));

                inquirer.prompt([{
                        type: "list",
                        name: "dept",
                        message: "What department is the role in?",
                        choices: dept
                    }])

                    .then(deptChoice => {
                        const dept = deptChoice.dept;
                        params.push(dept);

                        const sql = `INSERT INTO role (title, salary, department_id) VALUESb(?, ?, ?)`;

                        connection.query(sql, params, (err, _result) => {
                            if (err) throw err;
                            console.log('Added' + answer.role + " to roles.");

                            viewRoles();
                        });

                    });
            });
        });
};

//Add an employee -> user is prompted to enter an employee's first name, last name, role, and manager, and that the employee is added to the database
addEmployee = () => {
    inquirer.prompt([{
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?",
                validate: addFirstName => {
                    if (addFirstName) {
                        return true;
                    } else {
                        console.log("Please enter a first name.");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: addLastName => {
                    if (addLastName) {
                        return true;
                    } else {
                        console.log("Please enter a last name.");
                        return false;
                    }
                }
            }
        ])

        .then(answer => {
            const params = [answer.firstName, answer.lastName]

            //Get roles from roles table
            const roleSql = `SELECT role.id, role.title FROM role`;

            connection.promise().query(roleSql, (err, data) => {
                if (err) throw err;

                const roles = data.map(({
                    id,
                    title
                }) => ({
                    name: title,
                    value: id
                }));

                inquirer.prompt([{
                        type: "list",
                        name: "role",
                        message: "What is the employee's role?",
                        choices: roles
                    }])

                    .then(roleChoice => {
                        const role = roleChoice.role;
                        params.push(role);

                        const managerSql = `SELECT * FROM employee`;

                        connection.promise().query(managerSql, (err, data) => {
                            if (err) throw err;

                            const managers = data.map(({
                                id,
                                first_name,
                                last_name
                            }) => ({
                                name: first_name + " " + last_name,
                                value: id
                            }));
                            console.log(managers);

                            inquirer.prompt([{
                                    type: "list",
                                    name: "manager",
                                    message: "Who is the employee's manager?",
                                    choices: managers
                                }])

                                .then(managerChoice => {
                                    const manager = managerChoice.manager;
                                    params.push(manager);

                                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                                    connection.query(sql, params, (err, _result) => {
                                        if (err) throw err;
                                        console.log("Employee is added.")

                                        viewEmployees();
                                    });
                                });
                        });
                    });
            });
        });
};


//Function to update an employee role -> user is prompted to select an employee to update & their new role, & this information is added to the db
updateEmployee = () => {

    //Get employees from employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.promise().query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({
            id,
            first_name,
            last_name
        }) => ({
            name: first_name + " " + last_name,
            value: id
        }));

        inquirer.prompt([{
                type: "list",
                name: "name",
                message: "Which employee would you like to update",
                choices: employees
            }])

            .then(employeeChoice => {
                const employee = employeeChoice.name;
                const params = [];
                params.push(employee);

                const roleSql = `SELECT * FROM role`;

                connection.promise().query(roleSql, (err, data) => {
                    if (err) throw err;

                    const roles = data.map(({
                        id,
                        title
                    }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt([{
                            type: "list",
                            name: "role",
                            message: "What is the employee's new role?",
                            choices: roles
                        }])

                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee
                            console.log(params);

                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                            connection.query(sql, params, (err, _result) => {
                                if (err) throw err;
                                console.log("Employee is updated.");

                                viewEmployees;
                            });
                        });
                });
            });

    });
};

//Function to update an employee manager
updateManager = () => {

    //Get employees from employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.promise().query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({
            id,
            first_name,
            last_name
        }) => ({
            name: first_name + " " + last_name,
            value: id
        }));

        inquirer.prompt([{
                type: "list",
                name: "name",
                message: "Which employee would you like to update?",
                choices: employees
            }])

            .then(employeeChoice => {
                const employee = employeeChoice.name;
                const params = [];
                params.push(employee);

                const managerSql = `SELECT * FROM employee`;

                connection.promise().query(managerSql, (err, data) => {
                    if (err) throw err;

                    const managers = data.map(({
                        id,
                        first_name,
                        last_name
                    }) => ({
                        name: first_name + " " + last_name,
                        value: id
                    }));

                    inquirer.prompt([{
                            type: "list",
                            name: "manager",
                            message: "Who is the employee's manager?",
                            choices: managers
                        }])

                        .then(managerChoice => {
                            const manager = managerChoice.manager;
                            params.push(manager);

                            let employee = params[0]
                            params[0] = manager
                            params[1] = employee
                            console.log(params);

                            const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

                            connection.query(sql, params, (err, _result) => {
                                if (err) throw err;
                                console.log("Employee is updated.");

                                viewEmployees();
                            });
                        });
                });
            });
    });
};

//Function to view employee by department
employeeDepartment = () => {
    console.log("Showing employees by department...\n");

    const sql = `SELECT employee.first_name,
                        employee.last_name,
                        department.name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

//Function to delete department
deleteDepartment = () => {
    const departmentSql = `SELECT * FROM department`;

    connection.promise().query(departmentSql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({
            name,
            id
        }) => ({
            name: name,
            value: id
        }));

        inquirer.prompt([{
                type: "list",
                name: "dept",
                message: "What department do you want to delete?",
                choices: dept
            }])

            .then(departmentChoice => {
                const dept = departmentChoice.dept;
                const sql = `DELETE FROM department WHERE id = ?`;

                connection.query(sql, dept, (err, _result) => {
                    if (err) throw err;
                    console.log("Department is deleted.");

                    viewDepartments();
                });
            });
    });
};

//Function to delete role
deleteRole = () => {
    const roleSql = `SELECT * FROM role`;

    connection.promise().query(roleSql, (err, data) => {
        if (err) throw err;

        const role = data.map(({
            title,
            id
        }) => ({
            name: title,
            value: id
        }));

        inquirer.prompt([{
                type: "list",
                name: "role",
                message: "What role do you want to delete?",
                choices: role
            }])

            .then(roleChoice => {
                const role = roleChoice.role;
                const sql = `DELETE FROM role WHERE id = ?`;

                connection.query(sql, role, (err, _result) => {
                    if (err) throw err;
                    console.log("Role is deleted.");

                    viewRoles();
                });
            });
    });
};

//Function to delete employees
deleteEmployee = () => {

    //Get employees from employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.promise().query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({
            id,
            first_name,
            last_name
        }) => ({
            name: first_name + " " + last_name,
            value: id
        }));

        inquirer.prompt([{
                type: "list",
                name: "name",
                message: "Which employee would like to delete?",
                choices: employees
            }])

            .then(employeeChoice => {
                const employee = employeeChoice.name;

                const sql = `DELETE FROM employee WHERE id = ?`;

                connection.query(sql, employee, (err, _result) => {
                    if (err) throw err;
                    console.log("Employee is deleted.");

                    viewEmployees();
                });
            });
    });
};

//Function to view department budget
viewBudget = () => {
    console.log("Show budget by department...\n");

    const sql = `SELECT department_id AS id,
                        department_name AS department,
                        SUM(salary) AS budget
                FROM role
                JOIN department ON role.department_id = department.id GROUP BY department_id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);

        promptUser();
    });
};