INSERT INTO department (name)
    VALUES 
    ('Art'),
    ('Sound'),
    ('Writing'),
    ('Acting')

INSERT INTO role (title, salary, department_id)
    VALUES
    ('Concept Artist', 50000, 1),
    ('Lead Animator', 60000, 1),
    ('Animator', 40000, 1),
    ('Background Painter', 40000, 1),
    ('Composer', 45000, 2),
    ('Foley Artist', 40000, 2),
    ('Singer', 60000, 2),
    ('Screenwriter', 60000, 3),
    ('Storyboarder', 60000, 3),
    ('Actor', 65000, 4),
    ('Extra Voices', 35000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('Tyrus', 'Wong', 1),
    ('William', 'Hanna', 2),
    ('Joseph', 'Barbera', 3),
    ('Toby', 'Bluth', 4),
    ('Joe', 'Hisaishi', 5),
    ('Jimmy MacDonald', 6),
    ('Idina', 'Menzel', 7),
    ('Brad', 'Bird', 8),
    ('Wes', 'Anderson', 9),
    ('Jim', 'Cummings', 10),
    ('Mel', 'Blanc', 11)