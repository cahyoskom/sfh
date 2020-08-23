# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: sfh-dev
# Generation Time: 2020-08-23 08:52:02 +0000
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
  `id` varchar(200) COLLATE utf8_bin NOT NULL,
  `sec_user_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `action_date` datetime NOT NULL,
  `module` varchar(100) COLLATE utf8_bin NOT NULL,
  `action` varchar(50) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `operation` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `key` int(11) unsigned DEFAULT NULL,
  `parameter` text COLLATE utf8_bin,
  `new_value` text COLLATE utf8_bin,
  `old_value` text COLLATE utf8_bin,
  `notes` text COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table m_answer_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_answer_type`;

CREATE TABLE `m_answer_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `m_answer_type` WRITE;
/*!40000 ALTER TABLE `m_answer_type` DISABLE KEYS */;

INSERT INTO `m_answer_type` (`id`, `name`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'424F4F4C45414E',1,'2020-08-15 20:54:38',X'53595354454D',NULL,NULL),
	(2,X'4E554D424552',1,'2020-08-15 20:54:49',X'53595354454D',NULL,NULL),
	(3,X'4F5054494F4E',1,'2020-08-15 20:54:57',X'53595354454D',NULL,NULL),
	(4,X'54455854',1,'2020-08-15 20:55:13',X'53595354454D',NULL,NULL),
	(5,X'4553534159',1,'2020-08-15 20:55:19',X'53595354454D',NULL,NULL),
	(6,X'44415445',1,'2020-08-15 20:55:52',X'53595354454D',NULL,NULL),
	(7,X'54494D45',1,'2020-08-15 20:56:00',X'53595354454D',NULL,NULL),
	(8,X'4441544554494D45',1,'2020-08-15 20:57:30',X'53595354454D',NULL,NULL);

/*!40000 ALTER TABLE `m_answer_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table m_class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class`;

CREATE TABLE `m_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `code` varchar(10) COLLATE utf8_bin NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(200) COLLATE utf8_bin DEFAULT '',
  `avatar` text COLLATE utf8_bin,
  `link_status` tinyint(4) NOT NULL DEFAULT '0',
  `note` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_class_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table m_class_forum
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_forum`;

CREATE TABLE `m_class_forum` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `published_date` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_forum_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_forum_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_forum_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_forum_comment`;

CREATE TABLE `m_class_forum_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `published_date` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_forum_id` (`m_class_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_forum_comment_ibfk_1` FOREIGN KEY (`m_class_forum_id`) REFERENCES `m_class_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_forum_comment_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_forum_comment_mention
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_forum_comment_mention`;

CREATE TABLE `m_class_forum_comment_mention` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_forum_comment_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_forum_comment_id` (`m_class_forum_comment_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_forum_comment_mention_ibfk_1` FOREIGN KEY (`m_class_forum_comment_id`) REFERENCES `m_class_forum_comment` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_forum_comment_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_forum_mention
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_forum_mention`;

CREATE TABLE `m_class_forum_mention` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_forum_id` (`m_class_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_forum_mention_ibfk_1` FOREIGN KEY (`m_class_forum_id`) REFERENCES `m_class_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_forum_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_forum_reader
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_forum_reader`;

CREATE TABLE `m_class_forum_reader` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_forum_id` (`m_class_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_forum_reader_ibfk_1` FOREIGN KEY (`m_class_forum_id`) REFERENCES `m_class_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_forum_reader_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_member`;

CREATE TABLE `m_class_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `sec_group_id` int(11) unsigned NOT NULL,
  `link_status` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `sec_group_id` (`sec_group_id`),
  CONSTRAINT `m_class_member_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_member_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_member_ibfk_3` FOREIGN KEY (`sec_group_id`) REFERENCES `sec_group` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table m_class_todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_todo`;

CREATE TABLE `m_class_todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `m_class_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `m_recurrent_id` int(11) unsigned DEFAULT NULL,
  `subscriber` enum('all','maintener','participant') NOT NULL DEFAULT 'all',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `m_recurrent_id` (`m_recurrent_id`),
  CONSTRAINT `m_class_todo_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_todo_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_todo_ibfk_3` FOREIGN KEY (`m_recurrent_id`) REFERENCES `m_recurrent` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_todo_answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_todo_answer`;

CREATE TABLE `m_class_todo_answer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_todo_id` int(11) unsigned NOT NULL,
  `m_class_todo_detail_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_todo_id` (`m_class_todo_id`),
  KEY `m_class_todo_detail_id` (`m_class_todo_detail_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_class_todo_answer_ibfk_1` FOREIGN KEY (`m_class_todo_id`) REFERENCES `m_class_todo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_todo_answer_ibfk_2` FOREIGN KEY (`m_class_todo_detail_id`) REFERENCES `m_class_todo_detail` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_todo_answer_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_todo_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_todo_detail`;

CREATE TABLE `m_class_todo_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_todo_id` int(11) unsigned NOT NULL,
  `m_answer_type_id` int(11) unsigned NOT NULL,
  `type` enum('todo','popquiz') NOT NULL DEFAULT 'todo',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `valid_answer` text CHARACTER SET utf8 COLLATE utf8_bin,
  `is_recurrent` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `todo_date` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_todo_id` (`m_class_todo_id`),
  KEY `m_answer_type_id` (`m_answer_type_id`),
  CONSTRAINT `m_class_todo_detail_ibfk_1` FOREIGN KEY (`m_class_todo_id`) REFERENCES `m_class_todo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_class_todo_detail_ibfk_2` FOREIGN KEY (`m_answer_type_id`) REFERENCES `m_answer_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_todo_exception
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_todo_exception`;

CREATE TABLE `m_class_todo_exception` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_todo_id` int(11) unsigned NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin,
  `value_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_todo_id` (`m_class_todo_id`),
  CONSTRAINT `m_class_todo_exception_ibfk_1` FOREIGN KEY (`m_class_todo_id`) REFERENCES `m_class_todo` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_class_todo_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_class_todo_option`;

CREATE TABLE `m_class_todo_option` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_todo_detail_id` int(11) unsigned NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_todo_detail_id` (`m_class_todo_detail_id`),
  CONSTRAINT `m_class_todo_option_ibfk_1` FOREIGN KEY (`m_class_todo_detail_id`) REFERENCES `m_class_todo_detail` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_notification_default
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_notification_default`;

CREATE TABLE `m_notification_default` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_notification_type_id` int(11) unsigned NOT NULL,
  `out_id` int(11) unsigned NOT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `is_recieve_web` tinyint(4) NOT NULL DEFAULT '1',
  `is_recieve_email` tinyint(4) NOT NULL DEFAULT '1',
  `is_recieve_sms` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_notification_type_id` (`m_notification_type_id`),
  CONSTRAINT `m_notification_default_ibfk_1` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_notification_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_notification_type`;

CREATE TABLE `m_notification_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `content` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `action_yes` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `action_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_param
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_param`;

CREATE TABLE `m_param` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `value` text COLLATE utf8_bin,
  `description` varchar(100) COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `m_param` WRITE;
/*!40000 ALTER TABLE `m_param` DISABLE KEYS */;

INSERT INTO `m_param` (`id`, `name`, `value`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'4E414D45',X'5363686F6F6C2046726F6D20486F6D65',X'617070206E616D65',1,'2020-07-20 17:54:38',X'53595354454D',NULL,NULL),
	(2,X'534C5547',X'534648',X'616262726576696174696F6E',1,'2020-07-23 21:01:11',X'53595354454D',NULL,NULL),
	(3,X'55504C4F41445F444952',X'2E2F66696C6573',X'66696C652075706C6F6164206469726563746F7279',1,'2020-07-20 17:54:38',X'53595354454D',NULL,NULL),
	(4,X'4D41494C5F494E54455256414C5F564552494649434154494F4E',X'31',X'686F7572',1,'2020-07-23 20:58:04',X'53595354454D',NULL,NULL),
	(5,X'4D41494C5F494E54455256414C5F464F52474F545F50415353574F5244',X'3234',X'686F7572',1,'2020-07-23 20:57:58',X'53595354454D',NULL,NULL),
	(6,X'544F4B454E5F56414C4944495459',X'3234',X'686F7572',1,'2020-07-23 21:01:11',X'53595354454D',NULL,NULL),
	(7,X'4D41494C5F494E54455256414C5F4D454D4245525F494E5649544154494F4E',X'31',X'686F7572',1,'2020-07-23 20:58:04',X'53595354454D',NULL,NULL);

/*!40000 ALTER TABLE `m_param` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table m_recurrent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_recurrent`;

CREATE TABLE `m_recurrent` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `m_recurrent` WRITE;
/*!40000 ALTER TABLE `m_recurrent` DISABLE KEYS */;

INSERT INTO `m_recurrent` (`id`, `name`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'484F55524C59',NULL,1,'2020-08-15 21:04:16',X'53595354454D',NULL,NULL),
	(2,X'4441494C59',NULL,1,'2020-08-15 21:04:16',X'53595354454D',NULL,NULL),
	(3,X'5745454B4C59',NULL,1,'2020-08-15 21:04:16',X'53595354454D',NULL,NULL),
	(4,X'4D4F4E54484C59',NULL,1,'2020-08-15 21:04:16',X'53595354454D',NULL,NULL),
	(5,X'594541524C59',NULL,1,'2020-08-15 21:04:16',X'53595354454D',NULL,NULL);

/*!40000 ALTER TABLE `m_recurrent` ENABLE KEYS */;
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
  `note` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_school_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_forum
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_forum`;

CREATE TABLE `m_school_forum` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `published_date` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_forum_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_forum_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_forum_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_forum_comment`;

CREATE TABLE `m_school_forum_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `published_date` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_forum_id` (`m_school_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_forum_comment_ibfk_1` FOREIGN KEY (`m_school_forum_id`) REFERENCES `m_school_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_forum_comment_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_forum_comment_mention
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_forum_comment_mention`;

CREATE TABLE `m_school_forum_comment_mention` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_forum_comment_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_forum_comment_id` (`m_school_forum_comment_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_forum_comment_mention_ibfk_1` FOREIGN KEY (`m_school_forum_comment_id`) REFERENCES `m_school_forum_comment` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_forum_comment_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_forum_mention
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_forum_mention`;

CREATE TABLE `m_school_forum_mention` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_forum_id` (`m_school_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_forum_mention_ibfk_1` FOREIGN KEY (`m_school_forum_id`) REFERENCES `m_school_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_forum_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_forum_reader
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_forum_reader`;

CREATE TABLE `m_school_forum_reader` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_forum_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_forum_id` (`m_school_forum_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_forum_reader_ibfk_1` FOREIGN KEY (`m_school_forum_id`) REFERENCES `m_school_forum` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_forum_reader_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_todo`;

CREATE TABLE `m_school_todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `m_school_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `m_recurrent_id` int(11) unsigned DEFAULT NULL,
  `subscriber` enum('all','maintener','participant') NOT NULL DEFAULT 'all',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `m_recurrent_id` (`m_recurrent_id`),
  CONSTRAINT `m_school_todo_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_todo_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_todo_ibfk_3` FOREIGN KEY (`m_recurrent_id`) REFERENCES `m_recurrent` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_todo_answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_todo_answer`;

CREATE TABLE `m_school_todo_answer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_todo_id` int(11) unsigned NOT NULL,
  `m_school_todo_detail_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_todo_id` (`m_school_todo_id`),
  KEY `m_school_todo_detail_id` (`m_school_todo_detail_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `m_school_todo_answer_ibfk_1` FOREIGN KEY (`m_school_todo_id`) REFERENCES `m_school_todo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_todo_answer_ibfk_2` FOREIGN KEY (`m_school_todo_detail_id`) REFERENCES `m_school_todo_detail` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_todo_answer_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_todo_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_todo_detail`;

CREATE TABLE `m_school_todo_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_todo_id` int(11) unsigned NOT NULL,
  `m_answer_type_id` int(11) unsigned NOT NULL,
  `type` enum('todo','popquiz') NOT NULL DEFAULT 'todo',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `valid_answer` text CHARACTER SET utf8 COLLATE utf8_bin,
  `is_recurrent` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `todo_date` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_todo_id` (`m_school_todo_id`),
  KEY `m_answer_type_id` (`m_answer_type_id`),
  CONSTRAINT `m_school_todo_detail_ibfk_1` FOREIGN KEY (`m_school_todo_id`) REFERENCES `m_school_todo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `m_school_todo_detail_ibfk_2` FOREIGN KEY (`m_answer_type_id`) REFERENCES `m_answer_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_todo_exception
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_todo_exception`;

CREATE TABLE `m_school_todo_exception` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_todo_id` int(11) unsigned NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin,
  `value_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_todo_id` (`m_school_todo_id`),
  CONSTRAINT `m_school_todo_exception_ibfk_1` FOREIGN KEY (`m_school_todo_id`) REFERENCES `m_school_todo` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_school_todo_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_school_todo_option`;

CREATE TABLE `m_school_todo_option` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_todo_detail_id` int(11) unsigned NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_todo_detail_id` (`m_school_todo_detail_id`),
  CONSTRAINT `m_school_todo_option_ibfk_1` FOREIGN KEY (`m_school_todo_detail_id`) REFERENCES `m_school_todo_detail` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table m_subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `m_subject`;

CREATE TABLE `m_subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  CONSTRAINT `m_subject_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table sec_confirmation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_confirmation`;

CREATE TABLE `sec_confirmation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '' COMMENT 'email verification, forgot passwprd, etc.',
  `sec_registrant_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned DEFAULT NULL,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `sender_addr` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `is_sent` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
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
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `sec_group` WRITE;
/*!40000 ALTER TABLE `sec_group` DISABLE KEYS */;

INSERT INTO `sec_group` (`id`, `name`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`)
VALUES
	(1,X'4F574E4552',1,'2020-07-13 10:45:17',X'53595354454D',NULL,NULL),
	(2,X'4D41494E54454E4552',1,'2020-07-13 10:45:31',X'53595354454D',NULL,NULL),
	(3,X'5041525449434950414E54',1,'2020-07-13 10:45:31',X'53595354454D',NULL,NULL),
	(4,X'4755455354',1,'2020-07-13 10:45:31',X'53595354454D',NULL,NULL);

/*!40000 ALTER TABLE `sec_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sec_registrant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_registrant`;

CREATE TABLE `sec_registrant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `username` varchar(100) COLLATE utf8_bin DEFAULT '',
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT '0',
  `phone` varchar(15) COLLATE utf8_bin DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table sec_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_token`;

CREATE TABLE `sec_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_user_id` int(11) unsigned NOT NULL,
  `token` text COLLATE utf8_bin NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `sec_token_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table sec_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sec_user`;

CREATE TABLE `sec_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `username` varchar(100) COLLATE utf8_bin DEFAULT '',
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT '0',
  `phone` varchar(15) COLLATE utf8_bin DEFAULT '',
  `is_phone_validated` tinyint(4) DEFAULT '0',
  `avatar` text COLLATE utf8_bin,
  `auth_provider` tinyint(4) NOT NULL DEFAULT '0',
  `auth_profile_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `auth_data` text COLLATE utf8_bin,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table t_notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_notification`;

CREATE TABLE `t_notification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_notification_type_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `receiver_user_id` int(11) unsigned NOT NULL,
  `out_id` int(11) unsigned NOT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `variable` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `notificatin_datetime` datetime NOT NULL,
  `notificatin_year` tinyint(4) unsigned NOT NULL,
  `notificatin_month` tinyint(4) unsigned NOT NULL,
  `is_read` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  KEY `receiver_user_id` (`receiver_user_id`),
  KEY `m_notification_type_id` (`m_notification_type_id`),
  CONSTRAINT `t_notification_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_notification_ibfk_2` FOREIGN KEY (`receiver_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_notification_ibfk_3` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_notification_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_notification_user`;

CREATE TABLE `t_notification_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_notification_type_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `out_id` int(11) unsigned NOT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `is_recieve_web` tinyint(4) unsigned NOT NULL,
  `is_recieve_email` tinyint(4) unsigned NOT NULL,
  `is_recieve_sms` tinyint(4) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_notification_user_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task`;

CREATE TABLE `t_task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_subject_id` int(11) unsigned NOT NULL,
  `m_class_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL COMMENT 'user assignor a task, in this case a teacher',
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `notes` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `weight` decimal(4,2) DEFAULT '0.00',
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_subject_id` (`m_subject_id`),
  KEY `m_class_id` (`m_class_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_task_ibfk_1` FOREIGN KEY (`m_subject_id`) REFERENCES `m_subject` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_ibfk_2` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



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
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_task_collection_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_collection_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table t_task_collection_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task_collection_file`;

CREATE TABLE `t_task_collection_file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_collection_id` int(11) unsigned NOT NULL,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) unsigned DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_collection_id` (`t_task_collection_id`),
  CONSTRAINT `t_task_collection_file_ibfk_1` FOREIGN KEY (`t_task_collection_id`) REFERENCES `t_task_collection` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



# Dump of table t_task_file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_task_file`;

CREATE TABLE `t_task_file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_id` int(11) unsigned NOT NULL,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) unsigned DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  CONSTRAINT `t_task_file_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
