ALTER TABLE `sec_confirmation` ADD FOREIGN KEY (`t_school_id`) REFERENCES `t_school` (`id`) ON UPDATE CASCADE;
ALTER TABLE `t_class` CHANGE `link_status` `link_status` TINYINT(4)  NULL  DEFAULT '0';
ALTER TABLE `t_class_member` CHANGE `link_status` `link_status` TINYINT(4)  NULL  DEFAULT '0';
