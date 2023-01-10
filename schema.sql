DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE instructors (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE courses (
  id INT,
  course_title VARCHAR(30) NOT NULL,
  instructor_id INT,
  order_details TEXT,
  FOREIGN KEY (instructor_id)
  REFERENCES instructors(id)
  ON DELETE SET NULL
);

INSERT INTO instructors (id, first_name, last_name)
  VALUES (1, 'Omari', 'Hardwick');
INSERT INTO courses (id, course_title, instructor_id, order_details)
  VALUES (1, 'Streets Smarts 101', 1, 'Pre Req, learning how to hustle');

SELECT
  courses.id,
  course_title,
  CONCAT(
    first_name,
    ' ',
    last_name
  ) AS instructor
FROM courses
JOIN instructors
ON courses.instructor_id = instructors.id;