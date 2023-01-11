USE employee_db;

INSERT INTO department (name)
    VALUES 
    ('Art'),
    ('Sound'),
    ('Writing'),
    ('Acting');

INSERT INTO role (title, salary, department_id)
    VALUES
    ('Lead Animator', 60000, 1),
    ('Animator', 40000, 1),
    ('Concept Artist', 50000, 1),
    ('Background Painter', 40000, 1),
    ('Composer', 45000, 2),
    ('Foley Artist', 40000, 2),
    ('Singer', 60000, 2),
    ('Screenwriter', 60000, 3),
    ('Storyboarder', 60000, 3),
    ('Actor', 65000, 4),
    ('Extra Voices', 35000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('William', 'Hanna', 2, null),
    ('Joseph', 'Barbera', 3, 1),
    ('Tyrus', 'Wong', 1, 1),
    ('Toby', 'Bluth', 4, 1),
    ('Joe', 'Hisaishi', 5, null),
    ('Jimmy', 'MacDonald', 6, 5),
    ('Idina', 'Menzel', 7, 5),
    ('Brad', 'Bird', 8, null),
    ('Wes', 'Anderson', 9, 8),
    ('Jim', 'Cummings', 10, null),
    ('Mel', 'Blanc', 11, 10);