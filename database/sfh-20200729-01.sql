ALTER TABLE `m_class` CHANGE `m_school_id` `m_school_id` INT(11) UNSIGNED NULL;
ALTER TABLE `sec_user` ADD `is_admin` TINYINT(4) NOT NULL DEFAULT '0' AFTER `auth_data`;
ALTER TABLE `m_school` ADD `note` VARCHAR(200) NULL DEFAULT NULL AFTER `avatar`;
ALTER TABLE `m_class` ADD `link_status` TINYINT(4) NOT NULL DEFAULT '0' AFTER `status`;
ALTER TABLE `sec_confirmation` ADD `m_school_id` INT(11) UNSIGNED NULL DEFAULT NULL AFTER `sec_user_id`;
INSERT INTO `m_param` (`id`, `name`, `value`, `description`, `status`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES (7, 'MAIL_INTERVAL_MEMBER_INVITATION', '1', 'hour', '1', '2020-07-23 20:58:04', 'SYSTEM', NULL, NULL)