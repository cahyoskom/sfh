ALTER TABLE `t_class` ADD UNIQUE(`code`);
ALTER TABLE `t_school` ADD UNIQUE(`code`);
ALTER TABLE `t_class_task_file` ADD `link` VARCHAR(1000) NULL DEFAULT NULL AFTER `sequence`;
ALTER TABLE `t_school` CHANGE `avatar` `avatar` LONGTEXT CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;
ALTER TABLE `t_class` CHANGE `avatar` `avatar` LONGTEXT CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;
ALTER TABLE `sec_user` CHANGE `avatar` `avatar` LONGTEXT CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;
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

ALTER TABLE `t_notification_user` ADD CONSTRAINT `t_notification_user_ibfk_2` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`);
ALTER TABLE `m_notification_type` ADD `activity` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' AFTER `content_url`;
ALTER TABLE `m_notification_type` CHANGE `content_url` `content_url` varchar(1000) NULL DEFAULT NULL;
ALTER TABLE `m_notification_type` CHANGE `action_yes` `action_yes` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;
ALTER TABLE `m_notification_type` CHANGE `action_no` `action_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL DEFAULT NULL;
INSERT INTO `m_notification_type` (`id`, `type`, `content`, `content_url`, `activity`, `action_yes`, `action_no`, `status`) VALUES
  (1, 'CLASS_ACCEPT_USER', 'Anda di terima di kelas 12A', '/', 'Pemberitahuan penerimaan kelas', '/', '/', 1),
  (2, 'CLASS_CHANGE_INFO', 'jam kelas anda berubah menjadi jam ', '/', 'Pemberitahuan penggantian kelas', '/', '/', 1),
  (3, 'CLASS_REJECT_USER', 'Anda ditolak untuk bergabung pada', '/notification/setting', 'Pemberitahuan ditolak pada kelas', '/notification/setting', '/notification/setting', 1),
  (4, 'CLASS_ACCEPT_SCHOOL', 'Anda diterima di ', '/notification/setting', 'Pemberitahuan penerimaan kelas', '/notification/setting', '/notification/setting', 1),
  (5, 'SCHOOL_ACCEPT_CLASS', 'kelas anda diterima di sekolah ', '/notification/setting', 'Pemberitahuan penerimaan kelas di sekolah', '/notification/setting', '/notification/setting', 1),
  (6, 'SCHOOL_CHANGE_INFO', 'Sekolah anda sekarang bernama', '/notification/setting', 'Pemberitahuan perubahan nama sekolah', '/notification/setting', '/notification/setting', 1),
  (7, 'USER_REQUEST_CLASS', 'Ingin bergabung ke ', '/notification', 'Pemberitahuan permintaan bergabung', '/notification', '/notification', 1),
  (8, 'CLASS_REMOVE_USER', 'menghapus user', NULL, 'Pemberitahuan penghapusan user pada kelas', NULL, NULL, 1),
  (9, 'CLASS_REQUEST_SCHOOL', 'meminta bergabung dengan sekolah', NULL, 'Pemberitahuan permintaan kelas pada sekolah', NULL, NULL, 1);
