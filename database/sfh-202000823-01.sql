ALTER TABLE `t_class_task_collection` ADD `content` TEXT CHARACTER SET utf8 COLLATE utf8_bin NULL AFTER `submitted_date`; 
ALTER TABLE `t_class_task` CHANGE `t_class_subject_id` `t_class_subject_id` INT(11) UNSIGNED NULL; 

CREATE TABLE `t_class_task_collection_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_class_task_collection_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `published_datetime` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_class_task_collection_id` (`t_class_task_collection_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_class_task_collection_comment_ibfk_1` FOREIGN KEY (`t_class_task_collection_id`) REFERENCES `t_class_task_collection` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_class_task_collection_comment_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;