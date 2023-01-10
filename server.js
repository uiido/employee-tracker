const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql');
require('console.table');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
});

const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                console.table(employees);
            });
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, departments) => {
                console.table(departments);
            });
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles);
            });
        }
    }
};

prompt({

});