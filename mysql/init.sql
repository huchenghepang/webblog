CREATE DATABASE IF NOT EXISTS `my_store`
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE `my_store`;


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 为 my_admin 用户授予所有权限
GRANT ALL PRIVILEGES ON my_store.* TO 'my_admin'@'%';

-- 刷新权限，使更改生效
FLUSH PRIVILEGES;


-- ----------------------------
-- Table structure for Permissions
-- ----------------------------
DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions`  (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` enum('route','button') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `can_delete` tinyint(1) NULL DEFAULT 1,
  `permission_value` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE,
  UNIQUE INDEX `permission_name`(`permission_name` ASC) USING BTREE,
  INDEX `parent_id`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `Permissions_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `Permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;







-- ----------------------------
-- Table structure for RolePermissions
-- ----------------------------
DROP TABLE IF EXISTS `RolePermissions`;
CREATE TABLE `RolePermissions`  (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`) USING BTREE,
  INDEX `permission_id`(`permission_id` ASC) USING BTREE,
  CONSTRAINT `RolePermissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `RolePermissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `Permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Roles
-- ----------------------------
DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles`  (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL COMMENT '自动得到创建的时间',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT '更新时得到时间',
  PRIMARY KEY (`role_id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for UserRoles
-- ----------------------------
DROP TABLE IF EXISTS `UserRoles`;
CREATE TABLE `UserRoles`  (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `UserRoles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `UserRoles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for article_categories
-- ----------------------------
DROP TABLE IF EXISTS `article_categories`;
CREATE TABLE `article_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `level` tinyint NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `name`) USING BTREE,
  UNIQUE INDEX `cayegories_name`(`name` ASC) USING BTREE COMMENT '唯一',
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for comment_likes
-- ----------------------------
DROP TABLE IF EXISTS `comment_likes`;
CREATE TABLE `comment_likes`  (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`) USING BTREE,
  UNIQUE INDEX `user_id`(`user_id` ASC, `comment_id` ASC) USING BTREE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 292 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `comment_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int UNSIGNED NULL DEFAULT 0,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'pending',
  `like_count` int UNSIGNED NULL DEFAULT 0,
  `reply_count` int UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`comment_id`, `article_id`, `user_id`) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `comment_id`(`comment_id` ASC) USING BTREE,
  CONSTRAINT `article_id` FOREIGN KEY (`article_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 129 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for files_info
-- ----------------------------
DROP TABLE IF EXISTS `files_info`;
CREATE TABLE `files_info`  (
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '文件名',
  `file_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件id',
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件路径',
  `file_ext` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件后缀',
  `file_createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件创建的时间',
  `file_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件的类型',
  `file_size` double NULL DEFAULT NULL COMMENT '文件的大小',
  `file_fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件全名',
  PRIMARY KEY (`file_id` DESC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for note_tags
-- ----------------------------
DROP TABLE IF EXISTS `note_tags`;
CREATE TABLE `note_tags`  (
  `note_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`note_id`, `tag_id`) USING BTREE,
  INDEX `tag_id`(`tag_id` ASC) USING BTREE,
  CONSTRAINT `note_tags_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `note_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for notes
-- ----------------------------
DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category_id` int NOT NULL,
  `file_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `create_time` datetime NOT NULL,
  `is_archive` tinyint(1) NOT NULL DEFAULT 0,
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文档的摘要',
  `toc` json NULL COMMENT '文档的目录',
  `reading` int(6) UNSIGNED ZEROFILL NOT NULL DEFAULT 000000,
  `updated_time` datetime NULL DEFAULT NULL,
  `comment_count` int(10) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000,
  PRIMARY KEY (`id`, `file_id`) USING BTREE,
  UNIQUE INDEX `file_id`(`file_id` ASC) USING BTREE,
  INDEX `category_id`(`category_id` ASC) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `article_categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `file_id` FOREIGN KEY (`file_id`) REFERENCES `files_info` (`file_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 151 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 187 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_comments
-- ----------------------------
DROP TABLE IF EXISTS `user_comments`;
CREATE TABLE `user_comments`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_id` int UNSIGNED NOT NULL,
  `liked` enum('false','true') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'false',
  `report` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'false',
  `commented` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id` DESC, `user_id`, `comment_id`) USING BTREE,
  INDEX `user_comment_user_id`(`user_id` ASC) USING BTREE,
  INDEX `user_comment_id`(`comment_id` ASC) USING BTREE,
  CONSTRAINT `user_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `index` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '序号',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '用户ID',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码\r\n',
  `register_datetime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户的注册时间',
  `is_login` tinyint NOT NULL DEFAULT 0 COMMENT '是否登录',
  `is_delete` tinyint NOT NULL DEFAULT 0 COMMENT '是否注销了账号',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知' COMMENT '用户别名',
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户角色\r\n',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户的头像',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户的邮箱',
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户的个性签名',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `index`(`index` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- View structure for category_note_count
-- ----------------------------
DROP VIEW IF EXISTS `category_note_count`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `category_note_count` AS select `ac`.`name` AS `category_name`,count(`n`.`id`) AS `note_count`,sum(`n`.`reading`) AS `reading`,`ac`.`level` AS `level` from (`article_categories` `ac` left join `notes` `n` on((`ac`.`id` = `n`.`category_id`))) group by `ac`.`name` order by `note_count` desc;

-- ----------------------------
-- View structure for notes_statistics
-- ----------------------------
DROP VIEW IF EXISTS `notes_statistics`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `notes_statistics` AS select `notes`.`name` AS `name`,`notes`.`file_id` AS `fileID`,`notes`.`reading` AS `reading` from `notes` where (`notes`.`is_archive` = 1);

-- ----------------------------
-- View structure for tag_note_count
-- ----------------------------
DROP VIEW IF EXISTS `tag_note_count`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tag_note_count` AS select `t`.`name` AS `tag_name`,count(`nt`.`note_id`) AS `note_count` from (`tags` `t` join `note_tags` `nt` on((`t`.`id` = `nt`.`tag_id`))) group by `t`.`name` order by `note_count` desc;

-- ----------------------------
-- Procedure structure for addNoteWithInfo
-- ----------------------------
DROP PROCEDURE IF EXISTS `addNoteWithInfo`;
delimiter ;;
CREATE PROCEDURE `addNoteWithInfo`(IN p_name VARCHAR(255),
    IN p_category_id INT,  -- 分类 ID
    IN p_file_id VARCHAR(255),
    IN p_create_time DATETIME,  -- 创建时间
    IN p_tags TEXT,  -- 逗号分隔的标签字符串
    IN p_isarchive TINYINT(1), -- 是否归档
    IN p_summary VARCHAR(255), -- 摘要信息
    IN p_toc JSON)
BEGIN
    DECLARE note_id INT;

    -- 插入新笔记
    INSERT INTO notes (name, category_id, file_id, create_time,is_archive,summary,toc)
    VALUES (p_name, p_category_id, p_file_id, p_create_time,p_isarchive,p_summary,p_toc);

    -- 获取新插入的笔记 ID
    SET note_id = LAST_INSERT_ID();

    -- 插入新标签并获取标签 ID
    INSERT INTO tags (name)
    SELECT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(t.tags, ',', numbers.n), ',', -1)) AS tag_name
    FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
          UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) numbers
    JOIN (SELECT p_tags AS tags) t
    ON CHAR_LENGTH(t.tags) - CHAR_LENGTH(REPLACE(t.tags, ',', '')) >= numbers.n - 1
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);  -- 避免重复插入标签

    -- 获取插入的标签 ID 并插入到 note_tags 表
    INSERT INTO note_tags (note_id, tag_id)
    SELECT note_id, id FROM tags WHERE name IN (
        SELECT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(t.tags, ',', numbers.n), ',', -1)) AS tag_name
        FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
              UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) numbers
        JOIN (SELECT p_tags AS tags) t
        ON CHAR_LENGTH(t.tags) - CHAR_LENGTH(REPLACE(t.tags, ',', '')) >= numbers.n - 1
    );
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getAllNotesWithByCondition
-- ----------------------------
DROP FUNCTION IF EXISTS `getAllNotesWithByCondition`;
delimiter ;;
CREATE FUNCTION `getAllNotesWithByCondition`(p_field_name VARCHAR(255),   -- 要筛选的字段名
    p_field_value VARCHAR(255))
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;

    -- 根据指定的字段和值，筛选笔记并转换为 JSON 格式
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'note_id', n.id,
                   'note_name', n.name,
                   'note_category', ac.name,  -- 获取分类名称
                   'file_id', n.file_id,
                   'is_archive',n.is_archive,
                   'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                   'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                   'tags', (
                       SELECT JSON_ARRAYAGG(t.name)
                       FROM tags t
                       JOIN note_tags nt ON t.id = nt.tag_id
                       WHERE nt.note_id = n.id
                   )
               )
           ) INTO result
    FROM notes n
    LEFT JOIN article_categories ac ON n.category_id = ac.id
    WHERE 
        (p_field_name = 'note_name' AND n.name = p_field_value) OR
        (p_field_name = 'note_category' AND ac.name = p_field_value) OR
        (p_field_name = 'file_id' AND n.file_id = p_field_value) OR
        (p_field_name = 'is_archive' AND n.is_archive = CAST(p_field_value AS UNSIGNED)) OR
        (p_field_name = 'created_at' AND DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s') = p_field_value) OR
        (p_field_name = 'create_time' AND DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s') = p_field_value)
    ORDER BY n.create_time DESC;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getAllNotesWithTags_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getAllNotesWithTags_JSON`;
delimiter ;;
CREATE FUNCTION `getAllNotesWithTags_JSON`()
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;

    -- 查询所有笔记及其标签信息
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'note_id', n.id,
                   'note_name', n.name,
                   'note_category', ac.name,  -- 获取分类名称
                   'file_id', n.file_id,
                   'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                   'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                   'tags', (
                       SELECT JSON_ARRAYAGG(t.name)
                       FROM tags t
                       JOIN note_tags nt ON t.id = nt.tag_id
                       WHERE nt.note_id = n.id
                   )
               )
           ) INTO result
    FROM notes n
    LEFT JOIN article_categories ac ON n.category_id = ac.id  -- 通过 category_id 关联分类表
    ORDER BY n.create_time DESC;
    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for getNoteCounts_JSON
-- ----------------------------
DROP PROCEDURE IF EXISTS `getNoteCounts_JSON`;
delimiter ;;
CREATE PROCEDURE `getNoteCounts_JSON`()
  READS SQL DATA 
BEGIN
    DECLARE tagCounts JSON;
    DECLARE categoryCounts JSON;
    DECLARE noteCounts JSON;
    DECLARE result JSON;

    -- 获取标签统计结果
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'tag_name', tnc.tag_name,
                   'note_count', tnc.note_count
               )
           ) INTO tagCounts
    FROM tag_note_count tnc;

    -- 获取分类统计结果
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'category_name', cnc.category_name,
                   'note_count', cnc.note_count,
                   'reading',cnc.reading,
                   'level',cnc.`level`
               )
           ) INTO categoryCounts
    FROM category_note_count cnc;
    
    -- 获取文章统计结果
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'name', ns.`name`,
                   'fileID', ns.fileID,
                   'reading', ns.reading
               )
           ) INTO noteCounts
    FROM notes_statistics as ns;

    -- 将结果合并成一个 JSON 返回
    SET result = JSON_OBJECT(
        'tagCounts', tagCounts,
        'categoryCounts', categoryCounts,
        'noteCounts', noteCounts
    );

    SELECT result AS NoteCounts;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTagsByCategory_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTagsByCategory_JSON`;
delimiter ;;
CREATE FUNCTION `getNotesWithTagsByCategory_JSON`(p_category_name VARCHAR(255),  -- 分类名称
    p_page INT,                    -- 页码，从第几页开始
    p_pageSize INT)
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE offset INT;
    DECLARE totalRecords INT;
    DECLARE totalPages INT;

    -- 计算偏移量
    SET offset = (p_page - 1) * p_pageSize;

    -- 计算匹配的总记录数
    SELECT COUNT(*)
    INTO totalRecords
    FROM notes n
    JOIN article_categories c ON n.category_id = c.id
    WHERE n.is_archive = 1
    AND c.name LIKE CONCAT('%', p_category_name, '%');

    -- 计算总页数
    SET totalPages = CEIL(totalRecords / p_pageSize);

    -- 如果总记录数小于偏移量，调整到最后一页
    IF totalRecords < offset THEN
        SET p_page = totalPages;  -- 调整页码到最后一页
        SET offset = (p_page - 1) * p_pageSize;  -- 重新计算偏移量
    END IF;

    -- 查询符合条件的笔记及其标签信息，按分页返回
    SELECT JSON_OBJECT(
               'totalRecords', totalRecords,
               'totalPages', totalPages,
               'currentPage', p_page,
               'pageSize', p_pageSize,
               'data', JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'note_id', n.id,
                       'note_name', n.name,
                       'note_category', c.name,  -- 获取分类名称
                       'file_id', n.file_id,
                       'is_archive', n.is_archive,
                       'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                       'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                       'tags', (
                           SELECT JSON_ARRAYAGG(t2.name)
                           FROM tags t2
                           JOIN note_tags nt2 ON t2.id = nt2.tag_id
                           WHERE nt2.note_id = n.id
                       ),
                       'summary', n.summary,
                       'toc', n.toc
                   )
               )
           ) INTO result
    FROM (
        SELECT *
        FROM notes
        WHERE is_archive = 1
        AND category_id = (
            SELECT id FROM article_categories
            WHERE name LIKE CONCAT('%', p_category_name, '%')
            LIMIT 1
        )
        ORDER BY create_time DESC
        LIMIT p_pageSize OFFSET offset
    ) AS n
    LEFT JOIN article_categories c ON n.category_id = c.id;

    -- 如果没有记录，返回空数组作为数据
    IF result IS NULL OR JSON_LENGTH(result->'$.data') IS NULL THEN
        SET result = JSON_OBJECT(
            'totalRecords', totalRecords,
            'totalPages', totalPages,
            'currentPage', p_page,
            'pageSize', p_pageSize,
            'data', JSON_ARRAY()
        );
    END IF;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTagsByDateRange_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTagsByDateRange_JSON`;
delimiter ;;
CREATE FUNCTION `getNotesWithTagsByDateRange_JSON`(p_start_date DATETIME,  -- 开始时间
    p_end_date DATETIME,    -- 结束时间
    p_page INT,             -- 页码，从第几页开始
    p_pageSize INT)
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE offset INT;
    DECLARE total_records INT;
    DECLARE total_pages INT;

    -- 计算偏移量
    SET offset = (p_page - 1) * p_pageSize;

    -- 计算在指定时间范围内的总记录数
    SELECT COUNT(*)
    INTO total_records
    FROM notes
    WHERE is_archive = 1
      AND create_time BETWEEN p_start_date AND p_end_date;

    -- 计算总页数
    SET total_pages = CEIL(total_records / p_pageSize);

    -- 如果总记录数小于偏移量，调整到最后一页
    IF total_records < offset THEN
        SET p_page = total_pages;  -- 调整页码到最后一页
        SET offset = (p_page - 1) * p_pageSize;  -- 重新计算偏移量
    END IF;

    -- 查询在指定时间范围内的分页笔记数据及其标签信息
    SELECT JSON_OBJECT(
               'current_page', p_page,         -- 当前页码
               'total_pages', total_pages,     -- 总页数
               'total_records', total_records, -- 总记录数
               'notes', JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'note_id', n.id,
                       'note_name', n.name,
                       'note_category', c.name,  -- 获取分类名称
                       'file_id', n.file_id,
                       'is_archive', n.is_archive,
                       'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                       'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                       'tags', (
                           SELECT JSON_ARRAYAGG(t2.name)
                           FROM tags t2
                           JOIN note_tags nt2 ON t2.id = nt2.tag_id
                           WHERE nt2.note_id = n.id
                       ),
                       'summary', n.summary,
                       'toc', n.toc
                   )
               )
           ) INTO result
    FROM (
        SELECT *
        FROM notes
        WHERE is_archive = 1
          AND create_time BETWEEN p_start_date AND p_end_date
        ORDER BY create_time DESC
        LIMIT p_pageSize OFFSET offset
    ) AS n
    LEFT JOIN article_categories c ON n.category_id = c.id;

    -- 如果没有记录，返回空数组
    IF result IS NULL OR JSON_LENGTH(result->'$.notes') IS NULL THEN
        SET result = JSON_OBJECT('current_page', p_page, 'total_pages', total_pages, 'total_records', total_records, 'notes', JSON_ARRAY());
    END IF;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTagsByName_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTagsByName_JSON`;
delimiter ;;
CREATE FUNCTION `getNotesWithTagsByName_JSON`(p_note_name VARCHAR(255),  -- 笔记名称
    p_page INT,                -- 页码，从第几页开始
    p_pageSize INT)
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE offset INT;
    DECLARE total_records INT;
    DECLARE total_pages INT;

    -- 计算偏移量
    SET offset = (p_page - 1) * p_pageSize;

    -- 计算匹配的总记录数
    SELECT COUNT(*)
    INTO total_records
    FROM notes
    WHERE name LIKE CONCAT('%', p_note_name, '%')
      AND is_archive = 1;

    -- 计算总页数
    SET total_pages = CEIL(total_records / p_pageSize);

    -- 如果总记录数小于偏移量，调整到最后一页
    IF total_records < offset THEN
        SET p_page = total_pages;  -- 调整页码到最后一页
        SET offset = (p_page - 1) * p_pageSize;  -- 重新计算偏移量
    END IF;

    -- 查询匹配的笔记及其标签信息，按分页返回
    SELECT JSON_OBJECT(
               'totalRecords', total_records,
               'totalPages', total_pages,
               'currentPage', p_page,
               'pageSize', p_pageSize,
               'notes', JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'note_id', n.id,
                       'note_name', n.name,
                       'note_category', c.name,  -- 获取分类名称
                       'file_id', n.file_id,
                       'is_archive', n.is_archive,
                       'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                       'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                       'tags', (
                           SELECT JSON_ARRAYAGG(t2.name)
                           FROM tags t2
                           JOIN note_tags nt2 ON t2.id = nt2.tag_id
                           WHERE nt2.note_id = n.id
                       ),
                       'summary', n.summary,
                       'toc', n.toc
                   )
               )
           ) INTO result
    FROM (
        SELECT *
        FROM notes
        WHERE name LIKE CONCAT('%', p_note_name, '%')
          AND is_archive = 1
        ORDER BY create_time DESC
        LIMIT p_pageSize OFFSET offset
    ) AS n
    LEFT JOIN article_categories c ON n.category_id = c.id;

    -- 如果没有记录，返回空数组作为数据
    IF result IS NULL OR JSON_LENGTH(result->'$.notes') IS NULL THEN
        SET result = JSON_OBJECT(
            'totalRecords', total_records,
            'totalPages', total_pages,
            'currentPage', p_page,
            'pageSize', p_pageSize,
            'notes', JSON_ARRAY()
        );
    END IF;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTagsByTag_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTagsByTag_JSON`;
delimiter ;;
CREATE FUNCTION `getNotesWithTagsByTag_JSON`(p_tagName VARCHAR(255),  -- 标签名称
    p_page INT,              -- 页码，从第几页开始
    p_pageSize INT)
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE offset INT;
    DECLARE totalRecords INT;
    DECLARE totalPages INT;

    -- 计算偏移量
    SET offset = (p_page - 1) * p_pageSize;

    -- 计算符合条件的总记录数
    SELECT COUNT(*)
    INTO totalRecords
    FROM notes n
    JOIN note_tags nt ON n.id = nt.note_id
    JOIN tags t ON nt.tag_id = t.id
    WHERE t.name = p_tagName
      AND n.is_archive = 1;

    -- 计算总页数
    SET totalPages = CEIL(totalRecords / p_pageSize);

    -- 如果总记录数小于偏移量，调整页码到最后一页
    IF totalRecords < offset THEN
        SET p_page = totalPages;
        SET offset = (p_page - 1) * p_pageSize;
    END IF;

    -- 查询符合条件的笔记及其标签信息
    SELECT JSON_OBJECT(
               'totalRecords', totalRecords,
               'totalPages', totalPages,
               'currentPage', p_page,
               'pageSize', p_pageSize,
               'data', JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'note_id', n.id,
                       'note_name', n.name,
                       'note_category', c.name,  -- 获取分类名称
                       'file_id', n.file_id,
                       'is_archive', n.is_archive,
                       'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                       'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                       'summary', n.summary,     -- 包括 summary 字段
                       'toc', n.toc,            -- 包括 toc 字段
                       'tags', (
                           SELECT JSON_ARRAYAGG(t2.name)
                           FROM tags t2
                           JOIN note_tags nt2 ON t2.id = nt2.tag_id
                           WHERE nt2.note_id = n.id
                       )
                   )
               )
           ) INTO result
    FROM (
        SELECT n.*
        FROM notes n
        JOIN note_tags nt ON n.id = nt.note_id
        JOIN tags t ON nt.tag_id = t.id
        WHERE t.name = p_tagName
          AND n.is_archive = 1
        ORDER BY n.create_time DESC
        LIMIT p_pageSize OFFSET offset
    ) AS n
    LEFT JOIN article_categories c ON n.category_id = c.id;

    -- 如果查询结果为空，返回空数组
    IF result IS NULL OR JSON_LENGTH(result->'$.data') IS NULL THEN
        SET result = JSON_OBJECT(
            'totalRecords', totalRecords,
            'totalPages', totalPages,
            'currentPage', p_page,
            'pageSize', p_pageSize,
            'data', JSON_ARRAY()
        );
    END IF;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTags_JSON
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTags_JSON`;
delimiter ;;
CREATE FUNCTION `getNotesWithTags_JSON`(tagName VARCHAR(255))
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;

    -- 将符合条件的已归档笔记及其标签信息转换为 JSON 格式
    SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'note_id', n.id,
                   'note_name', n.name,
                   'note_category', c.name,  -- 获取分类名称
                   'file_id', n.file_id,
                   'is_archive', n.is_archive,
                   'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                   'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                   'tags', (
                       SELECT JSON_ARRAYAGG(t2.name)
                       FROM tags t2
                       JOIN note_tags nt2 ON t2.id = nt2.tag_id
                       WHERE nt2.note_id = n.id
                   )
               )
           ) INTO result
    FROM notes n
    JOIN note_tags nt ON n.id = nt.note_id
    JOIN tags t ON nt.tag_id = t.id
    JOIN article_categories c ON n.category_id = c.id  -- 连接分类表
    WHERE t.name = tagName
      AND n.is_archive = 1;  -- 仅查询已归档内容

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for getNotesWithTags_JSONByPageLimit
-- ----------------------------
DROP FUNCTION IF EXISTS `getNotesWithTags_JSONByPageLimit`;
delimiter ;;
CREATE FUNCTION `getNotesWithTags_JSONByPageLimit`(p_limit INT,       -- 每页显示的记录数
    p_page INT)
 RETURNS json
  READS SQL DATA 
  DETERMINISTIC
BEGIN
    DECLARE result JSON;
    DECLARE offset INT;
    DECLARE total_records INT;
    DECLARE total_pages INT;

    -- 计算偏移量
    SET offset = (p_page - 1) * p_limit;

    -- 计算总记录数
    SELECT COUNT(*) INTO total_records
    FROM notes
    WHERE is_archive = 1;

    -- 计算总页数
    SET total_pages = CEIL(total_records / p_limit);

    -- 如果总记录数小于偏移量，则返回可用记录数
    IF total_records < offset THEN
        SET p_page = total_pages;  -- 调整到最后一页
        SET offset = (p_page - 1) * p_limit;  -- 重新计算偏移量
    END IF;

    -- 查询按创建时间倒序排列的已归档笔记及其标签信息
    SELECT JSON_OBJECT(
               'current_page', p_page,        -- 当前页码
               'total_pages', total_pages,    -- 最大页码
               'total_records', total_records,  -- 总记录数
               'notes', JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'note_id', n.id,
                       'note_name', n.name,
                       'note_category', c.name,  -- 获取分类名称
                       'file_id', n.file_id,
                       'is_archive', n.is_archive,
                       'created_at', DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s'),
                       'create_time', DATE_FORMAT(n.create_time, '%Y-%m-%d %H:%i:%s'),
                       'tags', (
                           SELECT JSON_ARRAYAGG(t2.name)
                           FROM tags t2
                           JOIN note_tags nt2 ON t2.id = nt2.tag_id
                           WHERE nt2.note_id = n.id
                       ),
                       'summary', n.summary,
                        'toc', n.toc
                   )
               )
           ) INTO result
    FROM (
        SELECT *
        FROM notes
        WHERE is_archive = 1  -- 仅查询已归档内容
        ORDER BY create_time DESC  -- 按创建时间倒序排列
        LIMIT p_limit OFFSET offset
    ) AS n
    LEFT JOIN article_categories c ON n.category_id = c.id;  -- 连接分类表

    -- 如果没有记录，返回空数组
    IF result IS NULL OR JSON_LENGTH(result->'$.notes') IS NULL THEN
        SET result = JSON_OBJECT('current_page', p_page, 'total_pages', total_pages, 'total_records', total_records, 'notes', JSON_ARRAY());
    END IF;

    RETURN result;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table Roles
-- ----------------------------
DROP TRIGGER IF EXISTS `before_insert_roles`;
delimiter ;;
CREATE TRIGGER `before_insert_roles` BEFORE INSERT ON `Roles` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table Roles
-- ----------------------------
DROP TRIGGER IF EXISTS `before_update_roles`;
delimiter ;;
CREATE TRIGGER `before_update_roles` BEFORE UPDATE ON `Roles` FOR EACH ROW SET NEW.updated_at = NOW()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `update_comment_datetime`;
delimiter ;;
CREATE TRIGGER `update_comment_datetime` BEFORE UPDATE ON `comments` FOR EACH ROW IF OLD.content <> NEW.content THEN
    SET NEW.updated_at = NOW();
ELSE
    -- 如果仅更新其他字段（如状态），不更新 updated_at
    SET NEW.updated_at = OLD.updated_at;  -- 保持原来的时间戳
END IF
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `create_comment_datetime`;
delimiter ;;
CREATE TRIGGER `create_comment_datetime` BEFORE INSERT ON `comments` FOR EACH ROW SET NEW.created_at = NOW(),NEW.updated_at = NOW()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `update_comment_count_on_delete`;
delimiter ;;
CREATE TRIGGER `update_comment_count_on_delete` AFTER DELETE ON `comments` FOR EACH ROW BEGIN
    -- 删除评论时，减少 notes 表中的 comment_count
    UPDATE notes
    SET comment_count = CASE
        WHEN comment_count > 0 THEN comment_count - 1
        ELSE 0
    END
    WHERE id = OLD.article_id;  -- 使用 OLD.article_id 确保删除的是原来关联的 article
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `update_comment_count`;
delimiter ;;
CREATE TRIGGER `update_comment_count` AFTER UPDATE ON `comments` FOR EACH ROW BEGIN
    -- 当 status 从非 approved 变为 approved
    IF OLD.status != 'approved' AND NEW.status = 'approved' THEN
        -- 增加 notes 表中的 comment_count
        UPDATE notes
        SET comment_count = comment_count + 1
        WHERE id = NEW.article_id;  -- 假设 comments 表中的 article_id 关联到 notes 表的 id
    -- 当 status 从 approved 变为其他状态
    ELSEIF OLD.status = 'approved' AND NEW.status != 'approved' THEN
        -- 减少 notes 表中的 comment_count，但不能减少到负数
        UPDATE notes
        SET comment_count = CASE
            WHEN comment_count > 0 THEN comment_count - 1
            ELSE 0
        END
        WHERE id = OLD.article_id;  -- 使用 OLD.article_id 确保删除的是原来关联的 article
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table notes
-- ----------------------------
DROP TRIGGER IF EXISTS `before_insert_note`;
delimiter ;;
CREATE TRIGGER `before_insert_note` BEFORE INSERT ON `notes` FOR EACH ROW SET NEW.updated_time = NOW()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table notes
-- ----------------------------
DROP TRIGGER IF EXISTS `before_update_note`;
delimiter ;;
CREATE TRIGGER `before_update_note` BEFORE UPDATE ON `notes` FOR EACH ROW IF OLD.file_id<>NEW.file_id THEN
  SET NEW.updated_time = NOW();
END IF
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user_info
-- ----------------------------
DROP TRIGGER IF EXISTS `assignuserrole`;
delimiter ;;
CREATE TRIGGER `assignuserrole` AFTER INSERT ON `user_info` FOR EACH ROW BEGIN
INSERT INTO UserRoles (user_id, role_id) VALUES (NEW.user_id, 39);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;


-- ----------------------------
-- Records of Roles
-- ----------------------------
INSERT INTO `Roles` VALUES (38, '管理员', '系统顶级管理员', '2024-11-25 21:22:47', '2024-11-25 21:22:47');
INSERT INTO `Roles` VALUES (39, '普通用户', '普通的用户，只有查看权限，没有操作系统的权限', '2024-11-25 21:23:22', '2024-11-25 21:23:22');
INSERT INTO `Roles` VALUES (40, 'Vip', '普通Vip角色', '2024-12-03 01:23:03', '2024-12-03 01:23:03');
INSERT INTO `Roles` VALUES (42, '黑名单用户', '黑名单用户限制其权限，不能访问文章管理、不能发表评论', '2024-12-07 06:24:55', '2024-12-07 06:24:55');

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, '32e2ae4c-6176-5d87-8356-f1b711867097', '13700000000', '$2b$10$rQo5USKJa6wgC9uh2C/ymes4NvuxY4O4nMCc/mu4Hy/PUV2nzXtE6', '2024-12-17 02:12:30', 0, 0, '护城河', NULL, 'https://huchenghe.site/blog/static/images/有何不可.jpg', '2927678784@qq.com', '我的青春');

-- ----------------------------

-- ----------------------------
-- Records of Permissions
-- ----------------------------
INSERT INTO `Permissions` VALUES (3, 'center', '进入个人中心的权限', 'route', NULL, 0, NULL);
INSERT INTO `Permissions` VALUES (47, 'permission', '进入个人权限管理的路由权限', 'route', NULL, 1, '/permission/getpermissions');
INSERT INTO `Permissions` VALUES (48, 'permission.update', '能够修改权限信息的权限', 'button', 47, 1, NULL);
INSERT INTO `Permissions` VALUES (49, 'role', '角色管理权限', 'route', NULL, 1, '/role');
INSERT INTO `Permissions` VALUES (50, 'role.add', '添加角色的按钮', 'button', 49, 1, '/role/add');
INSERT INTO `Permissions` VALUES (51, 'role.update', '更新角色的按钮权限', 'button', 49, 1, '/role/update/:id');
INSERT INTO `Permissions` VALUES (52, 'role.search', '搜索角色的权限', 'button', 49, 1, '/role/get/:roleName');
INSERT INTO `Permissions` VALUES (53, 'permission.add', '添加权限的权限', 'button', 47, 1, '/permission/addpermission');
INSERT INTO `Permissions` VALUES (54, 'permission.edit', '编辑修改权限的权限', 'button', 47, 1, '/permission/update/:id');
INSERT INTO `Permissions` VALUES (55, 'permission.delete', '能够删除权限的权限', 'button', 47, 1, '/permission/delete/:id');
INSERT INTO `Permissions` VALUES (56, 'role.delete', '删除角色的权限', 'button', 49, 1, '/role/delete/:id');
INSERT INTO `Permissions` VALUES (57, 'role.edit', '修改角色的权限', 'button', 49, 1, '/role/update/:id');
INSERT INTO `Permissions` VALUES (58, 'user', '管理用户的路由', 'route', NULL, 1, NULL);
INSERT INTO `Permissions` VALUES (59, 'user.search', '搜索用户按钮', 'button', 58, 1, '/user/userrole/:userId');
INSERT INTO `Permissions` VALUES (60, 'user.edit', '修改用户的按钮', 'button', 58, 1, '/user/update/userinfo');
INSERT INTO `Permissions` VALUES (61, 'user.add', '添加用户的按钮', 'button', 58, 1, '/user/admin/add');
INSERT INTO `Permissions` VALUES (62, 'user.reset', '重置用户密码的权限', 'button', 58, 1, '/user/admin/reset/:userId');
INSERT INTO `Permissions` VALUES (63, 'user.delete', '删除用户的权限', 'button', 58, 1, '/user/admin/delete/:userId');
INSERT INTO `Permissions` VALUES (64, 'role.assignpermission', '分配角色权限的按钮', 'button', 49, 1, '/role/managePermissions');
INSERT INTO `Permissions` VALUES (65, 'user.assignrole', '分配用户角色的权限', 'button', 58, 1, '/user/admin/manageRoles');
INSERT INTO `Permissions` VALUES (66, 'article', '文章管理的路由', 'route', NULL, 1, '');
INSERT INTO `Permissions` VALUES (67, 'article.add', '添加文章的权限', 'button', 66, 1, '/note/add');
INSERT INTO `Permissions` VALUES (68, 'article/edit', '编辑文章的权限', 'route', 66, 1, '/note/update');
INSERT INTO `Permissions` VALUES (69, 'article.delete', '删除文章的权限', 'button', 66, 1, '/note/delete');
INSERT INTO `Permissions` VALUES (70, 'article.assignarchive', '上架和下架文章的权限', 'button', 66, 1, '/note/archive');
INSERT INTO `Permissions` VALUES (72, 'article.download', '下载文章的权限', 'button', 66, 1, NULL);
INSERT INTO `Permissions` VALUES (73, 'article.upload', '上传文章的权限', 'button', 66, 1, '/note/addarticle');
INSERT INTO `Permissions` VALUES (74, 'category', '分类的路由', 'route', NULL, 1, NULL);
INSERT INTO `Permissions` VALUES (75, 'category.add', '添加分类的权限', 'button', 74, 1, '/category/addcategory');
INSERT INTO `Permissions` VALUES (76, 'category.edit', '编辑分类的权限', 'button', 74, 1, '/category/updatecategory/:id');
INSERT INTO `Permissions` VALUES (77, 'category.delete', '删除分类的权限', 'button', 74, 1, '/category/removecategory');
INSERT INTO `Permissions` VALUES (78, 'category.query', '查询分类的权限', 'button', 74, 1, NULL);
INSERT INTO `Permissions` VALUES (79, 'article/notes', '管理文章的路由', 'route', 66, 1, '/note/info');
INSERT INTO `Permissions` VALUES (80, 'center.uploadimage', '上传图片的权限', 'button', 3, 1, NULL);
INSERT INTO `Permissions` VALUES (81, 'article.edit', '编辑文章的权限按钮', 'button', 66, 1, '/note/content');
INSERT INTO `Permissions` VALUES (82, 'center.uploadFile', '上传文件的权限', 'button', 3, 1, NULL);
INSERT INTO `Permissions` VALUES (84, 'comment', '评论的权限路由', 'route', NULL, 1, '/comment/user');
INSERT INTO `Permissions` VALUES (85, 'comment/my', '我的评论的路由权限', 'route', 84, 1, '/comment/user');
INSERT INTO `Permissions` VALUES (86, 'comment/manage', '管理评论的路由权限', 'route', 84, 1, '/comment/admin');
INSERT INTO `Permissions` VALUES (87, 'comment.delete', '管理员删除评论的权限', 'button', 86, 1, '/comment/admin/delete');
INSERT INTO `Permissions` VALUES (88, 'comment.review', '管理员审核通过评论的权限', 'button', 86, 1, '/comment/admin/batch/review');
INSERT INTO `Permissions` VALUES (90, 'comment.add', '添加评论的权限', 'button', 84, 1, '/comment/add');
INSERT INTO `Permissions` VALUES (92, 'comment.admin.noreview', '获取没有审核信息的权限', 'button', 86, 1, '/comment/admin/noreview');
INSERT INTO `Permissions` VALUES (93, 'comment.user.remove', '用户删除评论的权限', 'button', 85, 1, '/comment/remove');
INSERT INTO `Permissions` VALUES (95, 'role.batch.delete', '批量删除角色的权限', 'button', 49, 1, '/role/batch');
INSERT INTO `Permissions` VALUES (96, 'role.permission.get', '根据角色ID获取该角色的所有权限', 'button', 49, 1, '/role/permissions/:roleId');
INSERT INTO `Permissions` VALUES (97, 'user.get.users', '获取多个用户的信息', 'button', 58, 1, '/user/admin/users');
INSERT INTO `Permissions` VALUES (98, 'user.get.userrole.', '获取用户信息的权限', 'button', NULL, 1, '/user/userrole/:userId');
INSERT INTO `Permissions` VALUES (99, 'user.search.username', '根据用户名查找用户', 'button', 58, 1, '/user/admin/getuser');
INSERT INTO `Permissions` VALUES (100, 'user.get.userinfo', '获取用户的信息', 'button', 58, 1, '/user/userinfo');
INSERT INTO `Permissions` VALUES (101, 'comment.user.like', '点赞的权限', 'button', 85, 1, '/comment/togglelike');
INSERT INTO `Permissions` VALUES (102, 'comment.user.edit', '用户编辑自己评论的权限', 'button', 85, 1, '/comment/edit');
INSERT INTO `Permissions` VALUES (103, 'center.chat', 'socker的权限', 'button', 3, 1, '/socket.io');


-- ----------------------------
-- Records of RolePermissions
-- ----------------------------
INSERT INTO `RolePermissions` VALUES (38, 3);
INSERT INTO `RolePermissions` VALUES (39, 3);
INSERT INTO `RolePermissions` VALUES (40, 3);
INSERT INTO `RolePermissions` VALUES (38, 47);
INSERT INTO `RolePermissions` VALUES (38, 48);
INSERT INTO `RolePermissions` VALUES (38, 49);
INSERT INTO `RolePermissions` VALUES (38, 50);
INSERT INTO `RolePermissions` VALUES (38, 51);
INSERT INTO `RolePermissions` VALUES (38, 52);
INSERT INTO `RolePermissions` VALUES (38, 53);
INSERT INTO `RolePermissions` VALUES (38, 54);
INSERT INTO `RolePermissions` VALUES (38, 55);
INSERT INTO `RolePermissions` VALUES (38, 56);
INSERT INTO `RolePermissions` VALUES (38, 57);
INSERT INTO `RolePermissions` VALUES (38, 58);
INSERT INTO `RolePermissions` VALUES (38, 59);
INSERT INTO `RolePermissions` VALUES (38, 60);
INSERT INTO `RolePermissions` VALUES (39, 60);
INSERT INTO `RolePermissions` VALUES (38, 61);
INSERT INTO `RolePermissions` VALUES (38, 62);
INSERT INTO `RolePermissions` VALUES (38, 63);
INSERT INTO `RolePermissions` VALUES (38, 64);
INSERT INTO `RolePermissions` VALUES (38, 65);
INSERT INTO `RolePermissions` VALUES (38, 66);
INSERT INTO `RolePermissions` VALUES (39, 66);
INSERT INTO `RolePermissions` VALUES (40, 66);
INSERT INTO `RolePermissions` VALUES (38, 67);
INSERT INTO `RolePermissions` VALUES (40, 67);
INSERT INTO `RolePermissions` VALUES (38, 68);
INSERT INTO `RolePermissions` VALUES (39, 68);
INSERT INTO `RolePermissions` VALUES (40, 68);
INSERT INTO `RolePermissions` VALUES (38, 69);
INSERT INTO `RolePermissions` VALUES (40, 69);
INSERT INTO `RolePermissions` VALUES (38, 70);
INSERT INTO `RolePermissions` VALUES (40, 70);
INSERT INTO `RolePermissions` VALUES (38, 72);
INSERT INTO `RolePermissions` VALUES (40, 72);
INSERT INTO `RolePermissions` VALUES (38, 73);
INSERT INTO `RolePermissions` VALUES (40, 73);
INSERT INTO `RolePermissions` VALUES (38, 74);
INSERT INTO `RolePermissions` VALUES (38, 75);
INSERT INTO `RolePermissions` VALUES (38, 76);
INSERT INTO `RolePermissions` VALUES (38, 77);
INSERT INTO `RolePermissions` VALUES (38, 78);
INSERT INTO `RolePermissions` VALUES (38, 79);
INSERT INTO `RolePermissions` VALUES (39, 79);
INSERT INTO `RolePermissions` VALUES (40, 79);
INSERT INTO `RolePermissions` VALUES (38, 80);
INSERT INTO `RolePermissions` VALUES (40, 80);
INSERT INTO `RolePermissions` VALUES (38, 81);
INSERT INTO `RolePermissions` VALUES (40, 81);
INSERT INTO `RolePermissions` VALUES (38, 82);
INSERT INTO `RolePermissions` VALUES (40, 82);
INSERT INTO `RolePermissions` VALUES (38, 84);
INSERT INTO `RolePermissions` VALUES (39, 84);
INSERT INTO `RolePermissions` VALUES (40, 84);
INSERT INTO `RolePermissions` VALUES (38, 85);
INSERT INTO `RolePermissions` VALUES (39, 85);
INSERT INTO `RolePermissions` VALUES (40, 85);
INSERT INTO `RolePermissions` VALUES (38, 86);
INSERT INTO `RolePermissions` VALUES (38, 87);
INSERT INTO `RolePermissions` VALUES (38, 88);
INSERT INTO `RolePermissions` VALUES (38, 90);
INSERT INTO `RolePermissions` VALUES (39, 90);
INSERT INTO `RolePermissions` VALUES (38, 92);
INSERT INTO `RolePermissions` VALUES (38, 93);
INSERT INTO `RolePermissions` VALUES (39, 93);
INSERT INTO `RolePermissions` VALUES (38, 95);
INSERT INTO `RolePermissions` VALUES (38, 96);
INSERT INTO `RolePermissions` VALUES (38, 97);
INSERT INTO `RolePermissions` VALUES (38, 98);
INSERT INTO `RolePermissions` VALUES (38, 99);
INSERT INTO `RolePermissions` VALUES (38, 100);
INSERT INTO `RolePermissions` VALUES (39, 100);
INSERT INTO `RolePermissions` VALUES (40, 100);
INSERT INTO `RolePermissions` VALUES (42, 100);
INSERT INTO `RolePermissions` VALUES (38, 101);
INSERT INTO `RolePermissions` VALUES (39, 101);
INSERT INTO `RolePermissions` VALUES (38, 102);
INSERT INTO `RolePermissions` VALUES (39, 102);
INSERT INTO `RolePermissions` VALUES (38, 103);
INSERT INTO `RolePermissions` VALUES (39, 103);




INSERT INTO `UserRoles` (user_id, role_id) 
VALUES ('32e2ae4c-6176-5d87-8356-f1b711867097', 38)
ON DUPLICATE KEY UPDATE role_id = VALUES(role_id);

INSERT INTO `UserRoles` (user_id, role_id) 
VALUES ('32e2ae4c-6176-5d87-8356-f1b711867097', 39)
ON DUPLICATE KEY UPDATE role_id = VALUES(role_id);

