INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES
(2, 'Salesperson', 80000, 1),
(3, 'Lead Engineer', 150000, 2),
(4, 'Software Engineer', 120000, 2),
(5, 'Account Manager', 160000, 3),
(6, 'Accountant', 125000, 3),
(7, 'Legal Team Lead', 250000, 4),
(8, 'Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mike', 'Chan', 2, 'John Doe'),
('Ashley', 'Rodriguez', 3, null),
('Kevin', 'Tupik', 4, 'Ashley Rodriguez'),
('Kumal', 'Singh', 5, null),
('Malia', 'Brown', 6, 'Kumal Singh'),
('Sarah', 'Lourd', 7, null),
('Tom', 'Allen', 8, 'Sarah Lourd');