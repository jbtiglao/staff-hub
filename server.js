//Required dependencies
const db = require('./config/connection.js');
const inquirer = require('inquirer');

 
function initialize () {
    console.log(`

    ==================================

        Welcome to your Staff Hub

    ==================================
`);
        
    promptUser();
}
 
//Function to ask user what task they would like to do
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View All Departments',
                      'View All Roles',
                      'View All Employees',
                      'Add a Department',
                      'Add a Role',
                      'Add an Employee',
                      "Update an Employee's Role",
                      "Update an Employee's Manager",
                      "Delete Department",
                      "Delete Role",
                      "Delete Employee",
                      "View Employees by Manager",
                      "View Employees by Role",
                      "View Employees by Department",
                      "View Department Budget"
            ]
        }
    ]).then(function(data){
        switch (data.task) {
            case "View All Departments": displayDepartments();
                break;
            case "View All Roles": displayRoles();
                break;
            case "View All Employees": displayEmployees();
                break;
            case "Add a Department": addDepartment();
                break;
            case "Add a Role": addRole();
                break;
            case "Add an Employee": addEmployee();
                break;
            case "Update an Employee's Role": updateEmployeeRole();
                break;     
            case "Update an Employee's Manager": updateEmployeeManager();
                break;
            case "Delete Department": deleteDepartment();
                break;
            case "Delete Role": deleteRole();
                break;
            case "Delete Employee": deleteEmployee();
                break;
            case "View Employees by Manager": viewEmployeeByManager();
                break;
            case "View Employees by Role": viewEmployeeByRole();
                break;
            case "View Employees by Department": viewEmployeeByDept();
                break;
            case "View Department Budget": viewDeptBudget();
        }
    });
};
 
//Function to display all departments -> user is presented with a formatted table with department names & IDs
function displayDepartments() {
 
    //MySQL call to view department ID and name
    const sql = `SELECT department.id, department.name AS department FROM department`
    db.query(sql, (err, results) => {
        if (err) throw err;
 
        const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
        console.table(transformed);
        promptUser();
    })
}
 
//Function to display all roles -> user is presented with the role id, job title, department the role belongs to, and salary
function displayRoles() {
 
    //MySQL call to view role ID, title, department, and salary
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary
                FROM role JOIN department ON role.department_id = department.id`
    db.query(sql, (err, results) => {
        if (err) throw err;
 
        const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
        console.table(transformed);
        promptUser();
    })
}
 
//Function to display all employees -> user is presented with formatted table showing employee data (ids, first names, last names, job titles, departments, salaries, & managers)
function displayEmployees() {
 
    //MySQL call to view employee ID, first name, last name, role title, department, salary, and manager
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,
                        department.name AS department, role.salary, manager.last_name AS manager
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id;`

    db.query(sql, (err, results) => {
        if (err) throw err;
 
        const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
        console.table(transformed);
        promptUser();
    })
}
 
//Function to add a department -> user is prompted to enter the name of the department & that department is added to the db
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?',
            validate: input => { if (input && input.length <= 30) { return true; } else { return false; }}
        }
    ]).then(function(data) {
 
        //Function to input department name into department table
        db.query(`INSERT INTO department (name) VALUES ('${data.department}')`, (err) => {
            if (err) throw err;
 
            promptUser();
        });
    });
}
 
//Function to add a role -> user is prompted to enter the name, salary, & department for the role, & that the role is added to the db
function addRole() {
 
    //MySQL call to get departments
    db.query(`Select department.name FROM department`, (err, results) => {
        if (err) throw err;
 
        let departmentArray = [];
 
        //For loop to print departments into an array
        for(let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].name)
        }
 
        inquirer.prompt([
            {
                type:'input',
                name:'role',
                message:'What role would you like to add?',
                validate: input => { if (input && input.length <= 30) { return true; } else { return false; }}
            },
            {
                type:'input',
                name:'salary',
                message:'What salary would this role have?',
                validate: input => { if (isNaN(input)) { return false; } else { return true; }}
            },
            {
                type:'list',
                name:'department',
                message:'What department is this role apart of?',
                choices: departmentArray
            }
        ]).then(function(data) {
 
            //MySQL call to ID from departments
            db.query(`SELECT * FROM department WHERE  name = '${data.department}'`, (err, results) => {
                if (err) throw err;
 
                //MySQL call to add role, title, salary, and department ID)
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.role}', '${data.salary}', '${results[0].id}')`, (err) => {
                    if (err) throw err;
 
                    promptUser();
                });
            });
        });
    });
}
 
//Function to add an employee -> user is prompted to enter an employee's first name, last name, role, and manager, and that the employee is added to the database
function addEmployee() {
 
    //MySQL call to get roles list
    db.query(`SELECT role.title FROM role`, (err, data1) => {
        if (err) throw err;
 
        let roleArray = [];
 
        //For loop to insert roles into an array
        for (let i = 0; i < data1.length; i++) {
            roleArray.push(data1[i].title)
        }
 
        //MySQL call to get an employee list to select manager
        db.query(`SELECT employee.first_name, employee.last_name FROM employee`, (err, data2) => {
            if (err) throw err;
 
            let managerArray = ['No Manager'];
 
            //For loop ot insert manager into an array
            for (let i = 0; i < data2.length; i++) {
                let manager = `${data2[i].first_name} ${data2[i].last_name}`
                managerArray.push(manager)
            }
 
            inquirer.prompt([
                {
                    type:'input',
                    name:'firstName',
                    message:"What is your new employee's first name?",
                    validate: input => { if (input && input.length <= 30) { return true;} else { return false; }}
                },
                {
                    type:'input',
                    name:'lastName',
                    message:"What is your new employee's last name?",
                    validate: input => { if (input && input.length <= 30) { return true; } else { return false; }}
                },
                {
                    type:'list',
                    name:'role',
                    message:"What is your new employee's role?",
                    choices: roleArray
                },
                {
                    type:'list',
                    name:'manager',
                    message:"Who is your new employee's manager?",
                    choices: managerArray
                }
            ]).then(function(data3) {
                let firstname = data3.firstName;
                firstname = firstname.replace(/\s+/g, '-');
                
                let lastname = data3.lastName;
                lastname = lastname.replace(/\s+/g, '-');
 
                let managername = data3.manager;
                let sql1 = `SELECT id FROM role WHERE title = '${data3.role}'`
                if (managername != 'No Manager') {
                    managername = managername.split(" ");
                    let managerfirstname = managername[0];
                    let managerlastname = managername[1];
                    sql1 = `SELECT id FROM role WHERE title = '${data3.role}' UNION SELECT id FROM employee WHERE first_name = '${managerfirstname}' AND last_name = '${managerlastname}'`
                }
 
                //MySQL call to get the ID of employee selected from the array
                db.query(sql1,(err, data4) => {
                    if (err) throw err;
 
                    //MySQL call to insert employee's first name, last name, role, and manager into employee table
                    let sql2 = '';
                    if (data4.length === 1 && managername === 'No Manager') {
                        sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES ('${firstname}','${lastname}','${data4[0].id}', null)`
                    } else if (data4.length === 1 ) {
                        sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES ('${firstname}','${lastname}','${data4[0].id}','${data4[0].id}')`
                    }else {
                        sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES ('${firstname}','${lastname}','${data4[0].id}','${data4[1].id}')`
                    }
                    db.query(sql2, (err) => {
                        if (err) throw err;
 
                        promptUser();
                    });
                });
            });
        });
    });
}
 
//Function to update an employee role -> user is prompted to select an employee to update & their new role, & this information is added to the db
function updateEmployeeRole() {
 
    // MySQL call to select employee's first and last name for an array
    db.query(`SELECT employee.first_name, employee.last_name FROM employee`, (err, data1) => {
        if (err) throw err;
 
        let employeeArray = [];
 
        //For loop to create an array of employees
        for (let i = 0; i < data1.length; i++) {
            let employee = `${data1[i].first_name} ${data1[i].last_name}`
            employeeArray.push(employee)
        }
 
        inquirer.prompt([
            {
                type:'list',
                name:'employee',
                message:"Which employee would you like to update their role?",
                choices: employeeArray
            }
        ]).then(function(data2) {
            let employeename = data2.employee;
            employeename = employeename.split(" ");
            let employeefirstname = employeename[0];
            let employeelastname = employeename[1];
 
            //MySQL call to get roles for an array
            db.query(`SELECT role.title FROM role`, (err, data3) => {
                if (err) throw err;
 
                let roleArray = [];
 
                //For loop to create an array of roles
                for (let i = 0; i < data3.length; i++) {
                    let role = data3[i].title
                    roleArray.push(role)
                }
 
                inquirer.prompt([
                    {
                        type:'list',
                        name:'role',
                        message:"What role would you like the employee to have?",
                        choices: roleArray
                    }
                ]).then(function(results) {
 
                    //MySQL call that will select role id based on user selection
                    db.query(`SELECT id FROM role WHERE title = '${results.role}'`, (err, moreresult) => {
                        if (err) throw err;
 
                        //MySQL call that will update a user role based on first and last name
                        const sql = `UPDATE employee  
                                    SET role_id = '${moreresult[0].id}'
                                    WHERE first_name = '${employeefirstname}' AND last_name ='${employeelastname}'`
                        
                        db.query(sql, (err) => {
                            if (err) throw err;
 
                            promptUser();
                        });
                    });
                });
            });
        });
    });
}

//Function to update an employee manager
function updateEmployeeManager() {
    db.query('SELECT first_name, last_name FROM employee', (err, data1) => {
        if (err) throw err;
 
        let employeeArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let employee = `${data1[i].first_name} ${data1[i].last_name}`
 
            employeeArray.push(employee);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update manager?',
                choices: employeeArray
            }
        ]).then(function(data2) {
            let employee =  data2.employee;
            employee = employee.split(" ");
 
            let employeefirstname = employee[0];
            let employeelastname = employee[1]
 
            employeeArray.push('No Manager');
 
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the new manager of this employee?',
                    choices: employeeArray
                }
            ]).then(function(data3) {
                let manager = data3.manager;
                manager = manager.split(" ");
                let managerfirstname = manager[0];
                let managerlastname = manager[1];
 
                let sql = `UPDATE employee
                            SET manager_id = null
                            WHERE first_name = '${employeefirstname}' AND last_name = '${employeelastname}'`
                if (manager[0] != 'No' && manager[1] != 'Manager') {
                    sql = `SELECT id FROM employee WHERE first_name = '${managerfirstname}' AND last_name = '${managerlastname}'`
                }
 
                db.query(sql, (err, data4) => {
                    if (err) throw err;
 
                    if (manager[0] === 'No' && manager[1] === 'Manager') {
                        promptUser();
                    } else {
                        let managerId = data4[0].id;
 
                        let sql2 = `UPDATE employee
                                SET manager_id = ${managerId}
                                WHERE first_name = '${employeefirstname}' AND last_name = '${employeelastname}'`
 
                        db.query(sql2, (err) => {
                            if (err) throw err;
 
                            promptUser();
                        })
                    }
                }) 
            })
        });
    });
}

//Function to delete a department
function deleteDepartment() {
    db.query('SELECT name FROM department', (err, data1) => {
        if (err) throw err;
 
        let deptArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let department = data1[i].name;
 
            deptArray.push(department);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to remove?',
                choices: deptArray
            }
        ]).then(function(data2) {
            let department = data2.department;
 
            const sql = `DELETE FROM department WHERE name = "${department}"`
 
            db.query(sql, (err) => {
                if (err) throw err;
 
                promptUser();
            });
        });
    });
}
 
//Function to delete a role
function deleteRole() {
    db.query('SELECT title FROM role', (err, data1) => {
        if (err) throw err;
 
        let roleArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let role = data1[i].title;
 
            roleArray.push(role);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Which role would you like to remove?',
                choices: roleArray
            }
        ]).then(function(data2) {
            let role = data2.role;
 
            const sql = `DELETE FROM role WHERE title = "${role}"`
 
            db.query(sql, (err) => {
                if (err) throw err;
 
                promptUser();
            });
        });
    });
}

//Function to delete an employee
function deleteEmployee() {
    db.query('SELECT first_name, last_name FROM employee', (err, data1) => {
        if (err) throw err;
        let employeeArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let employee = `${data1[i].first_name} ${data1[i].last_name}`;
 
            employeeArray.push(employee);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to remove?',
                choices: employeeArray
            }
        ]).then(function(data2) {
            let employee = data2.employee;
            employee = employee.split(" ");
            employeefirstname = employee[0];
            employeelastname = employee[1];
 
            const sql = `DELETE FROM employee WHERE first_name = "${employeefirstname}" AND last_name = "${employeelastname}"`
 
            db.query(sql, (err) => {
                if (err) throw err;
 
                promptUser();
            });
        });
    });
}

//Function to view employees by manager
function viewEmployeeByManager() {
    db.query('Select manager_id from employee', (err, data1) => {
        if (err) throw err
 
        let managerIdArray = []
 
        for (let i = 0; i < data1.length; i++) {
            managerId = data1[i].manager_id;
            managerIdArray.push(managerId);
        }
 
        managerIdArray = [... new Set(managerIdArray)];
        managerIdArray = managerIdArray.filter((n) => n);
 
        let sqlText = `WHERE id = '${managerIdArray[0]}' `
 
        for (let i = 1; i < managerIdArray.length; i++) {
            sqlText += `OR id = '${managerIdArray[i]}' `
        }
 
        db.query(`SELECT first_name, last_name FROM employee ${sqlText}`, (err, data2) => {
            if (err) throw err;
 
            let managerArray = [];
 
            for (let i = 0; i < data2.length; i++) {
                let manager= `${data2[i].first_name} ${data2[i].last_name}`;
                managerArray.push(manager);
            }
 
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Which manager whould you like to see the employee list?',
                    choices: managerArray
                }
            ]).then(function(data3) {
                let manager = data3.manager;
                manager = manager.split(" ");
                let managerfirstname = manager[0];
                let managerlastname = manager[1];
 
                const sql1= `Select id FROM employee WHERE first_name = "${managerfirstname}" OR last_name = "${managerlastname}"`
                db.query(sql1, (err, data4) => {
                    if (err) throw err;
                    let managerID = data4[0].id
 
                    const sql2 = `SELECT id, first_name, last_name FROM employee WHERE manager_id = ${managerID}`
                    db.query(sql2, (err, data5) => {
                        if (err) throw err;
 
                        const transformed = data5.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
                        console.log(`Employee list of the ${data3.manager} :`)
                        console.table(transformed);
 
                        promptUser();
                    })
                })
            })
        });
    })
}

//Function to display employees by role
function viewEmployeeByRole() {
   
 
    db.query("Select title FROM role", (err, data1) => {
        if (err) throw err;
 
        let roleArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let role = data1[i].title;
 
            roleArray.push(role)
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role would you like to see an employee list?',
                choices: roleArray
            }
        ]).then(function(data2) {
            const role = data2.role
            db.query(`SELECT id FROM role WHERE title = '${role}'`, (err, data3) => {
                if (err) throw err;
 
                const id = data3[0].id;
 
                db.query(`SELECT id, first_name, last_name FROM employee WHERE role_id = ${id}`, (err, data4) => {
                    if (err) throw err;
 
                    const transformed = data4.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
                    console.log(`Employee list of ${role}:`)
                    console.table(transformed);
 
                    promptUser();
                })
            })
        })
    })
}
 
//Function to display employees by department
function viewEmployeeByDept() {
    db.query('SELECT name FROM department', (err, data1) => {
        let deptArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let department = data1[i].name;
 
            deptArray.push(department);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department do you want to see employees?',
                choices: deptArray
            }
        ]).then(function(data2) {
            const department = data2.department;
 
            db.query(`SELECT id FROM department WHERE name = '${department}'`, (err, data3) => {
                let deptId = data3[0].id;
 
                db.query(`SELECT id FROM role WHERE department_id = ${deptId}`, (err, data4) => {
                    if (err) throw err;
 
                    let sqlText = `WHERE employee.role_id = '${data4[0].id}' `
 
                    
                    for(let i = 1; i < data4.length; i++) {
                        sqlText += `OR employee.role_id = '${data4[i].id}' `
                    }
 
                    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary
                                FROM employee JOIN role ON employee.role_id = role.id ${sqlText} `
                    db.query(sql, (err, data5) => {
                        if (err) throw err;
 
                        const transformed = data5.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
                        console.log(`Employee list of the ${department} Department:`)
                        console.table(transformed);
                        
                        promptUser();
                    })
                })
            });
        });
    });
}

//Function to view a department's budget
function viewDeptBudget() {
    db.query('SELECT name FROM department', (err, data1) => {
        let deptArray = [];
 
        for (let i = 0; i < data1.length; i++) {
            let department = data1[i].name;
 
            deptArray.push(department);
        }
 
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department budget would you like to see?',
                choices: deptArray
            }
        ]).then(function(data2) {
            const department = data2.department;
 
            db.query(`SELECT id FROM department WHERE name = '${department}'`, (err, data3) => {
                let deptId = data3[0].id;
 
                db.query(`SELECT id FROM role WHERE department_id = ${deptId}`, (err, data4) => {
                    if (err) throw err;
 
                    let sqlText = `WHERE employee.role_id = '${data4[0].id}' `
 
                    
                    for(let i = 1; i < data4.length; i++) {
                        sqlText += `OR employee.role_id = '${data4[i].id}' `
                    }
 
                    const sql = `SELECT employee.id, role.salary FROM employee
                                JOIN role ON employee.role_id = role.id ${sqlText}`
                    db.query(sql, (err, data5) => {
                        if (err) throw err;
 
                        let deptSalary = 0;
 
                        for(let i = 0; i < data5.length; i++) {
                            let salary = parseInt(data5[i].salary)
                            deptSalary = deptSalary + salary;
                        }
 
                        console.log(`The budget of the ${department} Department is $${deptSalary}.`)
                        promptUser();
                    });
                });
            });
        });
    });
}
 
// connects to mySQL
db.connect(err => {
    if (err) throw err;
    console.log()
})
 
// starts the applicaiton
initialize();