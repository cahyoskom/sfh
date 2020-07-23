/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3307
 Source Schema         : sakola

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/07/2020 19:04:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for m_class
-- ----------------------------
DROP TABLE IF EXISTS `m_class`;
CREATE TABLE `m_class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_level` int(11) NOT NULL,
  `class_parallel` varchar(10) COLLATE utf32_bin NOT NULL,
  `class_name` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of m_class
-- ----------------------------
BEGIN;
INSERT INTO `m_class` VALUES (1, 1, 'A', '1-A', 1, '2020-06-08 07:33:35', 'admin', NULL, NULL);
INSERT INTO `m_class` VALUES (2, 2, 'A', '2-A', 1, '2020-06-16 19:39:39', 'admin', NULL, NULL);
INSERT INTO `m_class` VALUES (3, 3, 'A', '3-A', 1, '2020-06-16 19:56:08', 'admin', NULL, NULL);
INSERT INTO `m_class` VALUES (4, 1, 'B', '1-B', 1, '2020-06-17 13:22:30', 'admin', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for m_subject
-- ----------------------------
DROP TABLE IF EXISTS `m_subject`;
CREATE TABLE `m_subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) COLLATE utf32_bin NOT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of m_subject
-- ----------------------------
BEGIN;
INSERT INTO `m_subject` VALUES (1, 'Matematika', 1, '2020-06-08 07:33:44', 'admin', NULL, NULL);
INSERT INTO `m_subject` VALUES (2, 'Bahasa Indonesia', 1, '2020-06-16 19:39:53', 'admin', NULL, NULL);
INSERT INTO `m_subject` VALUES (3, 'Sejarah', 1, '2020-06-16 19:56:24', 'admin', NULL, NULL);
INSERT INTO `m_subject` VALUES (4, 'IPA', 1, '2020-06-17 13:18:12', 'admin', NULL, NULL);
INSERT INTO `m_subject` VALUES (5, 'IPS', 1, '2020-06-17 13:18:21', 'admin', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sec_group
-- ----------------------------
DROP TABLE IF EXISTS `sec_group`;
CREATE TABLE `sec_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) COLLATE utf32_bin NOT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of sec_group
-- ----------------------------
BEGIN;
INSERT INTO `sec_group` VALUES (1, 'admin', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_group` VALUES (2, 'headmaster', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_group` VALUES (3, 'home teacher', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_group` VALUES (4, 'teacher', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_group` VALUES (5, 'guardian', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_group` VALUES (6, 'student', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sec_token
-- ----------------------------
DROP TABLE IF EXISTS `sec_token`;
CREATE TABLE `sec_token` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text COLLATE utf32_bin,
  `user_id` int(11) DEFAULT NULL,
  `valid_until` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `fk_sec_token_sec_user` (`user_id`),
  CONSTRAINT `fk_sec_token_sec_user` FOREIGN KEY (`user_id`) REFERENCES `sec_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of sec_token
-- ----------------------------
BEGIN;
INSERT INTO `sec_token` VALUES (151, '4acd4646b915bd0a93fb5a89571f64ffc813a86a843320eec49a715b7efcecff', 6, '2020-06-28 14:29:59', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (153, '799593261fb12738e49ba470dff5fe1e12f1a9569f7f4a8a5efa6fce9056bfd2', 7, '2020-07-01 02:25:11', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (183, '7b506d8004f0c2c24c1fe97033716143c247f69708e48a0feb30bcf9b6718f19', 4, '2020-07-01 07:33:11', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (184, 'ebef44d6c0aa07300bed4dc916bbacc9864dfb9fbb3684e4758756b9e452b5e8', 5, '2020-07-01 07:35:30', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (193, 'd0f4ee2fed9028471010e63559ea470bbb01384d1d7c0a65117735cad229c1c1', 2, '2020-07-06 08:41:32', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (194, '72bdbfef8febd7eca9690968b4bdbf413f76a01b9c15087681ac91687f95865a', 3, '2020-07-06 09:08:55', 0, NULL, NULL, NULL, NULL);
INSERT INTO `sec_token` VALUES (198, '2dc7794b6cc876c110e41e2feb0212375197b7884cb6e09d7386680b28a8fdb8', 1, '2020-07-07 01:48:24', 0, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sec_user
-- ----------------------------
DROP TABLE IF EXISTS `sec_user`;
CREATE TABLE `sec_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf32_bin NOT NULL,
  `email` varchar(100) COLLATE utf32_bin NOT NULL,
  `password` varchar(100) COLLATE utf32_bin NOT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of sec_user
-- ----------------------------
BEGIN;
INSERT INTO `sec_user` VALUES (1, 'admin', 'admin@sakola.co.id', '749f09bade8aca755660eeb17792da880218d4fbdc4e25fbec279d7fe9f65d70', 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_user` VALUES (2, 'teacher', 'teacher@tes.com', 'ec33023b27acedcb02021dbcd1dca14290fb1743f080449980b4a552c5a1f25d', 1, '2020-06-12 03:02:59', 'admin', NULL, '');
INSERT INTO `sec_user` VALUES (3, 'student', 'student@tes.com', '68eaeeaef51a40035b5d3705c4e0ffd68036b6b821361765145f410b0f996e11', 1, '2020-06-12 03:03:34', 'admin', NULL, '');
INSERT INTO `sec_user` VALUES (4, 'student2', 'student2@sakola.com', '8e44087d329e85ad54e762e4b971babec41c66a120501af4ebde785d2327bc48', 1, '2020-06-16 19:38:42', 'admin', NULL, '');
INSERT INTO `sec_user` VALUES (5, 'student3', 'student3@sakola.com', 'cb21e0e1e5f1108f90bff9e7078a848b77b7d9cd11578f388bb10cdbb8826488', 1, '2020-06-16 19:39:10', 'admin', NULL, '');
INSERT INTO `sec_user` VALUES (6, 'student4', 'cahyo_skom@yahoo.com', '763af339533505ed798949e9d9fb5598f317eb0950f970bebcd508378c790154', 1, '2020-06-17 13:20:48', 'admin', NULL, '');
INSERT INTO `sec_user` VALUES (7, 'newcomers', 'test7@@test.com', '76ccdeb175c34c0879cd22b5aa817581992cd8970775ff4898e5656508a38d0e', 1, '2020-06-24 23:59:24', 'admin', NULL, '');
COMMIT;

-- ----------------------------
-- Table structure for sec_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sec_user_role`;
CREATE TABLE `sec_user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `fk_sec_user_role_sec_user` (`user_id`),
  KEY `fk_sec_user_role_sec_group` (`group_id`),
  KEY `fk_sec_user_role_m_class` (`class_id`),
  KEY `fk_sec_user_role_m_subject` (`subject_id`),
  KEY `fk_sec_user_role_t_student` (`student_id`),
  CONSTRAINT `fk_sec_user_role_m_class` FOREIGN KEY (`class_id`) REFERENCES `m_class` (`class_id`),
  CONSTRAINT `fk_sec_user_role_m_subject` FOREIGN KEY (`subject_id`) REFERENCES `m_subject` (`subject_id`),
  CONSTRAINT `fk_sec_user_role_sec_group` FOREIGN KEY (`group_id`) REFERENCES `sec_group` (`group_id`),
  CONSTRAINT `fk_sec_user_role_sec_user` FOREIGN KEY (`user_id`) REFERENCES `sec_user` (`user_id`),
  CONSTRAINT `fk_sec_user_role_t_student` FOREIGN KEY (`student_id`) REFERENCES `t_student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of sec_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sec_user_role` VALUES (1, 1, 1, NULL, NULL, NULL, 1, '2020-06-06 01:51:16', 'system', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (2, 2, 4, NULL, NULL, NULL, 1, '2020-06-12 03:37:39', 'system', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (3, 3, 6, 1, 1, 1, 1, '2020-06-12 03:42:57', 'system', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (4, 2, 1, NULL, NULL, NULL, 1, '2020-06-15 08:43:21', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (8, 4, 6, 1, 1, 2, 1, '2020-06-16 19:41:45', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (9, 5, 6, 1, 1, 3, 1, '2020-06-16 19:42:03', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (10, 6, 6, 1, 1, 4, 1, '2020-06-17 13:57:13', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (11, 6, 6, 1, 2, 4, 1, '2020-06-17 13:57:30', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (12, 7, 1, NULL, NULL, NULL, 1, '2020-06-25 00:00:38', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (13, 7, 1, NULL, NULL, NULL, 1, '2020-06-25 00:02:44', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (14, 7, 2, NULL, NULL, NULL, 1, '2020-06-25 00:05:05', 'admin', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (15, 7, 3, 1, NULL, NULL, 1, '2020-06-25 00:29:47', 'newcomers', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (16, 7, 4, 2, 1, NULL, 1, '2020-06-25 00:30:00', 'newcomers', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (17, 7, 4, 3, 1, NULL, 1, '2020-06-25 00:30:16', 'newcomers', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (18, 7, 4, 4, 3, NULL, 1, '2020-06-25 00:30:34', 'newcomers', NULL, NULL);
INSERT INTO `sec_user_role` VALUES (19, 1, 1, 1, 2, 1, 1, '2020-07-01 04:42:03', 'admin', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_no` varchar(100) COLLATE utf32_bin NOT NULL,
  `student_name` varchar(100) COLLATE utf32_bin NOT NULL,
  `sex` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `fk_t_student_class` (`class_id`),
  CONSTRAINT `fk_t_student_class` FOREIGN KEY (`class_id`) REFERENCES `m_class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of t_student
-- ----------------------------
BEGIN;
INSERT INTO `t_student` VALUES (1, '123457', 'Rahmat Budiman', 1, 1, 1, '2020-06-12 03:04:44', 'admin', NULL, NULL);
INSERT INTO `t_student` VALUES (2, '654237', 'Hadi', 1, 1, 1, '2020-06-16 19:40:25', 'admin', NULL, NULL);
INSERT INTO `t_student` VALUES (3, '854237', 'Grace', 2, 1, 1, '2020-06-16 19:40:52', 'admin', NULL, NULL);
INSERT INTO `t_student` VALUES (4, '070707', 'Cahyo', 1, 1, 1, '2020-06-17 13:21:29', 'admin', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_task
-- ----------------------------
DROP TABLE IF EXISTS `t_task`;
CREATE TABLE `t_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `assignor_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf32_bin NOT NULL,
  `notes` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `weight` decimal(4,2) DEFAULT '0.00',
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_t_task_sec_user` (`assignor_id`),
  KEY `fk_t_task_m_class` (`class_id`),
  KEY `fk_t_task_m_subject` (`subject_id`),
  CONSTRAINT `fk_t_task_m_class` FOREIGN KEY (`class_id`) REFERENCES `m_class` (`class_id`),
  CONSTRAINT `fk_t_task_m_subject` FOREIGN KEY (`subject_id`) REFERENCES `m_subject` (`subject_id`),
  CONSTRAINT `fk_t_task_sec_user` FOREIGN KEY (`assignor_id`) REFERENCES `sec_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of t_task
-- ----------------------------
BEGIN;
INSERT INTO `t_task` VALUES (2, 1, 1, 1, 'Quiz 02xxxx', 'Quiz untuk bab xxxxx', 50.00, '2020-06-08 00:00:00', '2020-06-10 00:00:00', '2020-06-05 00:00:00', 5, '2020-06-08 07:33:59', 'admin', '2020-06-15 06:38:51', 'teacher');
INSERT INTO `t_task` VALUES (3, 2, 1, 1, 'Latihan Soal', 'Kerjkana  halaman  20-25', 5.00, '2020-06-14 00:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00', -1, '2020-06-14 15:56:22', 'teacher', NULL, NULL);
INSERT INTO `t_task` VALUES (4, 2, 1, 1, 'Latihan', 'Kerjakan buku lks hal.10 , foto hasil jawaban lalu upload', 5.00, '2020-06-17 00:00:00', '2020-06-19 00:00:00', '2020-06-17 00:00:00', -1, '2020-06-16 20:06:26', 'teacher', NULL, NULL);
INSERT INTO `t_task` VALUES (5, 2, 1, 1, 'Task 1', 'Kerjakan soal halaman 2-5', 5.00, '2020-06-17 00:00:00', '2020-06-17 00:00:00', '2020-06-17 00:00:00', 5, '2020-06-17 00:12:09', 'teacher', '2020-06-17 14:19:46', 'teacher');
INSERT INTO `t_task` VALUES (6, 2, 1, 2, 'Task 1', 'Buar Kliping berita, lalau buatkan opini berita', 5.00, '2020-06-17 00:00:00', '2020-06-17 00:00:00', '2020-06-17 00:00:00', -1, '2020-06-17 00:15:27', 'teacher', '2020-06-17 00:16:57', 'teacher');
INSERT INTO `t_task` VALUES (7, 2, 1, 2, 'Task3', 'Belajar membaca', 5.00, '2020-06-18 00:00:00', '2020-06-18 00:00:00', '2020-06-17 00:00:00', 1, '2020-06-17 14:19:02', 'teacher', NULL, NULL);
INSERT INTO `t_task` VALUES (8, 2, 2, 3, 'Merangkum', 'baca halaman 105 - 108, lalu rangkum. foto lalu upload hasil rangkuman', 5.00, '2020-06-18 00:00:00', '2020-06-23 00:00:00', '2020-06-18 00:00:00', -1, '2020-06-18 00:50:57', 'teacher', NULL, NULL);
INSERT INTO `t_task` VALUES (9, 7, 4, 5, 'Membaca I', 'Rangkum buku biografi Agus Salim, Lalu foto dan kirim', 5.00, '2020-06-29 00:00:00', '2020-06-30 00:00:00', '2020-06-25 00:00:00', 1, '2020-06-25 02:58:24', 'newcomers', NULL, NULL);
INSERT INTO `t_task` VALUES (10, 2, 1, 1, 'PR Perkalian', 'tidak boleh pakai kalkulator', 5.00, '2020-07-01 00:00:00', '2020-07-03 00:00:00', '2020-07-01 00:00:00', 1, '2020-07-01 07:30:45', 'teacher', NULL, NULL);
INSERT INTO `t_task` VALUES (11, 2, 1, 1, 'hitung hitungan', '', 5.00, '2020-07-02 00:00:00', '2020-07-03 00:00:00', '2020-07-01 00:00:00', 1, '2020-07-01 07:38:15', 'teacher', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_task_collection
-- ----------------------------
DROP TABLE IF EXISTS `t_task_collection`;
CREATE TABLE `t_task_collection` (
  `task_collection_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `submitted_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`task_collection_id`),
  KEY `fk_t_task_collection_t_task` (`task_id`),
  KEY `fk_t_task_collection_t_studet` (`student_id`),
  CONSTRAINT `fk_t_task_collection_t_studet` FOREIGN KEY (`student_id`) REFERENCES `t_student` (`student_id`),
  CONSTRAINT `fk_t_task_collection_t_task` FOREIGN KEY (`task_id`) REFERENCES `t_task` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of t_task_collection
-- ----------------------------
BEGIN;
INSERT INTO `t_task_collection` VALUES (1, 2, 1, '2020-06-15 00:10:47', 4, '2020-06-14 15:57:34', 'student', '2020-06-15 00:10:47', 'student');
INSERT INTO `t_task_collection` VALUES (2, 3, 1, '2020-06-16 20:04:27', 4, '2020-06-14 16:01:24', 'student', '2020-06-16 20:04:27', 'student');
INSERT INTO `t_task_collection` VALUES (5, 4, 1, '2020-06-16 20:08:10', 4, '2020-06-16 20:07:27', 'student', '2020-06-16 20:08:10', 'student');
INSERT INTO `t_task_collection` VALUES (6, 5, 1, '2020-06-17 14:17:16', 4, '2020-06-17 00:19:39', 'student', '2020-06-17 14:17:16', 'student');
INSERT INTO `t_task_collection` VALUES (7, 5, 3, '2020-06-17 13:52:45', 4, '2020-06-17 13:25:10', 'student3', '2020-06-17 13:52:45', 'student3');
INSERT INTO `t_task_collection` VALUES (8, 6, 3, '2020-06-17 13:52:46', 4, '2020-06-17 13:27:05', 'student3', '2020-06-17 13:52:46', 'student3');
INSERT INTO `t_task_collection` VALUES (9, 6, 4, '2020-06-17 14:04:21', 4, '2020-06-17 13:59:08', 'student4', '2020-06-17 14:04:21', 'student4');
INSERT INTO `t_task_collection` VALUES (10, 5, 4, '2020-06-17 14:04:20', 4, '2020-06-17 14:02:10', 'student4', '2020-06-17 14:04:20', 'student4');
INSERT INTO `t_task_collection` VALUES (11, 6, 2, NULL, 1, '2020-06-17 14:04:54', 'student2', NULL, NULL);
INSERT INTO `t_task_collection` VALUES (12, 5, 2, NULL, 1, '2020-06-17 14:05:17', 'student2', NULL, NULL);
INSERT INTO `t_task_collection` VALUES (13, 5, 2, NULL, 1, '2020-06-17 14:05:30', 'student2', NULL, NULL);
INSERT INTO `t_task_collection` VALUES (14, 6, 2, NULL, 1, '2020-06-17 14:06:22', 'student2', NULL, NULL);
INSERT INTO `t_task_collection` VALUES (15, 7, 4, '2020-06-17 14:22:11', 4, '2020-06-17 14:20:44', 'student4', '2020-06-17 14:22:11', 'student4');
INSERT INTO `t_task_collection` VALUES (16, 7, 4, '2020-06-17 14:22:12', 4, '2020-06-17 14:21:46', 'student4', '2020-06-17 14:22:12', 'student4');
INSERT INTO `t_task_collection` VALUES (17, 7, 1, '2020-06-18 01:04:32', 4, '2020-06-17 14:23:03', 'student', '2020-06-18 01:04:32', 'student');
COMMIT;

-- ----------------------------
-- Table structure for t_task_collection_file
-- ----------------------------
DROP TABLE IF EXISTS `t_task_collection_file`;
CREATE TABLE `t_task_collection_file` (
  `task_collection_file_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_collection_id` int(11) NOT NULL,
  `filename` varchar(100) COLLATE utf32_bin NOT NULL,
  `ext` varchar(10) COLLATE utf32_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `sequence` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`task_collection_file_id`),
  KEY `fk_t_task_collection_file_t_task_collection` (`task_collection_id`),
  CONSTRAINT `fk_t_task_collection_file_t_task_collection` FOREIGN KEY (`task_collection_id`) REFERENCES `t_task_collection` (`task_collection_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of t_task_collection_file
-- ----------------------------
BEGIN;
INSERT INTO `t_task_collection_file` VALUES (1, 1, 'Indonesian MAP.PNG', 'PNG', 'image/png', './files/task_2/collection/1Indonesian MAP.PNG', 0, 1, '2020-06-14 15:58:07', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (2, 2, 'Indonesian MAP.PNG', 'PNG', 'image/png', './files/task_3/collection/2Indonesian MAP.PNG', 0, 1, '2020-06-15 00:05:51', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (3, 1, 'crud.JPG', 'JPG', 'image/jpeg', './files/task_2/collection/1crud.JPG', 0, 1, '2020-06-15 00:10:29', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (4, 1, 'NEMO.jpeg', 'jpeg', 'image/jpeg', './files/task_2/collection/1NEMO.jpeg', 0, 1, '2020-06-15 00:10:29', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (5, 2, 'contoh file jawaban murid.jpg', 'jpg', 'image/jpeg', './files/task_3/collection/2/contoh file jawaban murid.jpg', 0, 1, '2020-06-16 20:04:08', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (6, 5, 'contoh file jawaban murid 2.txt', 'txt', 'text/plain', './files/task_4/collection/5/contoh file jawaban murid 2.txt', 0, 1, '2020-06-16 20:07:47', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (7, 5, 'contoh file jawaban murid.jpg', 'jpg', 'image/jpeg', './files/task_4/collection/5/contoh file jawaban murid.jpg', 0, 1, '2020-06-16 20:07:47', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (8, 6, 'Indonesian MAP.PNG', 'PNG', 'image/png', './files/task_5/collection/6/Indonesian MAP.PNG', 0, 1, '2020-06-17 00:20:12', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (9, 7, 'Indonesian MAP - Grace.PNG', 'PNG', 'image/png', './files/task_5/collection/7/Indonesian MAP - Grace.PNG', 0, 1, '2020-06-17 13:25:50', 'student3', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (10, 8, 'Indonesian MAP - Grace.PNG', 'PNG', 'image/png', './files/task_6/collection/8/Indonesian MAP - Grace.PNG', 0, 1, '2020-06-17 13:27:25', 'student3', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (11, 8, 'Indonesian MAP - Grace - Copy.PNG', 'PNG', 'image/png', './files/task_6/collection/8/Indonesian MAP - Grace - Copy.PNG', 0, 1, '2020-06-17 13:41:57', 'student3', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (12, 9, 'crud - Copy (14).JPG', 'JPG', 'image/jpeg', './files/task_6/collection/9/crud - Copy (14).JPG', 0, 1, '2020-06-17 14:00:51', 'student4', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (13, 10, 'The Text test.txt', 'txt', 'text/plain', './files/task_5/collection/10/The Text test.txt', 0, 1, '2020-06-17 14:02:19', 'student4', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (14, 14, '1571380106219.jpg', 'jpg', 'image/jpeg', './files/task_6/collection/14/1571380106219.jpg', 0, 1, '2020-06-17 14:07:02', 'student2', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (15, 6, 'area id.PNG', 'PNG', 'image/png', './files/task_5/collection/6/area id.PNG', 0, 1, '2020-06-17 14:17:04', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (16, 16, 'indonesia.png', 'png', 'image/png', './files/task_7/collection/16/indonesia.png', 0, 1, '2020-06-17 14:21:55', 'student4', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (17, 17, 'us.png', 'png', 'image/png', './files/task_7/collection/17/us.png', 0, 1, '2020-06-17 14:23:17', 'student', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (18, 16, 'Song Collection.ogg', 'ogg', 'audio/ogg', './files/task_7/collection/16/Song Collection.ogg', 0, 1, '2020-06-25 08:13:03', 'student4', NULL, NULL);
INSERT INTO `t_task_collection_file` VALUES (19, 17, 'Screen Shot 2020-06-11 at 14.02.51.png', 'png', 'image/png', './files/task_7/collection/17/Screen Shot 2020-06-11 at 14.02.51.png', 0, 1, '2020-07-01 04:20:05', 'teacher', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_task_file
-- ----------------------------
DROP TABLE IF EXISTS `t_task_file`;
CREATE TABLE `t_task_file` (
  `task_file_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `filename` varchar(100) COLLATE utf32_bin NOT NULL,
  `ext` varchar(10) COLLATE utf32_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf32_bin DEFAULT NULL,
  `sequence` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf32_bin DEFAULT NULL,
  PRIMARY KEY (`task_file_id`),
  KEY `fk_t_task_file_t_task` (`task_id`),
  CONSTRAINT `fk_t_task_file_t_task` FOREIGN KEY (`task_id`) REFERENCES `t_task` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- ----------------------------
-- Records of t_task_file
-- ----------------------------
BEGIN;
INSERT INTO `t_task_file` VALUES (1, 2, 'download.png', 'png', 'image/png', './files/task_2/download.png', 0, 1, '2020-06-08 07:34:24', 'admin', NULL, NULL);
INSERT INTO `t_task_file` VALUES (2, 3, 'Print.pdf', 'pdf', 'application/pdf', './files/task_3/Print.pdf', 0, 1, '2020-06-14 15:56:34', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (3, 4, 'contoh file dari guru 2.txt', 'txt', 'text/plain', './files/task_4/contoh file dari guru 2.txt', 0, 1, '2020-06-16 20:06:28', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (4, 4, 'contoh file dari guru.png', 'png', 'image/png', './files/task_4/contoh file dari guru.png', 0, 1, '2020-06-16 20:06:28', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (5, 5, 'NEMO.jpeg', 'jpeg', 'image/jpeg', './files/task_5/NEMO.jpeg', 0, 1, '2020-06-17 00:12:11', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (6, 6, 'crud - Copy (10).JPG', 'JPG', 'image/jpeg', './files/task_6/crud - Copy (10).JPG', 0, -1, '2020-06-17 00:15:30', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (7, 6, 'crud.JPG', 'JPG', 'image/jpeg', './files/task_6/crud.JPG', 0, 1, '2020-06-17 00:15:30', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (8, 6, 'crud - Copy (11).JPG', 'JPG', 'image/jpeg', './files/task_6/crud - Copy (11).JPG', 0, -1, '2020-06-17 00:15:30', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (9, 6, 'crud - Copy (14).JPG', 'JPG', 'image/jpeg', './files/task_6/crud - Copy (14).JPG', 0, -1, '2020-06-17 00:15:30', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (10, 6, 'crud - Copy.JPG', 'JPG', 'image/jpeg', './files/task_6/crud - Copy.JPG', 0, -1, '2020-06-17 00:15:30', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (11, 7, '1571380106219.jpg', 'jpg', 'image/jpeg', './files/task_7/1571380106219.jpg', 0, 1, '2020-06-17 14:19:19', 'teacher', NULL, NULL);
INSERT INTO `t_task_file` VALUES (12, 9, 'Biografi AGUS SALIM.pdf', 'pdf', 'application/pdf', './files/task_9/Biografi AGUS SALIM.pdf', 0, 1, '2020-06-25 02:58:36', 'newcomers', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
