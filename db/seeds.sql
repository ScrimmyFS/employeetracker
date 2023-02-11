INSERT INTO department (name)
VALUES ("Engineering"),
       ("Artist"), 
       ("Musicians");
INSERT INTO role (title, salary, department_id)
VALUES ("Artist", 100000, 2),
       ("Engineer", 50000, 1),
       ("Drummer", 10000000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "Scrimshaw", 3, NULL),
       ("Frank", "Gallagher", 1, 1),
       ("Bill", "Nye", 2, NULL);