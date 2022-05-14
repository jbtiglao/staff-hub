-- Department seeds
INSERT INTO department (id, name)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

-- Employee role seeds
INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Sales Lead', 100000, 1), 
(2, 'Salesperson', 80000, 1),
(3, 'Lead Engineer', 150000, 2),
(4, 'Software Engineer', 120000, 2), 
(5, 'Account Manager', 160000, 3),
(6, 'Accountant', 125000, 3),
(7, 'Legal Team Lead', 250000, 4),
(8, 'Lawyer', 190000, 4);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, null), --  No manager (Sales)
('Mike', 'Chan', 2, 1), -- Manager is John Doe (1, Sales)
('Ashley', 'Rodriguez', 3, null), -- No manager (Engineering)
('Kevin', 'Tupik', 4, 3), -- Manager is Ashley Rodriguez (3)
('Kumal', 'Singh', 5, null), -- No manager (Finance)
('Malia', 'Brown', 6, 5), -- Manager is Kumal Singh (5)
('Sarah', 'Lourd', 7, null), -- No manager (Legal)
('Tom', 'Allen', 8, 7); -- Manager is Sarah Lourd (7)
