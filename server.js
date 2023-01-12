// What to install and use
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

// Database connection
const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
});

// Delivers results for all prompts
const selectAll = async (table, display) => {
    const results = await db.promise().query('SELECT * FROM ' + table);
    if (display) {
        console.table(results[0]);
        return init();
    }
    return results;
};

// Inserts data for new field
const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
        if (err) return console.error(err);
        console.log('Successfully added!');
        init();
    });
};

// Returns all employees' values
const selectAllNameAndValue = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
};

// Returns all employees' information
const employeeInfo = async () => {
    const statement = `
SELECT
  employee.id,
  employee.first_name,
  employee.last_name,
  role.job_title,
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
    init();
};

// Function that creates new employees 
const addNewEmployee = async () => {
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

// Function that edits employees
const updateEmployee = async () => {
    db.query('Select * FROM employee', async (err, employees) => {
        if (err) throw err;
        const employeeSelected = await inquirer
            .prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    choices: employees.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id })),
                    message: 'Whose job title would you like to update? ',
                }
            ])
        db.query('Select * FROM role', async (err, roles) => {
            if (err) throw err;
            const roleSelected = await inquirer
                .prompt([
                    {
                        name: 'role_id',
                        type: 'list',
                        choices: roles.map(role => ({ name: role.title, value: role.id })),
                        message: 'What is their new job title?',
                    }
                ])
            db.query(
                'UPDATE employees_db.employee SET ? WHERE ?',
                [
                    {
                        role_id: roleSelected.role_id,
                    },
                    {
                        id: employeeSelected.employee_id,
                    }
                ],
                (err) => {
                    if (err) throw err;
                    console.log('This employee has been successfully updated!')
                    innit();
                }
            )
        })
    })
}

// Function that creates new department
const addNewDepartment = async () => {
    prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What\'s the name of department you would like to add?'
        }
    ]).then((answers) => {
        insert('department', answers);
    });
};

// Function that creates new role
const addNewRole = async () => {
    const [departments] = await selectAllNameAndValue('department', 'title', 'id');
    prompt([
        {
            name: 'title',
            message: 'What is the name of this role?',
        },
        {
            type: 'rawlist',
            name: 'department',
            message: 'Which department is this role in?',
            choices: departments,
        }
    ])
        .then((answers) => {
            insert('role', answers);
        });
};

// Function that fufills prompt selections
const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            employeeInfo();
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            selectAll('department', true);
            break;
        }
        case 'VIEW ALL ROLES': {
            selectAll('role', true);
            break;
        }
        case 'ADD AN EMPLOYEE': {
            addNewEmployee();
            break;
        }
        case 'UPDATE AN EMPLOYEE': {
            updateEmployee();
            break;
        }
        case 'ADD A DEPARTMENT': {
            addNewDepartment();
            break;
        }
        case 'ADD A ROLE': {
            addNewRole();
            break;
        }
        case 'EXIT': {
            db.end();
        }
    }
};

// Initialization & prompts
const init = () => {
    prompt({
        type: 'rawlist',
        message: 'Choose one of the following:',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'ADD AN EMPLOYEE',
            'UPDATE AN EMPLOYEE',
            'ADD A DEPARTMENT',
            'ADD A ROLE',
            'EXIT'
        ],
        name: 'type',
    })
        .then((answers) => {
            chooseOption(answers.type);
        });
};

// Runs init function
init();




// Known issues:
// (Will revisit if I have time)
// "Managers" don't appear in ID list
// Add role does not seem to work correctly