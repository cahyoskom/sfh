-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Sep 2020 pada 15.23
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sfh-dev`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `log_audit`
--

CREATE TABLE `log_audit` (
  `id` varchar(200) COLLATE utf8_bin NOT NULL,
  `sec_user_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `action_date` datetime NOT NULL,
  `module` varchar(100) COLLATE utf8_bin NOT NULL,
  `action` varchar(50) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `operation` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `key` int(11) UNSIGNED DEFAULT NULL,
  `parameter` text COLLATE utf8_bin DEFAULT NULL,
  `new_value` text COLLATE utf8_bin DEFAULT NULL,
  `old_value` text COLLATE utf8_bin DEFAULT NULL,
  `notes` text COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_answer_type`
--

CREATE TABLE `m_answer_type` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `m_answer_type`
--

INSERT INTO `m_answer_type` (`id`, `name`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'BOOLEAN', 1, '2020-08-15 20:54:38', 'SYSTEM', NULL, NULL),
(2, 'NUMBER', 1, '2020-08-15 20:54:49', 'SYSTEM', NULL, NULL),
(3, 'OPTION', 1, '2020-08-15 20:54:57', 'SYSTEM', NULL, NULL),
(4, 'TEXT', 1, '2020-08-15 20:55:13', 'SYSTEM', NULL, NULL),
(5, 'ESSAY', 1, '2020-08-15 20:55:19', 'SYSTEM', NULL, NULL),
(6, 'DATE', 1, '2020-08-15 20:55:52', 'SYSTEM', NULL, NULL),
(7, 'TIME', 1, '2020-08-15 20:56:00', 'SYSTEM', NULL, NULL),
(8, 'DATETIME', 1, '2020-08-15 20:57:30', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_notification_default`
--

CREATE TABLE `m_notification_default` (
  `id` int(11) UNSIGNED NOT NULL,
  `m_notification_type_id` int(11) UNSIGNED NOT NULL,
  `out_id` int(11) UNSIGNED DEFAULT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `is_receive_web` tinyint(4) NOT NULL DEFAULT 1,
  `is_receive_email` tinyint(4) NOT NULL DEFAULT 1,
  `is_receive_sms` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `m_notification_default`
--

INSERT INTO `m_notification_default` (`id`, `m_notification_type_id`, `out_id`, `out_name`, `is_receive_web`, `is_receive_email`, `is_receive_sms`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, 1, 'haha', 1, 1, 0, 1, '2020-09-01 17:25:52', 'SYSTEM', NULL, NULL),
(2, 2, 2, 'test2', 1, 1, 0, 0, '2020-09-01 17:25:52', 'SYSTEM', NULL, NULL),
(3, 3, 3, 'test2', 1, 1, 0, 1, '2020-09-02 20:47:10', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_notification_type`
--

CREATE TABLE `m_notification_type` (
  `id` int(11) UNSIGNED NOT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `content` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `activities` varchar(100) DEFAULT NULL,
  `action_yes` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `action_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `m_notification_type`
--

INSERT INTO `m_notification_type` (`id`, `type`, `content`, `content_url`, `activities`, `action_yes`, `action_no`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'CLASS_ACCEPT_USER', 'Anda di terima di kelas 12A', 'http://localhost:3001/', 'Pemberitahuan penerimaan kelas', 'http://localhost:3001/', 'http://localhost:3001/', 1, '2020-09-01 17:22:36', 'SYSTEM', NULL, NULL),
(2, 'CLASS_CHANGE_INFO', 'jam kelas anda berubah menjadi jam ', 'http://localhost:3001/', 'Pemberitahuan penggantian kelas', 'http://localhost:3001/', 'http://localhost:3001/', 1, '2020-09-01 17:22:36', 'SYSTEM', NULL, NULL),
(3, 'CLASS_REJECT_USER', 'Anda ditolak untuk bergabung pada', 'http://localhost:3001/notification/setting', 'Pemberitahuan ditolak pada kelas', 'http://localhost:3001/notification/setting', 'http://localhost:3001/notification/setting', 1, '2020-09-02 20:46:47', 'SYSTEM', NULL, NULL),
(4, 'CLASS_ACCEPT_SCHOOL', 'Anda diterima di ', 'http://localhost:3001/notification/setting', 'Pemberitahuan penerimaan kelas', 'http://localhost:3001/notification/setting', 'http://localhost:3001/notification/setting', 1, '2020-09-03 19:17:18', 'SYSTEM', NULL, NULL),
(5, 'SCHOOL_ACCEPT_CLASS', 'kelas anda diterima di sekolah ', 'http://localhost:3001/notification/setting', 'Pemberitahuan penerimaan kelas di sekolah', 'http://localhost:3001/notification/setting', 'http://localhost:3001/notification/setting', 1, '2020-09-03 19:18:29', 'SYSTEM', NULL, NULL),
(6, 'SCHOOL_CHANGE_INFO', 'Sekolah anda sekarang bernama', 'http://localhost:3001/notification/setting', 'Pemberitahuan perubahan nama sekolah', 'http://localhost:3001/notification/setting', 'http://localhost:3001/notification/setting', 1, '2020-09-03 19:19:34', 'SYSTEM', NULL, NULL),
(7, 'USER_REQUEST_CLASS', 'Ingin bergabung ke ', 'http://localhost:3001/notification', 'Pemberitahuan permintaan bergabung', 'http://localhost:3001/notification', 'http://localhost:3001/notification', 1, '2020-09-08 12:14:07', 'SYSTEM', NULL, NULL),
(8, 'CLASS_REMOVE_USER', 'menghapus user', 'a', 'Pemberitahuan penghapusan user pada kelas', 's', 'a', 1, '2020-09-10 19:45:39', 'SYSTEM', NULL, NULL),
(9, 'CLASS_REQUEST_SCHOOL', 'meminta bergabung dengan sekolah', 'a', 'Pemberitahuan permintaan kelas pada sekolah', 'a', 's', 1, '2020-09-10 19:45:39', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_param`
--

CREATE TABLE `m_param` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `value` text COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `m_param`
--

INSERT INTO `m_param` (`id`, `name`, `value`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'NAME', 'School From Home', 'app name', 1, '2020-07-20 17:54:38', 'SYSTEM', NULL, NULL),
(2, 'SLUG', 'SFH', 'abbreviation', 1, '2020-07-23 21:01:11', 'SYSTEM', NULL, NULL),
(3, 'UPLOAD_DIR', './files', 'file upload directory', 1, '2020-07-20 17:54:38', 'SYSTEM', NULL, NULL),
(4, 'MAIL_INTERVAL_VERIFICATION', '1', 'hour', 1, '2020-07-23 20:58:04', 'SYSTEM', NULL, NULL),
(5, 'MAIL_INTERVAL_FORGOT_PASSWORD', '24', 'hour', 1, '2020-07-23 20:57:58', 'SYSTEM', NULL, NULL),
(6, 'TOKEN_VALIDITY', '24', 'hour', 1, '2020-07-23 21:01:11', 'SYSTEM', NULL, NULL),
(7, 'MAIL_INTERVAL_MEMBER_INVITATION', '1', 'hour', 1, '2020-07-23 20:58:04', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `m_recurrent`
--

CREATE TABLE `m_recurrent` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `m_recurrent`
--

INSERT INTO `m_recurrent` (`id`, `name`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'HOURLY', NULL, 1, '2020-08-15 21:04:16', 'SYSTEM', NULL, NULL),
(2, 'DAILY', NULL, 1, '2020-08-15 21:04:16', 'SYSTEM', NULL, NULL),
(3, 'WEEKLY', NULL, 1, '2020-08-15 21:04:16', 'SYSTEM', NULL, NULL),
(4, 'MONTHLY', NULL, 1, '2020-08-15 21:04:16', 'SYSTEM', NULL, NULL),
(5, 'YEARLY', NULL, 1, '2020-08-15 21:04:16', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sec_confirmation`
--

CREATE TABLE `sec_confirmation` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '' COMMENT 'email verification, forgot passwprd, etc.',
  `sec_registrant_id` int(11) UNSIGNED DEFAULT NULL,
  `sec_user_id` int(11) UNSIGNED DEFAULT NULL,
  `t_school_id` int(11) UNSIGNED DEFAULT NULL,
  `sender_addr` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `is_sent` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `sec_confirmation`
--

INSERT INTO `sec_confirmation` (`id`, `description`, `sec_registrant_id`, `sec_user_id`, `t_school_id`, `sender_addr`, `code`, `is_sent`, `status`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'ACCOUNT_ACTIVATION', 1, NULL, NULL, 'sfh-dev@karpalabs.com', 'af2dbf4569832d176946d1010f542efa', 1, -1, 'SYSTEM', '2020-09-01 08:01:39', 'SYSTEM', '2020-09-01 08:05:10'),
(2, 'ACCOUNT_ACTIVATION', 2, NULL, NULL, 'sfh-dev@karpalabs.com', 'a696036cd2a80999ab146b60f4cbbf0e', 1, -1, 'SYSTEM', '2020-09-10 07:28:36', 'SYSTEM', '2020-09-10 07:29:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sec_group`
--

CREATE TABLE `sec_group` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `sec_group`
--

INSERT INTO `sec_group` (`id`, `name`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'OWNER', 1, '2020-07-13 10:45:17', 'SYSTEM', NULL, NULL),
(2, 'MAINTENER', 1, '2020-07-13 10:45:31', 'SYSTEM', NULL, NULL),
(3, 'PARTICIPANT', 1, '2020-07-13 10:45:31', 'SYSTEM', NULL, NULL),
(4, 'GUEST', 1, '2020-07-13 10:45:31', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sec_registrant`
--

CREATE TABLE `sec_registrant` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `username` varchar(100) COLLATE utf8_bin DEFAULT '',
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT 0,
  `phone` varchar(15) COLLATE utf8_bin DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `sec_registrant`
--

INSERT INTO `sec_registrant` (`id`, `name`, `email`, `username`, `password`, `is_email_validated`, `phone`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'Dwiyan', 'putra.dwiyan26@gmail.com', '', 'd03d3c93506c4294d498178e5dbe4a1972f20f8cf4fedb7524903198e1039a54', 1, '087782118653', -1, '2020-09-01 08:01:38', 'SYSTEM', '2020-09-01 08:05:10', 'SYSTEM'),
(2, 'Rashgaroth', 'putra.dwiyan20@gmail.com', '', 'b0942bb84e7d789bc1f242f6d6a66a95492fcba36b74ea9da6fceeffe150838f', 1, '0877782128271', -1, '2020-09-10 07:28:35', 'SYSTEM', '2020-09-10 07:29:02', 'SYSTEM');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sec_token`
--

CREATE TABLE `sec_token` (
  `id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `token` text COLLATE utf8_bin NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `sec_token`
--

INSERT INTO `sec_token` (`id`, `sec_user_id`, `token`, `valid_until`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, 'd609492680de6d1e0765fdc23cfe64cfb3542d6d49dd6a61633fc0a55fb9bb40', '2020-09-05 02:32:36', -1, '2020-09-01 08:05:22', 'SYSTEM', '2020-09-04 02:32:36', 'putra.dwiyan26@gmail.com'),
(2, 1, '09492c7361795ca1099b76ed8f29a9783b3b824a9e2850ad3b9a298f2862bf7d', '2020-09-05 02:23:08', -1, '2020-09-01 10:39:02', 'SYSTEM', '2020-09-04 02:23:08', 'putra.dwiyan26@gmail.com'),
(3, 1, '203c26a16b8c453dc63db9e8fbb06f338333c0b3fd76db5a6f2f457b215436dd', '2020-09-08 04:34:49', -1, '2020-09-05 04:41:46', 'SYSTEM', '2020-09-07 04:34:49', 'putra.dwiyan26@gmail.com'),
(4, 1, 'a73f55a8cae40701739726009dcd38f851d1566f0ec6ae6b96dd4cbfe59a75f8', '2020-09-11 06:47:10', -1, '2020-09-08 05:08:23', 'SYSTEM', '2020-09-10 06:47:10', 'putra.dwiyan26@gmail.com'),
(5, 1, '0e0c66cecd08ed0d60b7bc6ed8a953e468b576ea26e98d5c8d465df6f81d9580', '2020-09-11 06:49:16', -1, '2020-09-10 06:48:12', 'SYSTEM', '2020-09-10 06:49:16', 'putra.dwiyan26@gmail.com'),
(6, 1, '05794fe5e63b42c437bc623f42c59efb94454336b4b36d83e3eb48266b73f509', '2020-09-11 07:25:31', 1, '2020-09-10 06:52:31', 'SYSTEM', '2020-09-10 07:25:31', 'putra.dwiyan26@gmail.com'),
(7, 2, '93be86c36b37bc9d238962c14147665a7d99f402ff5c7ce25c43ff7a5762133b', '2020-09-11 12:24:27', 1, '2020-09-10 07:29:14', 'SYSTEM', '2020-09-10 12:24:27', 'putra.dwiyan20@gmail.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sec_user`
--

CREATE TABLE `sec_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `username` varchar(100) COLLATE utf8_bin DEFAULT '',
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_email_validated` tinyint(4) NOT NULL DEFAULT 0,
  `phone` varchar(15) COLLATE utf8_bin DEFAULT '',
  `is_phone_validated` tinyint(4) DEFAULT 0,
  `avatar` text COLLATE utf8_bin DEFAULT NULL,
  `auth_provider` tinyint(4) NOT NULL DEFAULT 0,
  `auth_profile_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `auth_data` text COLLATE utf8_bin DEFAULT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `sec_user`
--

INSERT INTO `sec_user` (`id`, `name`, `email`, `username`, `password`, `is_email_validated`, `phone`, `is_phone_validated`, `avatar`, `auth_provider`, `auth_profile_id`, `auth_data`, `is_admin`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'Dwiyan', 'putra.dwiyan26@gmail.com', '', 'd03d3c93506c4294d498178e5dbe4a1972f20f8cf4fedb7524903198e1039a54', 1, '087782118653', 0, NULL, 0, NULL, NULL, 0, 1, '2020-09-01 08:05:10', 'SYSTEM', NULL, NULL),
(2, 'Rashgaroth', 'putra.dwiyan20@gmail.com', '', 'b0942bb84e7d789bc1f242f6d6a66a95492fcba36b74ea9da6fceeffe150838f', 1, '0877782128271', 0, NULL, 0, NULL, NULL, 0, 1, '2020-09-10 07:29:03', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class`
--

CREATE TABLE `t_class` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_id` int(11) UNSIGNED DEFAULT NULL,
  `code` varchar(10) COLLATE utf8_bin NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` varchar(200) COLLATE utf8_bin DEFAULT '',
  `avatar` text COLLATE utf8_bin DEFAULT NULL,
  `link_status` tinyint(4) NOT NULL DEFAULT 0,
  `note` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `t_class`
--

INSERT INTO `t_class` (`id`, `t_school_id`, `code`, `name`, `description`, `avatar`, `link_status`, `note`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, '152', 'Kelas 12 A', 'kelas 12 a', 'a', 1, 'qweewq', 1, '2020-09-03 17:12:45', 'SYSTEM', NULL, NULL),
(2, 1, '002', 'Kelas 12B', 'Kelas 12 B ', NULL, 1, NULL, 1, '2020-09-10 14:31:01', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_forum`
--

CREATE TABLE `t_class_forum` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `published_datetime` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_forum_comment`
--

CREATE TABLE `t_class_forum_comment` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_forum_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `published_datetime` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_forum_comment_mention`
--

CREATE TABLE `t_class_forum_comment_mention` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_forum_comment_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_forum_file`
--

CREATE TABLE `t_class_forum_file` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_forum_id` int(11) UNSIGNED NOT NULL,
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) UNSIGNED DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_forum_mention`
--

CREATE TABLE `t_class_forum_mention` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_forum_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_member`
--

CREATE TABLE `t_class_member` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_id` int(11) UNSIGNED DEFAULT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `sec_group_id` int(11) UNSIGNED NOT NULL,
  `link_status` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `t_class_member`
--

INSERT INTO `t_class_member` (`id`, `t_class_id`, `sec_user_id`, `sec_group_id`, `link_status`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, 1, 4, 1, 1, '2020-09-03 17:13:10', 'SYSTEM', NULL, NULL),
(2, 2, 2, 3, 1, 1, '2020-09-10 14:31:28', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_subject`
--

CREATE TABLE `t_class_subject` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_task`
--

CREATE TABLE `t_class_task` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_subject_id` int(11) UNSIGNED NOT NULL,
  `t_class_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL COMMENT 'user assignor a task, in this case a teacher',
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `notes` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `weight` decimal(4,2) DEFAULT 0.00,
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_task_collection`
--

CREATE TABLE `t_class_task_collection` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_task_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL COMMENT 'user that given finished task, in this case student',
  `submitted_date` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_task_collection_file`
--

CREATE TABLE `t_class_task_collection_file` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_task_collection_id` int(11) UNSIGNED NOT NULL,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) UNSIGNED DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_task_file`
--

CREATE TABLE `t_class_task_file` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_task_id` int(11) UNSIGNED NOT NULL,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) UNSIGNED DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_todo`
--

CREATE TABLE `t_class_todo` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `t_class_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `m_recurrent_id` int(11) UNSIGNED DEFAULT NULL,
  `subscriber` enum('all','maintener','participant') NOT NULL DEFAULT 'all',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_todo_answer`
--

CREATE TABLE `t_class_todo_answer` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_todo_id` int(11) UNSIGNED NOT NULL,
  `t_class_todo_detail_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_todo_detail`
--

CREATE TABLE `t_class_todo_detail` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_todo_id` int(11) UNSIGNED NOT NULL,
  `m_answer_type_id` int(11) UNSIGNED NOT NULL,
  `type` enum('todo','popquiz') NOT NULL DEFAULT 'todo',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `valid_answer` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `is_recurrent` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `todo_date` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_todo_exception`
--

CREATE TABLE `t_class_todo_exception` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_todo_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `value_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_class_todo_option`
--

CREATE TABLE `t_class_todo_option` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_class_todo_detail_id` int(11) UNSIGNED NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_notification`
--

CREATE TABLE `t_notification` (
  `id` int(11) UNSIGNED NOT NULL,
  `m_notification_type_id` int(11) UNSIGNED NOT NULL,
  `sender_user_id` int(11) UNSIGNED DEFAULT NULL,
  `receiver_user_id` int(11) UNSIGNED NOT NULL,
  `out_id` int(11) UNSIGNED DEFAULT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `variable` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `notification_datetime` datetime NOT NULL,
  `notification_year` smallint(5) UNSIGNED NOT NULL,
  `notification_month` tinyint(4) UNSIGNED NOT NULL,
  `is_read` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `t_notification`
--

INSERT INTO `t_notification` (`id`, `m_notification_type_id`, `sender_user_id`, `receiver_user_id`, `out_id`, `out_name`, `variable`, `notification_datetime`, `notification_year`, `notification_month`, `is_read`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(9, 7, 1, 2, 1, 't_class', NULL, '2020-09-10 17:05:29', 2020, 9, 1, 1, '2020-09-10 17:06:12', 'SYSTEM', NULL, NULL),
(10, 4, 1, 2, 1, 't_class', NULL, '2020-09-09 19:18:07', 2020, 9, 0, 1, '2020-09-10 19:18:34', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_notification_user`
--

CREATE TABLE `t_notification_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `m_notification_type_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `out_id` int(11) UNSIGNED DEFAULT NULL,
  `out_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `is_receive_web` tinyint(4) UNSIGNED NOT NULL DEFAULT 1,
  `is_receive_email` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `is_receive_sms` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `t_notification_user`
--

INSERT INTO `t_notification_user` (`id`, `m_notification_type_id`, `sec_user_id`, `out_id`, `out_name`, `is_receive_web`, `is_receive_email`, `is_receive_sms`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, 1, 1, 't_class', 1, 1, 0, 1, '2020-09-01 17:27:11', 'SYSTEM', NULL, NULL),
(5, 5, 1, 1, 't_school', 1, 1, 1, 1, '2020-09-03 19:30:15', 'SYSTEM', NULL, NULL),
(6, 2, 1, 1, 't_class', 1, 1, 1, 1, '2020-09-05 11:45:32', 'SYSTEM', NULL, NULL),
(7, 3, 1, 1, 't_class', 1, 1, 1, 1, '2020-09-05 11:45:32', 'SYSTEM', NULL, NULL),
(8, 7, 1, 1, 't_class', 1, 1, 1, 1, '2020-09-08 12:29:17', 'SYSTEM', NULL, NULL),
(9, 1, 2, 2, 't_class', 1, 1, 0, 1, '2020-09-10 14:49:03', 'SYSTEM', NULL, NULL),
(10, 2, 2, 2, 't_class', 1, 1, 0, 1, '2020-09-10 14:49:03', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school`
--

CREATE TABLE `t_school` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_id` int(11) UNSIGNED DEFAULT NULL,
  `code` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `zipcode` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `avatar` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `t_school`
--

INSERT INTO `t_school` (`id`, `t_school_id`, `code`, `name`, `address`, `zipcode`, `phone`, `avatar`, `note`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, '152', 'SMAN 16 KABUPATEN TANGERANG', 'Kabupaten Tangerang', 'AA__12', '021868572', 'aa', 'aa', 1, '2020-09-03 17:06:55', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_forum`
--

CREATE TABLE `t_school_forum` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `published_datetime` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_forum_comment`
--

CREATE TABLE `t_school_forum_comment` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_forum_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `published_datetime` datetime NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_forum_comment_mention`
--

CREATE TABLE `t_school_forum_comment_mention` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_forum_comment_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_forum_file`
--

CREATE TABLE `t_school_forum_file` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_forum_id` int(11) UNSIGNED NOT NULL,
  `filename` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ext` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `mime_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `sequence` mediumint(8) UNSIGNED DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_forum_mention`
--

CREATE TABLE `t_school_forum_mention` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_forum_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_member`
--

CREATE TABLE `t_school_member` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_id` int(11) UNSIGNED DEFAULT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `sec_group_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `t_school_member`
--

INSERT INTO `t_school_member` (`id`, `t_school_id`, `sec_user_id`, `sec_group_id`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 1, 1, 4, 1, '2020-09-06 20:20:55', 'SYSTEM', NULL, NULL),
(2, 1, 2, 3, 1, '2020-09-10 14:33:12', 'SYSTEM', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_todo`
--

CREATE TABLE `t_school_todo` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `t_school_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `m_recurrent_id` int(11) UNSIGNED DEFAULT NULL,
  `subscriber` enum('all','maintener','participant') NOT NULL DEFAULT 'all',
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_todo_answer`
--

CREATE TABLE `t_school_todo_answer` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_todo_id` int(11) UNSIGNED NOT NULL,
  `t_school_todo_detail_id` int(11) UNSIGNED NOT NULL,
  `sec_user_id` int(11) UNSIGNED NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_todo_detail`
--

CREATE TABLE `t_school_todo_detail` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_todo_id` int(11) UNSIGNED NOT NULL,
  `m_answer_type_id` int(11) UNSIGNED NOT NULL,
  `type` enum('todo','popquiz') NOT NULL DEFAULT 'todo',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `valid_answer` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `is_recurrent` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `todo_date` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_todo_exception`
--

CREATE TABLE `t_school_todo_exception` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_todo_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `value_datetime` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_school_todo_option`
--

CREATE TABLE `t_school_todo_option` (
  `id` int(11) UNSIGNED NOT NULL,
  `t_school_todo_detail_id` int(11) UNSIGNED NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'SYSTEM',
  `updated_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `log_audit`
--
ALTER TABLE `log_audit`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `m_answer_type`
--
ALTER TABLE `m_answer_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `m_notification_default`
--
ALTER TABLE `m_notification_default`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_notification_type_id` (`m_notification_type_id`);

--
-- Indeks untuk tabel `m_notification_type`
--
ALTER TABLE `m_notification_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indeks untuk tabel `m_param`
--
ALTER TABLE `m_param`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `m_recurrent`
--
ALTER TABLE `m_recurrent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `sec_confirmation`
--
ALTER TABLE `sec_confirmation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sec_registrant_id` (`sec_registrant_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `sec_group`
--
ALTER TABLE `sec_group`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sec_registrant`
--
ALTER TABLE `sec_registrant`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sec_token`
--
ALTER TABLE `sec_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `sec_user`
--
ALTER TABLE `sec_user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `t_class`
--
ALTER TABLE `t_class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_id` (`t_school_id`);

--
-- Indeks untuk tabel `t_class_forum`
--
ALTER TABLE `t_class_forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_id` (`t_class_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_forum_comment`
--
ALTER TABLE `t_class_forum_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_forum_id` (`t_class_forum_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_forum_comment_mention`
--
ALTER TABLE `t_class_forum_comment_mention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_forum_comment_id` (`t_class_forum_comment_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_forum_file`
--
ALTER TABLE `t_class_forum_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_forum_id` (`t_class_forum_id`);

--
-- Indeks untuk tabel `t_class_forum_mention`
--
ALTER TABLE `t_class_forum_mention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_forum_id` (`t_class_forum_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_member`
--
ALTER TABLE `t_class_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_id` (`t_class_id`),
  ADD KEY `sec_user_id` (`sec_user_id`),
  ADD KEY `sec_group_id` (`sec_group_id`);

--
-- Indeks untuk tabel `t_class_subject`
--
ALTER TABLE `t_class_subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_id` (`t_class_id`);

--
-- Indeks untuk tabel `t_class_task`
--
ALTER TABLE `t_class_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_subject_id` (`t_class_subject_id`),
  ADD KEY `t_class_id` (`t_class_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_task_collection`
--
ALTER TABLE `t_class_task_collection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_task_id` (`t_class_task_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_task_collection_file`
--
ALTER TABLE `t_class_task_collection_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_task_collection_id` (`t_class_task_collection_id`);

--
-- Indeks untuk tabel `t_class_task_file`
--
ALTER TABLE `t_class_task_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_task_id` (`t_class_task_id`);

--
-- Indeks untuk tabel `t_class_todo`
--
ALTER TABLE `t_class_todo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_id` (`t_class_id`),
  ADD KEY `sec_user_id` (`sec_user_id`),
  ADD KEY `m_recurrent_id` (`m_recurrent_id`);

--
-- Indeks untuk tabel `t_class_todo_answer`
--
ALTER TABLE `t_class_todo_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_todo_id` (`t_class_todo_id`),
  ADD KEY `t_class_todo_detail_id` (`t_class_todo_detail_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_class_todo_detail`
--
ALTER TABLE `t_class_todo_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_todo_id` (`t_class_todo_id`),
  ADD KEY `m_answer_type_id` (`m_answer_type_id`);

--
-- Indeks untuk tabel `t_class_todo_exception`
--
ALTER TABLE `t_class_todo_exception`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_todo_id` (`t_class_todo_id`);

--
-- Indeks untuk tabel `t_class_todo_option`
--
ALTER TABLE `t_class_todo_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_class_todo_detail_id` (`t_class_todo_detail_id`);

--
-- Indeks untuk tabel `t_notification`
--
ALTER TABLE `t_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_user_id` (`sender_user_id`),
  ADD KEY `receiver_user_id` (`receiver_user_id`),
  ADD KEY `m_notification_type_id` (`m_notification_type_id`);

--
-- Indeks untuk tabel `t_notification_user`
--
ALTER TABLE `t_notification_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sec_user_id` (`sec_user_id`),
  ADD KEY `m_notification_type_id` (`m_notification_type_id`);

--
-- Indeks untuk tabel `t_school`
--
ALTER TABLE `t_school`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_id` (`t_school_id`);

--
-- Indeks untuk tabel `t_school_forum`
--
ALTER TABLE `t_school_forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_id` (`t_school_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_school_forum_comment`
--
ALTER TABLE `t_school_forum_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_forum_id` (`t_school_forum_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_school_forum_comment_mention`
--
ALTER TABLE `t_school_forum_comment_mention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_forum_comment_id` (`t_school_forum_comment_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_school_forum_file`
--
ALTER TABLE `t_school_forum_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_forum_id` (`t_school_forum_id`);

--
-- Indeks untuk tabel `t_school_forum_mention`
--
ALTER TABLE `t_school_forum_mention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_forum_id` (`t_school_forum_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_school_member`
--
ALTER TABLE `t_school_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_id` (`t_school_id`),
  ADD KEY `sec_user_id` (`sec_user_id`),
  ADD KEY `sec_group_id` (`sec_group_id`);

--
-- Indeks untuk tabel `t_school_todo`
--
ALTER TABLE `t_school_todo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_id` (`t_school_id`),
  ADD KEY `sec_user_id` (`sec_user_id`),
  ADD KEY `m_recurrent_id` (`m_recurrent_id`);

--
-- Indeks untuk tabel `t_school_todo_answer`
--
ALTER TABLE `t_school_todo_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_todo_id` (`t_school_todo_id`),
  ADD KEY `t_school_todo_detail_id` (`t_school_todo_detail_id`),
  ADD KEY `sec_user_id` (`sec_user_id`);

--
-- Indeks untuk tabel `t_school_todo_detail`
--
ALTER TABLE `t_school_todo_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_todo_id` (`t_school_todo_id`),
  ADD KEY `m_answer_type_id` (`m_answer_type_id`);

--
-- Indeks untuk tabel `t_school_todo_exception`
--
ALTER TABLE `t_school_todo_exception`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_todo_id` (`t_school_todo_id`);

--
-- Indeks untuk tabel `t_school_todo_option`
--
ALTER TABLE `t_school_todo_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_school_todo_detail_id` (`t_school_todo_detail_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `m_answer_type`
--
ALTER TABLE `m_answer_type`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `m_notification_default`
--
ALTER TABLE `m_notification_default`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `m_notification_type`
--
ALTER TABLE `m_notification_type`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `m_param`
--
ALTER TABLE `m_param`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `m_recurrent`
--
ALTER TABLE `m_recurrent`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `sec_confirmation`
--
ALTER TABLE `sec_confirmation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `sec_group`
--
ALTER TABLE `sec_group`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `sec_registrant`
--
ALTER TABLE `sec_registrant`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `sec_token`
--
ALTER TABLE `sec_token`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `sec_user`
--
ALTER TABLE `sec_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_class`
--
ALTER TABLE `t_class`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_class_forum`
--
ALTER TABLE `t_class_forum`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_forum_comment`
--
ALTER TABLE `t_class_forum_comment`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_forum_comment_mention`
--
ALTER TABLE `t_class_forum_comment_mention`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_forum_file`
--
ALTER TABLE `t_class_forum_file`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_forum_mention`
--
ALTER TABLE `t_class_forum_mention`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_member`
--
ALTER TABLE `t_class_member`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_class_subject`
--
ALTER TABLE `t_class_subject`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_task`
--
ALTER TABLE `t_class_task`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_task_collection`
--
ALTER TABLE `t_class_task_collection`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_task_collection_file`
--
ALTER TABLE `t_class_task_collection_file`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_task_file`
--
ALTER TABLE `t_class_task_file`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_todo`
--
ALTER TABLE `t_class_todo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_todo_answer`
--
ALTER TABLE `t_class_todo_answer`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_todo_detail`
--
ALTER TABLE `t_class_todo_detail`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_todo_exception`
--
ALTER TABLE `t_class_todo_exception`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_class_todo_option`
--
ALTER TABLE `t_class_todo_option`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_notification`
--
ALTER TABLE `t_notification`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `t_notification_user`
--
ALTER TABLE `t_notification_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `t_school`
--
ALTER TABLE `t_school`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `t_school_forum`
--
ALTER TABLE `t_school_forum`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_forum_comment`
--
ALTER TABLE `t_school_forum_comment`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_forum_comment_mention`
--
ALTER TABLE `t_school_forum_comment_mention`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_forum_file`
--
ALTER TABLE `t_school_forum_file`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_forum_mention`
--
ALTER TABLE `t_school_forum_mention`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_member`
--
ALTER TABLE `t_school_member`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_school_todo`
--
ALTER TABLE `t_school_todo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_todo_answer`
--
ALTER TABLE `t_school_todo_answer`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_todo_detail`
--
ALTER TABLE `t_school_todo_detail`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_todo_exception`
--
ALTER TABLE `t_school_todo_exception`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `t_school_todo_option`
--
ALTER TABLE `t_school_todo_option`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `m_notification_default`
--
ALTER TABLE `m_notification_default`
  ADD CONSTRAINT `m_notification_default_ibfk_1` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sec_confirmation`
--
ALTER TABLE `sec_confirmation`
  ADD CONSTRAINT `sec_confirmation_ibfk_1` FOREIGN KEY (`sec_registrant_id`) REFERENCES `sec_registrant` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sec_confirmation_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sec_token`
--
ALTER TABLE `sec_token`
  ADD CONSTRAINT `sec_token_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class`
--
ALTER TABLE `t_class`
  ADD CONSTRAINT `t_class_ibfk_1` FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_forum`
--
ALTER TABLE `t_class_forum`
  ADD CONSTRAINT `t_class_forum_ibfk_1` FOREIGN KEY (`t_class_id`) REFERENCES `t_class` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_forum_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`);

--
-- Ketidakleluasaan untuk tabel `t_class_forum_comment`
--
ALTER TABLE `t_class_forum_comment`
  ADD CONSTRAINT `t_class_forum_comment_ibfk_1` FOREIGN KEY (`t_class_forum_id`) REFERENCES `t_class_forum` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_forum_comment_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_forum_comment_mention`
--
ALTER TABLE `t_class_forum_comment_mention`
  ADD CONSTRAINT `t_class_forum_comment_mention_ibfk_1` FOREIGN KEY (`t_class_forum_comment_id`) REFERENCES `t_class_forum_comment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_forum_comment_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_forum_file`
--
ALTER TABLE `t_class_forum_file`
  ADD CONSTRAINT `t_class_forum_file_ibfk_1` FOREIGN KEY (`t_class_forum_id`) REFERENCES `t_class_forum` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_forum_mention`
--
ALTER TABLE `t_class_forum_mention`
  ADD CONSTRAINT `t_class_forum_mention_ibfk_1` FOREIGN KEY (`t_class_forum_id`) REFERENCES `t_class_forum` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_forum_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_member`
--
ALTER TABLE `t_class_member`
  ADD CONSTRAINT `t_class_member_ibfk_1` FOREIGN KEY (`t_class_id`) REFERENCES `t_class` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_member_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_member_ibfk_3` FOREIGN KEY (`sec_group_id`) REFERENCES `sec_group` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_subject`
--
ALTER TABLE `t_class_subject`
  ADD CONSTRAINT `t_class_subject_ibfk_1` FOREIGN KEY (`t_class_id`) REFERENCES `t_class` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_task`
--
ALTER TABLE `t_class_task`
  ADD CONSTRAINT `t_class_task_ibfk_1` FOREIGN KEY (`t_class_subject_id`) REFERENCES `t_class_subject` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_task_ibfk_2` FOREIGN KEY (`t_class_id`) REFERENCES `t_class` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_task_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_task_collection`
--
ALTER TABLE `t_class_task_collection`
  ADD CONSTRAINT `t_class_task_collection_ibfk_1` FOREIGN KEY (`t_class_task_id`) REFERENCES `t_class_task` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_task_collection_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_task_collection_file`
--
ALTER TABLE `t_class_task_collection_file`
  ADD CONSTRAINT `t_class_task_collection_file_ibfk_1` FOREIGN KEY (`t_class_task_collection_id`) REFERENCES `t_class_task_collection` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_task_file`
--
ALTER TABLE `t_class_task_file`
  ADD CONSTRAINT `t_class_task_file_ibfk_1` FOREIGN KEY (`t_class_task_id`) REFERENCES `t_class_task` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_todo`
--
ALTER TABLE `t_class_todo`
  ADD CONSTRAINT `t_class_todo_ibfk_1` FOREIGN KEY (`t_class_id`) REFERENCES `t_class` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_todo_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_todo_ibfk_3` FOREIGN KEY (`m_recurrent_id`) REFERENCES `m_recurrent` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_todo_answer`
--
ALTER TABLE `t_class_todo_answer`
  ADD CONSTRAINT `t_class_todo_answer_ibfk_1` FOREIGN KEY (`t_class_todo_id`) REFERENCES `t_class_todo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_todo_answer_ibfk_2` FOREIGN KEY (`t_class_todo_detail_id`) REFERENCES `t_class_todo_detail` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_todo_answer_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_todo_detail`
--
ALTER TABLE `t_class_todo_detail`
  ADD CONSTRAINT `t_class_todo_detail_ibfk_1` FOREIGN KEY (`t_class_todo_id`) REFERENCES `t_class_todo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_class_todo_detail_ibfk_2` FOREIGN KEY (`m_answer_type_id`) REFERENCES `m_answer_type` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_todo_exception`
--
ALTER TABLE `t_class_todo_exception`
  ADD CONSTRAINT `t_class_todo_exception_ibfk_1` FOREIGN KEY (`t_class_todo_id`) REFERENCES `t_class_todo` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_class_todo_option`
--
ALTER TABLE `t_class_todo_option`
  ADD CONSTRAINT `t_class_todo_option_ibfk_1` FOREIGN KEY (`t_class_todo_detail_id`) REFERENCES `t_class_todo_detail` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_notification`
--
ALTER TABLE `t_notification`
  ADD CONSTRAINT `t_notification_ibfk_1` FOREIGN KEY (`sender_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_notification_ibfk_2` FOREIGN KEY (`receiver_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_notification_ibfk_3` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_notification_user`
--
ALTER TABLE `t_notification_user`
  ADD CONSTRAINT `t_notification_user_ibfk_1` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_notification_user_ibfk_2` FOREIGN KEY (`m_notification_type_id`) REFERENCES `m_notification_type` (`id`);

--
-- Ketidakleluasaan untuk tabel `t_school`
--
ALTER TABLE `t_school`
  ADD CONSTRAINT `t_school_ibfk_1` FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_forum`
--
ALTER TABLE `t_school_forum`
  ADD CONSTRAINT `t_school_forum_ibfk_1` FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_forum_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`);

--
-- Ketidakleluasaan untuk tabel `t_school_forum_comment`
--
ALTER TABLE `t_school_forum_comment`
  ADD CONSTRAINT `t_school_forum_comment_ibfk_1` FOREIGN KEY (`t_school_forum_id`) REFERENCES `t_school_forum` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_forum_comment_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_forum_comment_mention`
--
ALTER TABLE `t_school_forum_comment_mention`
  ADD CONSTRAINT `t_school_forum_comment_mention_ibfk_1` FOREIGN KEY (`t_school_forum_comment_id`) REFERENCES `t_school_forum_comment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_forum_comment_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_forum_file`
--
ALTER TABLE `t_school_forum_file`
  ADD CONSTRAINT `t_school_forum_file_ibfk_1` FOREIGN KEY (`t_school_forum_id`) REFERENCES `t_school_forum` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_forum_mention`
--
ALTER TABLE `t_school_forum_mention`
  ADD CONSTRAINT `t_school_forum_mention_ibfk_1` FOREIGN KEY (`t_school_forum_id`) REFERENCES `t_school_forum` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_forum_mention_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_member`
--
ALTER TABLE `t_school_member`
  ADD CONSTRAINT `t_school_member_ibfk_1` FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_member_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_member_ibfk_3` FOREIGN KEY (`sec_group_id`) REFERENCES `sec_group` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_todo`
--
ALTER TABLE `t_school_todo`
  ADD CONSTRAINT `t_school_todo_ibfk_1` FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_todo_ibfk_2` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_todo_ibfk_3` FOREIGN KEY (`m_recurrent_id`) REFERENCES `m_recurrent` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_todo_answer`
--
ALTER TABLE `t_school_todo_answer`
  ADD CONSTRAINT `t_school_todo_answer_ibfk_1` FOREIGN KEY (`t_school_todo_id`) REFERENCES `t_school_todo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_todo_answer_ibfk_2` FOREIGN KEY (`t_school_todo_detail_id`) REFERENCES `t_school_todo_detail` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_todo_answer_ibfk_3` FOREIGN KEY (`sec_user_id`) REFERENCES `sec_user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_todo_detail`
--
ALTER TABLE `t_school_todo_detail`
  ADD CONSTRAINT `t_school_todo_detail_ibfk_1` FOREIGN KEY (`t_school_todo_id`) REFERENCES `t_school_todo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `t_school_todo_detail_ibfk_2` FOREIGN KEY (`m_answer_type_id`) REFERENCES `m_answer_type` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_todo_exception`
--
ALTER TABLE `t_school_todo_exception`
  ADD CONSTRAINT `t_school_todo_exception_ibfk_1` FOREIGN KEY (`t_school_todo_id`) REFERENCES `t_school_todo` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `t_school_todo_option`
--
ALTER TABLE `t_school_todo_option`
  ADD CONSTRAINT `t_school_todo_option_ibfk_1` FOREIGN KEY (`t_school_todo_detail_id`) REFERENCES `t_school_todo_detail` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
