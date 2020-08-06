ALTER TABLE `m_class` CHANGE `m_school_id` `m_school_id` INT(11)  UNSIGNED  NULL;
ALTER TABLE `sec_user` ADD `is_adim` TINYINT(4)  NOT NULL  DEFAULT '0'  AFTER `auth_data`;
ALTER TABLE `m_school` ADD `note` VARCHAR(200) COLLATE utf8_bin NULL DEFAULT '' AFTER `avatar`;
ALTER TABLE `m_class` ADD `link_status` TINYINT(4) NOT NULL DEFAULT '1' AFTER `avatar`; 