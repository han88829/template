/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : template

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 23/11/2022 15:39:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(100) DEFAULT NULL COMMENT '部门名称',
  `userId` int DEFAULT NULL COMMENT '操作用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
INSERT INTO `department` (`id`, `createTime`, `updateTime`, `name`, `userId`) VALUES (69, '2022-04-01 13:58:39.958616', '2022-04-01 13:58:39.958616', '管理员', 65);
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(200) NOT NULL COMMENT '节点名称',
  `userId` int NOT NULL COMMENT '操作用户id',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 目录 2菜单 3权限',
  `pid` int DEFAULT '0' COMMENT '父级节点',
  `icon` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL COMMENT '路由',
  `showMenu` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 显示 2隐藏',
  `isDel` tinyint(1) DEFAULT '0' COMMENT '1删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (1, '2022-05-07 14:25:51.985189', '2022-05-07 16:48:19.884481', '权限管理', 65, 0, 1, 0, 'SettingOutlined', NULL, 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (2, '2022-05-07 14:29:26.969657', '2022-05-07 18:04:35.283968', '角色管理', 1, 0, 2, 1, NULL, '/auth/role', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (12, '2022-05-07 15:33:08.933020', '2022-05-07 18:04:38.628340', '用户管理', 65, 1, 2, 1, '', '/auth/user', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (17, '2022-05-07 15:47:09.922630', '2022-05-07 18:04:50.944944', '部门管理', 65, 1, 2, 1, '', '/auth/department', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (18, '2022-05-07 15:47:32.797633', '2022-05-07 18:03:19.669669', '菜单管理', 65, 1, 2, 1, '', '/auth/menu', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (19, '2022-05-08 14:38:49.717964', '2022-05-08 14:38:49.717964', '角色列表', 65, 1, 3, 2, '', '/api/auth/roleLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (20, '2022-05-08 14:39:03.286017', '2022-05-08 14:39:03.286017', '角色删除', 65, 1, 3, 2, '', '/api/auth/roleDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (21, '2022-05-08 14:39:16.759408', '2022-05-08 14:39:16.759408', '角色保存', 65, 1, 3, 2, '', '/api/auth/roleSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (22, '2022-05-09 14:12:44.437372', '2022-05-09 14:19:42.959655', '权限数据', 65, 1, 3, 0, '', '/api/auth/menuLst', 1, 1);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (23, '2022-05-09 14:13:24.025708', '2022-05-09 14:13:24.025708', '列表', 65, 1, 3, 12, '', '/api/user/list', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (24, '2022-05-09 14:13:38.530381', '2022-05-09 14:13:38.530381', '保存', 65, 1, 3, 12, '', '/api/user/userSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (25, '2022-05-09 14:13:50.536917', '2022-05-09 14:13:50.536917', '停用', 65, 1, 3, 12, '', '/api/user/disableUser', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (26, '2022-05-09 14:14:02.881651', '2022-05-09 14:14:02.881651', '列表', 65, 1, 3, 17, '', '/api/auth/deptLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (27, '2022-05-09 14:14:16.112230', '2022-05-09 14:14:16.112230', '保存', 65, 1, 3, 17, '', '/api/auth/deptSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (28, '2022-05-09 14:14:28.171511', '2022-05-09 14:14:28.171511', '删除', 65, 1, 3, 17, '', '/api/auth/deptDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (29, '2022-05-09 14:15:07.536124', '2022-05-09 14:15:07.536124', '列表', 65, 1, 3, 18, '', '/api/auth/menuLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (30, '2022-05-09 14:15:25.080299', '2022-05-09 14:15:25.080299', '保存', 65, 1, 3, 18, '', '/api/auth/menuSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (31, '2022-05-09 14:15:44.740366', '2022-05-09 14:15:44.740366', '删除', 65, 1, 3, 18, '', '/api/auth/menuDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (32, '2022-11-23 15:35:10.512560', '2022-11-23 15:35:10.512560', '模版', 65, 1, 2, 0, 'AppstoreAddOutlined', '/template', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` char(11) NOT NULL DEFAULT '' COMMENT '角色名称',
  `menuid` varchar(300) DEFAULT NULL COMMENT '角色能看到的菜单',
  `keys` text,
  `userId` int DEFAULT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deptIds` text COMMENT '部门权限',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `name`, `menuid`, `keys`, `userId`, `createTime`, `updateTime`, `deptIds`) VALUES (9, '管理员', NULL, '1,2,12,19,21,23,24,17,26,27,18,29,30', 65, '2022-05-07 15:55:39.337457', '2022-05-08 14:11:34.949683', '');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(100) DEFAULT NULL COMMENT '姓名',
  `account` varchar(50) DEFAULT '' COMMENT '账号',
  `password` varchar(255) DEFAULT '' COMMENT '密码',
  `disable` tinyint(1) DEFAULT '0' COMMENT '1停用',
  `ava` varchar(255) DEFAULT NULL COMMENT '头像',
  `roleId` int DEFAULT '3' COMMENT '角色id',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号',
  `deptId` int DEFAULT NULL COMMENT '所属部门',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `account` (`account`) USING BTREE,
  KEY `roleId` (`roleId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `createTime`, `updateTime`, `name`, `account`, `password`, `disable`, `ava`, `roleId`, `mobile`, `deptId`) VALUES (65, '2022-04-01 13:33:43.226042', '2022-04-02 14:55:09.460239', '管理员', 'admin', 'PrX/dJ7e/xGtuq6KLd2uug==', 0, NULL, 8, NULL, 69);
INSERT INTO `user` (`id`, `createTime`, `updateTime`, `name`, `account`, `password`, `disable`, `ava`, `roleId`, `mobile`, `deptId`) VALUES (66, '2022-05-08 13:58:40.626530', '2022-05-09 15:06:42.193435', '测试', 'test', 'HPQo2mPWjHrMR+YbQaNYOA==', 0, NULL, 9, '', 69);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
