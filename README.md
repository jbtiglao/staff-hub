# Staff Hub 💻
[Unit 12, SQL - Employee Management System Assignment]

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ---
  ## Description 📌  
 This is a command-line application that manages a company's employee database using Node.js, Inquirer, and MySQL.

 It follows a content management systems (CMS) interface that allows non-developers to easily view and interact with information stored in the database.
 
 The application has the following **appearance**:
 
![image16_appearance](https://user-images.githubusercontent.com/94569484/168509879-de4e1a31-177a-4a61-ae9c-d1f71960bfb2.png)


 A **walkthrough video** that demonstrates the features and functionalities of this employee tracker can be viewed by clicking the following links:

 * [Part 1, View and Add Functionalities](https://drive.google.com/file/d/1XGdWUR5o0W7IQ5scTarA3xXjIai0W4f7/view)

 * [Part 2, Update an Employee's Role](https://drive.google.com/file/d/1BFbU6JDcSLQikF3hIydT3cs2QxQeHbnl/view)
 
 * [Part 3, Update an Employee's Manager and Delete Functions](https://drive.google.com/file/d/1qOxctsT7UeGaynuBZEZPNzgDqyn4IJ5D/view)
 
 * [Part 4, View Employees by Manager, Role, and Department and View a Department Budget](https://drive.google.com/file/d/1UppseuZeD2Z0sTc8QZIJ7TpGcD_jS_GF/view)

The **application files** can be accessed on my [Github repository](https://github.com/jbtiglao/staff-hub).


  ---
  ## Table of Contents 📌  
  1. [Title](#title)
  2. [Description](#description)
  3. [Installation](#installation)
  4. [Usage](#usage)
  5. [Technologies](#technologies)
  6. [License](#license)
  7. [Contributing](#contributing)
  8. [Tests](#tests)
  9. [Credits](#credits)
  10. [Author](#author)
  11. [Questions](#questions)
  
  ---
  ## Installation 📌  
  * Clone my repository on GitHub.

  * On Visual Studio Code:
      * Open the cloned file.
      * Create your `gitignore` and `.env` files.
      * Check the `dependencies` and `dev dependencies` needed on `package.json`.

  * To set up all the existing npm packages, run `npm in it`.

  * To install the `dependencies` on the `node_modules` folder, run `npm install` or
      * `npm i mysql2` to install MySQL2,
      * `npm i inquirer` to install Inquirer,
      * `npm i node` to install Node.js, and
      * `npm i console.table` to install console.table.
  
  * Run MySQL by entering the following:

    ```
    mysql -u root -p
    ```
        
  * Create the `schema.sql` tables and pre-populate the database with the data found in the `seeds.sql` files. 

  * To invoke the application, run

    ```
    npm start
    ```

  ---
  ## Usage 📌
  Please see the walk-through demonstration videos, descripton, and features and functionalities sections.

### Features and Functionalities 🔌
  
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

![image1_banner-and-prompts](https://user-images.githubusercontent.com/94569484/168504033-7faa0f7d-1366-48bc-89c5-1ac583bddf4b.png)


2. When the user chooses to view all departments, the user is presented with a formatted table showing department names and department ids.

![image2_view-all-depts](https://user-images.githubusercontent.com/94569484/168504095-e1c65da9-b859-4210-bb8e-c0b1a908aff8.png)


3. When the user chooses to view all roles, the user is presented with the job title, role id, the department the role belongs to, and the salary for the role.


![image3_view-all-roles](https://user-images.githubusercontent.com/94569484/168504159-6e994598-81f6-4034-b07f-9cdbd04e8273.png)


4. When the user chooses to view all employees, the user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers the the employees report to.

![image4_view-all-employees](https://user-images.githubusercontent.com/94569484/168504255-9bcc8fce-a8b9-4197-9c94-9563b39b0929.png)


5. When the user chooses to add a department, the user is prompted to enter the name of the department and the department is added to the database.

![image5_add-dept](https://user-images.githubusercontent.com/94569484/168505252-0f7454d4-b97c-4f8f-91b7-66d8574b294f.png)


6. When the user chooses to add a role, the user is prompted to enter the name, salary, and department for the role and the role is added to the database.

![image6_add-role](https://user-images.githubusercontent.com/94569484/168505312-1fdf2274-e7d9-424d-88cb-fbf5a024a8c5.png)

![image7_add-role2](https://user-images.githubusercontent.com/94569484/168505372-cabc8c31-4edd-4af9-b67a-6bf2eb45f889.png)


7. When the user chooses to add an employee, the user is prompted to enter the employee’s first name, last name, role, and manager, and the employee is added to the database.

![image8_add-employee](https://user-images.githubusercontent.com/94569484/168505177-77749d58-f6c0-4fa4-8a23-e6b6c6d74bb8.png)


8. When the user chooses to update an employee role, the user is prompted to select an employee to update and their new role, and this information is updated in the database. 

![image9_update-roll](https://user-images.githubusercontent.com/94569484/168505767-9ca8c15e-ad7a-4171-80a9-5c0e492d05d8.png)


9. When the user chooses to update an employee's manager, the user is prompted to select an employee to update and their new manager, and this information is updated in the database.

![image10_update-manager](https://user-images.githubusercontent.com/94569484/168505910-0e7d1b85-21ae-4785-a51f-c3f9f9d6a123.png)


10. When a user chooses to delete a department, the user is prompted to select the department and this information is updated in the database.

![image13_delete-dept](https://user-images.githubusercontent.com/94569484/168506673-0e31a7da-a48c-4aa2-8d7a-13f2539e0b58.png)


11. When the user chooses to delete a role, the user is prompted to select the role and this information is updated in the database.

![image12_delete-role](https://user-images.githubusercontent.com/94569484/168506287-816d73cc-ef65-45c5-874a-017306fe1286.png)


12. When the user chooses to delete an employee, the user is prompted to select the employee and this information is updated in the database.

![image11_delete-employee](https://user-images.githubusercontent.com/94569484/168506135-dc391ae9-088b-4709-b6e8-1b45dcd98a45.png)


13. When the user chooses to view employees by manager, the user is presented with a formatted table showing the (rank and file) employees who report to the said manager, and their data which include their employee ID, first names, and last names.

14. When the user chooses to view employees by role, the user is presented with a formatted table showing the (rank and file) employees who perform the said role, and their data which include their employee ID, first names, and last names.

15. When the user chooses to view employees by department, the user is presented with a formatted table showing all employees in the said department (i.e., managerial and rank and file) and their employee data which include their employee ID, first names, last names, title, and salary.

![image14_view-employees-by-mngr-role-dept png](https://user-images.githubusercontent.com/94569484/168506841-82bec790-6439-4c54-9153-8097819cdb3a.png)

16. When the user chooses to view the budget of a department, the user is prompted to select the department and is presented with the total utilized budget of a department, which is the combined salaries of all employees in that department.

![image15_view-dept-budget](https://user-images.githubusercontent.com/94569484/168507675-d55fc8d2-7cef-4f44-923f-3f362db2d23d.png)


  ---

  ## Technologies
  1. Javascript
  2. MySQL
  3. Node.js
  4. Inquirer

  ---
  ## License 📌  
  License used for this project - MIT
  
  For more information on the above license and other license types, please see the following websites:  
  - [Open Source Initiative](https://opensource.org/licenses)
  - [Choose a License](https://choosealicense.com/)

  ---
  ## Contributing 📌
  To contribute to this application, please email the author for guidelines.

  ---
  ## Tests 📌
  The application and its functionalities are tested manually using Visual Studio Code. 

  ---
  ## Credits 📌  
  The following were consulted and used in the development of this application:

  * UCI Boot Camp study materials, videos, and internet resources on MySQL, Node.js, and Inquirer.
  * Jeff Howell and Mike Scharf for the homework walk-through videos (Thanks for putting them together and sharing them in the meeting room. They are a big help!).
  * The grader for my Social Media API assignment, whose comments encouraged me to plow through with my employee tracker app -- an assignment I considered to be one of the hardest and most tedious to do -- and not give up and submit subpar work. The grader also taught me the standard that I should keep when writing my README files. *Thank you!* 
  * [mySQL](https://www.mysql.com/)
  * [Node.js](https://nodejs.org/en/)
  * [npmjs](https://www.npmjs.com/) packages and documentations on MySQL2, Node.js, Inquirer, and Express.js.
  * [Screencastify](https://www.screencastify.com/?gclid=Cj0KCQjwmuiTBhDoARIsAPiv6L86ZrfuA4fljlKNWMKXRVVi_qKME9cQVwPHjmFd-rb_OYqJlURxmx8aAuTSEALw_wcB)

  ---
  ## Author 📌
  Jane Tiglao

  ---
  ## Questions 📌
  For questions or issues, please contact: 
  - Jane Tiglao 
  - Email: janeytiglao@gmail.com
  - GitHub Username: jbtiglao
  - GitHub Profile: https://github.com/jbtiglao

