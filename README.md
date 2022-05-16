# Staff Hub (Employee Tracker)
[Unit 12, SQL Assignment]

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  (This is a working draft - assignment not yet submitted.)

  ---
  ## Description

 This is a command-line application that manages a company's employee database using Node.js, Inquirer, and MySQL.

 A **walkthrough video** that demonstrates the functionality of this employee tracker can be [viewed here](link).

  ---
  ## Table of Contents
  1. [Title](#title)
  2. [Description](#description)
  3. [Installation](#installation)
  4. [Usage](#usage)
  5. [License](#license)
  6. [Contributing](#contributing)
  7. [Tests](#tests)
  8. [Credits](#credits)
  9. [Author](#author)
  10. [Questions](#questions)
  
  ---
  ## Installation
  Clone my repository on GitHub.

  
  ---
  ## Usage
  Please see the video and screenshots.

  ### Features and Functionalities
  
1. When the user starts the application, the user is presented with the following options:
    * view all departments,
    * view all roles,
    * view all employees,
    * add a department,
    * add a role,
    * add an employee, 
    * update an employee role,
    * update an employee's manager,
    * delete a department,
    * delete a role,
    * delete an employee,
    * view employees by manager,
    * view employees by role,
    * view employees by department, and
    * view a department budget.

2. When the user chooses to view all departments, the user is presented with a formatted table showing department names and department ids.

3. When the user chooses to view all roles, the user is presented with the job title, role id, the department that role belongs to, and the salary for that role.

4. When the user chooses to view all employees, the user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

5. When the user chooses to add a department, the user is prompted to enter the name of the department and that department is added to the database.

6. When the user chooses to add a role, the user is prompted to enter the name, salary, and department for the role and that role is added to the database.

7. When the user chooses to add an employee, the user is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.

8. When the user chooses to update an employee role, the user is prompted to select an employee to update and their new role, and this information is updated in the database. 

9. When the user chooses to update an employee's manager, the user is prompted to select an employee to update and their new manager, and this information is updated in the database.

10. When a user chooses to delete a department, the user is prompted to select the department and this information is updated in the database.

11. When the user chooses to delete a role, the user is prompted to select the role and this information is updated in the database.

12. When the user chooses to delete an employee, the user is prompted to select the employee and this information is upadted in the database.

13. When the user chooses to view employees by manager, the user is presented with a formatted table showing the (rank and file) employee data, including employee ID, first names, and last names.

14. When the user chooses to view employees by role, the user is presented with a formatted table showing (rank and file) employee data, including employee ID, first names, and last names.

15. When the user chooses to view employees by department, the user is presented with a formatted table showing all employees in the department and their employee data, including employee ID, first names, last names, title, and salary.

user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
    
16. When the user chooses to view the budget of a department, the user is prompted to select the department and is presented with the total utilized budget of a department&mdash;, which is the combined salaries of all employees in that department.

  ---
  ## License
  License used for this project - MIT
  
  For more information on the above license and other license types, please see the following websites:  
  - [Open Source Initiative](https://opensource.org/licenses)
  - [Choose a License](https://choosealicense.com/)

  ---
  ## Contributing
  To contribute to this application, please email the author for guidelines.

  ---
  ## Tests
  Test 1

  ---
  ## Credits
  The following were consulted and used in the development of this application:

  * UCI Boot Camp study materials, videos, and internet resources on MySQL, Node.js, Express, and Inquirer.
  * Jeff Howell and Mike Scharf for the homework walk-through videos (The videos are a big help. Thanks for putting them together and sharing them in the meeting room!).
  * [npmjs](https://www.npmjs.com/) packages and documentations on MySQL, MySQL2, Node.js, Inquirer, and Express.js.
  * [Screencastify](https://www.screencastify.com/?gclid=Cj0KCQjwmuiTBhDoARIsAPiv6L86ZrfuA4fljlKNWMKXRVVi_qKME9cQVwPHjmFd-rb_OYqJlURxmx8aAuTSEALw_wcB)

  ---
  ## Author
  Jane Tiglao

  ---
  ## Questions
  For questions or issues, please contact: 
  - Jane Tiglao 
  - Email: janeytiglao@gmail.com
  - GitHub Username: jbtiglao
  - GitHub Profile: https://github.com/jbtiglao

