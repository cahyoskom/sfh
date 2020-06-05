alter table fk_t_student drop foreign key t_student_class;
ALTER TABLE t_student ADD FOREIGN KEY fk_t_student_class (class_id) REFERENCES m_class(class_id);
