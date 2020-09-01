ALTER TABLE `t_class` ADD UNIQUE(`code`);
ALTER TABLE `t_school` ADD UNIQUE(`code`); 
ALTER TABLE `t_class_task_file` ADD `link` VARCHAR(1000) NULL DEFAULT NULL AFTER `sequence`; 