CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@example.com', 'password123', 'admin');


INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john@example.com', 'password123');



-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(20) CHECK (role IN ('admin', 'user')) DEFAULT 'user',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE courses (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT NOT NULL,
--     image_url VARCHAR(255),  -- URL de una imagen del curso
--     instructor_id INT REFERENCES users(id),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- //Si los usuarios pueden inscribirse en los cursos, necesitarás una tabla que registre esta relación.
-- CREATE TABLE enrollments (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     course_id INT REFERENCES courses(id) ON DELETE CASCADE,
--     enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
