/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3307
 Source Schema         : sfh

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/07/2020 19:00:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for log_audit
-- ----------------------------
DROP TABLE IF EXISTS `log_audit`;
CREATE TABLE `log_audit` (
  `id` varchar(200) COLLATE utf32_bin NOT NULL,
  `sec_user_username` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `action_date` datetime NOT NULL,
  `module` varchar(100) COLLATE utf32_bin NOT NULL,
  `action` varchar(50) COLLATE utf32_bin NOT NULL,
  `table_name` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `operation` varchar(50) COLLATE utf32_bin DEFAULT NULL,
  `key` int(11) unsigned DEFAULT NULL,
  `parameter` text COLLATE utf32_bin,
  `new_value` text COLLATE utf32_bin,
  `old_value` text COLLATE utf32_bin,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text COLLATE utf32_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for log_error
-- ----------------------------
DROP TABLE IF EXISTS `log_error`;
CREATE TABLE `log_error` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_user_id` int(11) unsigned DEFAULT NULL,
  `error_code` varchar(50) COLLATE utf32_bin NOT NULL,
  `error_date` datetime NOT NULL,
  `message` varchar(500) COLLATE utf32_bin NOT NULL,
  `tag` varchar(100) COLLATE utf32_bin NOT NULL,
  `content` text COLLATE utf32_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `log_error_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for m_class
-- ----------------------------
DROP TABLE IF EXISTS `m_class`;
CREATE TABLE `m_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned NOT NULL,
  `level` tinyint(4) unsigned NOT NULL,
  `parallel` varchar(10) COLLATE utf32_bin NOT NULL DEFAULT '',
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_class_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for m_class_member
-- ----------------------------
DROP TABLE IF EXISTS `m_class_member`;
CREATE TABLE `m_class_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `sec_group_id` int(11) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
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

-- ----------------------------
-- Table structure for m_school
-- ----------------------------
DROP TABLE IF EXISTS `m_school`;
CREATE TABLE `m_school` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_school_id` (`m_school_id`),
  CONSTRAINT `m_school_ibfk_1` FOREIGN KEY (`m_school_id`) REFERENCES `m_school` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for m_school_member
-- ----------------------------
DROP TABLE IF EXISTS `m_school_member`;
CREATE TABLE `m_school_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_school_id` int(11) unsigned DEFAULT NULL,
  `sec_user_id` int(11) unsigned NOT NULL,
  `sec_group_id` int(11) unsigned NOT NULL,
  `reg_numb` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
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

-- ----------------------------
-- Table structure for m_subject
-- ----------------------------
DROP TABLE IF EXISTS `m_subject`;
CREATE TABLE `m_subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_class_id` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `m_class_id` (`m_class_id`),
  CONSTRAINT `m_subject_ibfk_1` FOREIGN KEY (`m_class_id`) REFERENCES `m_class` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for sec_group
-- ----------------------------
DROP TABLE IF EXISTS `sec_group`;
CREATE TABLE `sec_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for sec_registrant
-- ----------------------------
DROP TABLE IF EXISTS `sec_registrant`;
CREATE TABLE `sec_registrant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `username` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `password` varchar(100) COLLATE utf32_bin NOT NULL,
  `email` varchar(100) COLLATE utf32_bin NOT NULL,
  `sex` tinyint(4) unsigned NOT NULL DEFAULT '1',
  `is_validated` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for sec_token
-- ----------------------------
DROP TABLE IF EXISTS `sec_token`;
CREATE TABLE `sec_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_user_id` int(11) unsigned NOT NULL,
  `token` text COLLATE utf32_bin NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `sec_token_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for sec_user
-- ----------------------------
DROP TABLE IF EXISTS `sec_user`;
CREATE TABLE `sec_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `username` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `password` varchar(100) COLLATE utf32_bin NOT NULL,
  `email` varchar(100) COLLATE utf32_bin NOT NULL,
  `sex` tinyint(4) unsigned NOT NULL DEFAULT '1',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for sec_user_oauth
-- ----------------------------
DROP TABLE IF EXISTS `sec_user_oauth`;
CREATE TABLE `sec_user_oauth` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_user_id` int(11) unsigned NOT NULL,
  `provider` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `profile_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `data` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `sec_user_oauth_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sec_verification
-- ----------------------------
DROP TABLE IF EXISTS `sec_verification`;
CREATE TABLE `sec_verification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sec_registrant_id` int(11) unsigned DEFAULT NULL,
  `sender_addr` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `is_sent` tinyint(4) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sec_registrant_id` (`sec_registrant_id`),
  CONSTRAINT `sec_verification_ibfk_1` FOREIGN KEY (`sec_registrant_id`) REFERENCES `sec_registrant` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_task
-- ----------------------------
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
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
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

-- ----------------------------
-- Table structure for t_task_collection
-- ----------------------------
DROP TABLE IF EXISTS `t_task_collection`;
CREATE TABLE `t_task_collection` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_task_id` int(11) unsigned NOT NULL,
  `sec_user_id` int(11) unsigned NOT NULL COMMENT 'user that given finished task, in this case student',
  `submitted_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  KEY `sec_user_id` (`sec_user_id`),
  CONSTRAINT `t_task_collection_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `t_task_collection_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for t_task_collection_file
-- ----------------------------
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
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_collection_id` (`t_task_collection_id`),
  CONSTRAINT `t_task_collection_file_ibfk_1` FOREIGN KEY (`t_task_collection_id`) REFERENCES `t_task_collection` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Table structure for t_task_file
-- ----------------------------
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
  `created_by` varchar(100) COLLATE utf32_bin NOT NULL DEFAULT '',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `t_task_id` (`t_task_id`),
  CONSTRAINT `t_task_file_ibfk_1` FOREIGN KEY (`t_task_id`) REFERENCES `t_task` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

SET FOREIGN_KEY_CHECKS = 1;
