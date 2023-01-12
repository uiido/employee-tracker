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
    const [roles] = await selectAllNameAndValue('role', 'job_title', 'id');
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
    const [departments] = await selectAllNameAndValue('department', 'name', 'id');
    const responses = await inquirer
        .prompt([
            {
                name: 'job_title',
                type: 'input',
                message: 'What is the new role? ',
            },
            {
                name: 'salary',
                type: 'number',
                message: "What is this job title's salary? ",
            },
            {
                name: 'department',
                type: 'list',
                choices: departments,
                message: 'What department is this job title in? '
            }
        ])

    departments.forEach(department => {
        if (department.name === responses.department) {
            responses.department = department.id;
        }
    });

    .then((answers) => {
        insert('role', answers);
    });
}

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
// "Managers" don't appear in employee list
// Add role does not seem to work correctly - runs properly but then gives an error on submit

// Update employee not working properly