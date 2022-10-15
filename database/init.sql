CREATE USER postgresql;
CREATE DATABASE internal_talent_marketplace;
GRANT ALL PRIVILEGES ON DATABASE internal_talent_marketplace TO postgresql;

DROP TABLE IF EXISTS empl_position;
CREATE TABLE empl_position(
	id BIGSERIAL PRIMARY KEY,
	description VARCHAR(1000)
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
	id BIGSERIAL PRIMARY KEY,
	first_name VARCHAR(60) NOT NULL,
	last_name VARCHAR(60) NOT NULL,
	phone_number BIGINT UNIQUE NOT NULL,
	email VARCHAR(250) UNIQUE NOT NULL,
	position_id BIGINT REFERENCES empl_position(id),
	cv_link VARCHAR(1000) UNIQUE,
	image_url VARCHAR(1000),
	date_hired DATE,
	active BOOLEAN DEFAULT TRUE,
	sex VARCHAR(6) NOT NULL,
	grade VARCHAR(20)
);

INSERT INTO empl_position (description) VALUES
('Java developer'),
('Backend developer'),
('Software Engeneer'),
('Designer'),
('Project Manager'),
('Team lead');

INSERT INTO employees (first_name, last_name, phone_number, email, position_id, date_hired, sex, grade) VALUES
('Vasya', 'Pupkin', +79999999999, 'email@gmail.com', 1, NOW(), 'male', 'middle'),
('Pro', 'Designer', +79999889999, 'emaildesigner@gmail.com', 4, NOW(), 'female', 'senior'),
('user', 'user', +77777777777, 'email_user@gmail.com', 2, NOW(), 'male', 'junior'),
('user1', 'user1', +77777777788, 'email_user1@gmail.com', 2, NOW(), 'male', 'junior'),
('user2', 'user2', +77777777799, 'email_user2@gmail.com', 3, NOW(), 'male', 'middle'),
('user3', 'user3', +77777777766, 'email_user3@gmail.com', 4, NOW(), 'female', 'junior'),
('user4', 'user4', +77777777755, 'email_user4@gmail.com', 5, NOW(), 'male', 'trainee'),
('user5', 'user5', +77777777744, 'email_user5@gmail.com', 1, NOW(), 'male', 'junior'),
('user6', 'use6', +77777777733, 'email_user6@gmail.com', 6, NOW(), 'female', 'team lead'),
('user7', 'use7', +77777777722, 'email_user7@gmail.com', 2, NOW(), 'male', 'junior'),
('user8', 'user8', +77777777711, 'email_user8@gmail.com', 4, NOW(), 'female', 'junior'),
('user9', 'user9', +77777777700, 'email_user9@gmail.com', 1, NOW(), 'male', 'junior'),
('user10', 'user10', +77727477797, 'email_user10@gmail.com', 5, NOW(), 'female', 'trainee');