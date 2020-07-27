# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: sfh
# Generation Time: 2020-07-27 4:50:05 AM +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table log_audit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log_audit`;

CREATE TABLE `log_audit` (
  `id` varchar(200) COLLATE utf32_bin NOT NULL,
  `sec_user_email` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `action_date` datetime NOT NULL,
  `module` varchar(100) COLLATE utf32_bin NOT NULL,
  `action` varchar(50) COLLATE utf32_bin NOT NULL,
  `table_name` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `operation` varchar(50) COLLATE utf32_bin DEFAULT NULL,
  `key` int(11) unsigned DEFAULT NULL,
  `parameter` text COLLATE utf32_bin,
  `new_value` text COLLATE utf32_bin,
  `old_value` text COLLATE utf32_bin,
  `notes` text COLLATE utf32_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table m_class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class`;

CREATE TABLE `m_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned NOT NULL,
  `code` varchar(10) COLLATE utf32_bin NOT NULL,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `description` varchar(200) COLLATE utf32_bin DEFAULT '',
  `avatar` text COLLATE utf32_bin,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_class_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table m_class_member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_member`;

CREATE TABLE `m_class_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `sec_group_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `sec_group_id` (`sec_group_id`),
  CONSTRAINT `m_class_member_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_member_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_member_ibfk_3` FOREIGN KEY (`sec_group_id`) REFERENCES `sec_group` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table m_param
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_param`;

CREATE TABLE `m_param` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `value` text COLLATE utf32_bin,
  `description` varchar(100) COLLATE utf32_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

LOCK TABLES `m_param` WRITE;
/*!40000 ALTER TABLE `m_param` DISABLE KEYS */;

INSERT INTO `m_param` (`id`, `name`, `value`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'0000004E000000410000004D00000045','',X'000000610000007000000070000000200000006E000000610000006D00000065',1,'2020-07-20 17:54:38',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(2,X'000000530000004C0000005500000047','',X'000000610000006200000062000000720000006500000076000000690000006100000074000000690000006F0000006E',1,'2020-07-23 21:01:11',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(3,X'00000055000000500000004C0000004F00000041000000440000005F000000440000004900000052','',X'00000066000000690000006C000000650000002000000075000000700000006C0000006F0000006100000064000000200000006400000069000000720000006500000063000000740000006F0000007200000079',1,'2020-07-20 17:54:38',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(4,X'0000004D00000041000000490000004C0000005F000000490000004E00000054000000450000005200000056000000410000004C0000005F000000560000004500000052000000490000004600000049000000430000004100000054000000490000004F0000004E',X'31',X'000000680000006F0000007500000072',1,'2020-07-23 20:58:04',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(5,X'0000004D00000041000000490000004C0000005F000000490000004E00000054000000450000005200000056000000410000004C0000005F000000460000004F00000052000000470000004F000000540000005F00000050000000410000005300000053000000570000004F0000005200000044',X'E388B4',X'000000680000006F0000007500000072',1,'2020-07-23 20:57:58',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(6,X'000000540000004F0000004B000000450000004E0000005F00000056000000410000004C0000004900000044000000490000005400000059',X'E388B4',X'000000680000006F0000007500000072',1,'2020-07-23 21:01:11',X'00000053000000590000005300000054000000450000004D',NULL,NULL);

/*!40000 ALTER TABLE `m_param` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table m_school
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school`;

CREATE TABLE `m_school` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `code` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `zipcode` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `avatar` text CHARACTER SET utf8 COLLATE utf8_bin,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_school_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_member`;

CREATE TABLE `m_school_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `sec_group_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `sec_group_id` (`sec_group_id`),
  CONSTRAINT `m_school_member_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_member_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_member_ibfk_3` FOREIGN KEY (`sec_group_id`) REFERENCES `sec_group` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table m_subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_subject`;

CREATE TABLE `m_subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  CONSTRAINT `m_subject_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table sec_confirmation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_confirmation`;

CREATE TABLE `sec_confirmation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '' COMMENT 'email verification, forgot passwprd, etc.',
  `sec_registrant_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned DEFAULT NULL,
  `sender_addr` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `is_sent` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_registrant_id` (`sec_registrant_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `sec_confirmation_ibfk_1` FOREIGN KEY (`sec_registrant_id`) REFERENCES `sec_registrant` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `sec_confirmation_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sec_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_group`;

CREATE TABLE `sec_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

LOCK TABLES `sec_group` WRITE;
/*!40000 ALTER TABLE `sec_group` DISABLE KEYS */;

INSERT INTO `sec_group` (`id`, `name`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'0000004F000000770000006E0000006500000072',1,'2020-07-13 10:45:17',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(2,X'0000004D00000061000000690000006E00000074000000650000006E0000006500000072',1,'2020-07-13 10:45:31',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(3,X'0000005000000061000000720000007400000069000000630000006900000070000000610000006E00000074',1,'2020-07-13 10:45:31',X'00000053000000590000005300000054000000450000004D',NULL,NULL),
	(4,X'0000004700000075000000650000007300000074',1,'2020-07-13 10:45:31',X'00000053000000590000005300000054000000450000004D',NULL,NULL);

/*!40000 ALTER TABLE `sec_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sec_registrant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_registrant`;

CREATE TABLE `sec_registrant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf32_bin NOT NULL,
  `username` varchar(100) COLLATE utf32_bin DEFAULT '',
  `password` varchar(100) COLLATE utf32_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT '0',
  `phone` varchar(15) COLLATE utf32_bin DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table sec_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_token`;

CREATE TABLE `sec_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_user_id` int(11) unsigned NOT NULL,
  `token` text COLLATE utf32_bin NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `sec_token_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table sec_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_user`;

CREATE TABLE `sec_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf32_bin NOT NULL,
  `username` varchar(100) COLLATE utf32_bin DEFAULT '',
  `password` varchar(100) COLLATE utf32_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT '0',
  `phone` varchar(15) COLLATE utf32_bin DEFAULT '',
  `is_phone_validated` tinyint(4) DEFAULT '0',
  `avatar` text COLLATE utf32_bin,
  `auth_provider` tinyint(4) NOT NULL DEFAULT '0',
  `auth_profile_id` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `auth_data` text COLLATE utf32_bin,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table t_task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task`;

CREATE TABLE `t_task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_subject_id` int(11) unsigned NOT NULL,
  `m_class_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL COMMENT 'user assignor a task, in this case a teacher',
  `title` varchar(100) COLLATE utf32_bin NOT NULL,
  `notes` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `weight` decimal(4,2) DEFAULT '0.00',
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_subject_id` (`m_subject_id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_task_ibfk_1` FOREIGN KEY (`m_subject_id`) REFERENCES `m_subject` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_ibfk_2` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table t_task_collection
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task_collection`;

CREATE TABLE `t_task_collection` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL COMMENT 'user that given finished task, in this case student',
  `submitted_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_task_collection_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_collection_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table t_task_collection_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task_collection_file`;

CREATE TABLE `t_task_collection_file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_collection_id` int(11) unsigned NOT NULL,
  `filename` varchar(100) COLLATE utf32_bin NOT NULL,
  `ext` varchar(10) COLLATE utf32_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `sequence` mediumint(8) unsigned DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_collection_id` (`t_task_collection_id`),
  CONSTRAINT `t_task_collection_file_ibfk_1` FOREIGN KEY (`t_task_collection_id`) REFERENCES `t_task_collection` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;



# Dump of table t_task_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task_file`;

CREATE TABLE `t_task_file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_id` int(11) unsigned NOT NULL,
  `filename` varchar(100) COLLATE utf32_bin NOT NULL,
  `ext` varchar(10) COLLATE utf32_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `sequence` mediumint(8) unsigned DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  CONSTRAINT `t_task_file_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
