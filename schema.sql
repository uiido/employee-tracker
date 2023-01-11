DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE
    department (
        department_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    role (
        role_id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (department_id) REFERENCES departments(departments_id)
    );

CREATE TABLE
    employee (
        employee_id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        manager_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
    );