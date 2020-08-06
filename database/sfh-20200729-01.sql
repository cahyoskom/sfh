ALTER TABLE `m_class` CHANGE `m_school_id` `m_school_id` INT(11)  UNSIGNED  NULL;
ALTER TABLE `sec_user` ADD `is_adim` TINYINT(4)  NOT NULL  DEFAULT '0'  AFTER `auth_data`;
