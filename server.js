const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');
require('console.table');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
});

const selectAllNameAndValue = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
};

const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employee) => {
                console.table(employee);
                init();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, department) => {
                console.table(department);
                init();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, role) => {
                console.table(role);
                init();
            });
            break;
        }
    }
};

const init = () => {
    prompt({
        type: 'rawlist',
        message: 'Choose one of the following:',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'ADD AN EMPLOYEE',
            'REMOVE AN EMPLOYEE',
            'EXIT'
        ],
        name: 'type',
    })
        .then((answers) => {
            chooseOption(answers.type);
        });
};

init();











const selectAll = async (table, display) => {
    const results = await db.promise().query('SELECT * FROM ' + table);
    if (display) {
        console.table(results[0]);
        return init();
    }
    return results;
};

const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
        if (err) return console.error(err);
        console.log('\nSuccesfully created employee!\n');
        init();
    });
};

const selectAllNameAndValue = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
};

const selectAllEmployeeDetails = async () => {
    const statement = `
SELECT
  employee.id,
  employee.first_name,
  employee.last_name,
  role.title,
  role.salary,
  CONCAT(
    manager.first_name,
    ' ',
    manager.last_name
  ) AS manager
FROM employee
JOIN role
ON employee.role_id = role.id
JOIN employee AS manager
ON employee.manager_id = manager.id
  `
    const [employees] = await db.promise().query(statement);
    console.table(employees);
};

const addEmployee = async () => {
    const [roles] = await selectAllNameAndValue('role', 'title', 'id');
    const [managers] = await selectAllNameAndValue('employee', 'last_name', 'id');
    prompt([
        {
            name: 'first_name',
            message: 'Enter the employee\'s first name.',
        },
        {
            name: 'last_name',
            message: 'Enter the employee\'s last name.',
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'Choose a role for this employee.',
            choices: roles,
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Choose a manager for this employee.',
            choices: managers,
        }
    ])
        .then((answers) => {
            insert('employee', answers);
        });
};

const chooseOption = (type) => {
    switch (type) {
        case 'View All Employees': {
            selectAllEmployeeDetails();
            break;
        }
        case 'View All Departments': {
            selectAll('department', true);
            break;
        }
        case 'View All Roles': {
            selectAll('role', true);
            break;
        }
        case 'Add Employee': {
            addEmployee();
            break;
        }
//         case 'Exit': {
//             connection.end();
//         }
//     }
// };