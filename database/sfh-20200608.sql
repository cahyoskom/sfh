CREATE TABLE sec_user (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	user_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100)
);


CREATE TABLE sec_token (
	token_id INT AUTO_INCREMENT PRIMARY KEY,
	token TEXT,
	user_id INT,
	valid_until DATETIME,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_sec_token_sec_user (user_id) REFERENCES sec_user(user_id) ON DELETE CASCADE
);

CREATE TABLE sec_group (
	group_id INT AUTO_INCREMENT PRIMARY KEY,
	group_name VARCHAR(100) NOT NULL,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100)
);



CREATE TABLE m_subject (
	subject_id INT AUTO_INCREMENT PRIMARY KEY,
	subject_name VARCHAR(100) NOT NULL,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100)
);

CREATE TABLE m_class (
	class_id INT AUTO_INCREMENT PRIMARY KEY,
	class_level INT NOT NULL,
	class_parallel VARCHAR(10) NOT NULL,
	class_name VARCHAR(100),
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100)
);

CREATE TABLE t_student(
	student_id INT AUTO_INCREMENT PRIMARY KEY,
	student_no VARCHAR(100) NOT NULL,
	student_name VARCHAR(100) NOT NULL,
	sex INT NOT NULL,
	class_id INT,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_t_student_class (class_id) REFERENCES m_class(class_id)
);

CREATE TABLE sec_user_role (
	user_role_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	group_id INT NOT NULL,
	class_id INT,
	subject_id INT,
	student_id INT,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_sec_user_role_sec_user (user_id) REFERENCES sec_user(user_id),
	FOREIGN KEY fk_sec_user_role_sec_group (group_id) REFERENCES sec_group(group_id),
	FOREIGN KEY fk_sec_user_role_m_class (class_id) REFERENCES m_class(class_id),
	FOREIGN KEY fk_sec_user_role_m_subject (subject_id) REFERENCES m_subject(subject_id),
	FOREIGN KEY fk_sec_user_role_t_student (student_id) REFERENCES t_student(student_id)
);

CREATE TABLE t_task (
	task_id INT AUTO_INCREMENT PRIMARY KEY,
	assignor_id INT NOT NULL,
	class_id INT NOT NULL,
	subject_id INT NOT NULL,
	title VARCHAR(100) NOT NULL,
	notes VARCHAR(200),
	weight numeric(4,2) DEFAULT 0,
	start_date DATETIME,
	finish_date DATETIME,
	publish_date DATETIME,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_t_task_sec_user (assignor_id) REFERENCES sec_user(user_id),
	FOREIGN KEY fk_t_task_m_class (class_id) REFERENCES m_class(class_id),
	FOREIGN KEY fk_t_task_m_subject (subject_id) REFERENCES m_subject(subject_id)
);

CREATE TABLE t_task_file (
	task_file_id INT AUTO_INCREMENT PRIMARY KEY,
	task_id INT NOT NULL,
	filename VARCHAR(100) NOT NULL,
	ext VARCHAR(10),
	mime_type VARCHAR(100),
	location VARCHAR(200),
	sequence INT DEFAULT 0,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_t_task_file_t_task (task_id) REFERENCES t_task(task_id)
);

CREATE TABLE t_task_collection (
	task_collection_id INT AUTO_INCREMENT PRIMARY KEY,
	task_id INT NOT NULL,
	student_id INT NOT NULL,
	submitted_date DATETIME,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_t_task_collection_t_task (task_id) REFERENCES t_task(task_id),
	FOREIGN KEY fk_t_task_collection_t_studet (student_id) REFERENCES t_student(student_id)
);

CREATE TABLE t_task_collection_file (
	task_collection_file_id INT AUTO_INCREMENT PRIMARY KEY,
	task_collection_id INT NOT NULL,
	filename VARCHAR(100) NOT NULL,
	ext VARCHAR(10),
	mime_type VARCHAR(100),
	location VARCHAR(200),
	sequence INT DEFAULT 0,
	status INT DEFAULT 0,
	created_date DATETIME,
	created_by VARCHAR(100),
	updated_date DATETIME,
	updated_by VARCHAR(100),
	FOREIGN KEY fk_t_task_collection_file_t_task_collection (task_collection_id) REFERENCES t_task_collection(task_collection_id)
);


INSERT INTO sec_user (user_name, email, password, status, created_date, created_by) VALUES ('admin', 'admin@sakola.co.id', '749f09bade8aca755660eeb17792da880218d4fbdc4e25fbec279d7fe9f65d70', 1, CURRENT_TIMESTAMP(), 'system');

INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('admin', 1, CURRENT_TIMESTAMP(), 'system');
INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('headmaster', 1, CURRENT_TIMESTAMP(), 'system');
INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('home teacher', 1, CURRENT_TIMESTAMP(), 'system');
INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('teacher', 1, CURRENT_TIMESTAMP(), 'system');
INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('guardian', 1, CURRENT_TIMESTAMP(), 'system');
INSERT INTO sec_group (group_name, status, created_date, created_by) VALUES ('student', 1, CURRENT_TIMESTAMP(), 'system');

INSERT INTO sec_user_role (user_id, group_id, status, created_date, created_by) VALUES (1, 1, 1, CURRENT_TIMESTAMP(), 'system');

