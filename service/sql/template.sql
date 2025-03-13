/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 90200 (9.2.0)
 Source Host           : localhost:3306
 Source Schema         : template

 Target Server Type    : MySQL
 Target Server Version : 90200 (9.2.0)
 File Encoding         : 65001

 Date: 13/03/2025 13:46:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(100) DEFAULT NULL COMMENT '部门名称',
  `userId` int DEFAULT NULL COMMENT '操作用户id',
  `isDel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
INSERT INTO `department` (`id`, `createTime`, `updateTime`, `name`, `userId`, `isDel`) VALUES (2, '2025-03-13 13:29:47', '2025-03-13 13:43:36', '管理员', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int NOT NULL COMMENT '操作用户id',
  `content` varchar(255) NOT NULL COMMENT '操作内容',
  `type` tinyint NOT NULL DEFAULT '1' COMMENT '1登录\n2系统管理\n3岗位管理\n4休假抽查\n5车辆管控配置\n6饮酒管控配置',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (1, '2022-05-07 14:25:52', '2022-05-07 16:48:20', '系统管理', 65, 0, 1, 0, 'SettingOutlined', '/auth', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (2, '2022-05-07 14:29:27', '2022-05-07 18:04:35', '角色管理', 1, 0, 2, 1, NULL, '/auth/role', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (12, '2022-05-07 15:33:09', '2022-05-07 18:04:39', '账户管理', 65, 1, 2, 1, '', '/auth/user', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (17, '2022-05-07 15:47:10', '2022-05-07 18:04:51', '部门管理', 65, 1, 2, 1, '', '/auth/department', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (18, '2022-05-07 15:47:33', '2022-05-07 18:03:20', '菜单管理', 65, 1, 2, 1, '', '/auth/menu', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (19, '2022-05-08 14:38:50', '2022-05-08 14:38:50', '角色列表', 65, 1, 3, 2, '', '/api/auth/roleLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (20, '2022-05-08 14:39:03', '2022-05-08 14:39:03', '角色删除', 65, 1, 3, 2, '', '/api/auth/roleDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (21, '2022-05-08 14:39:17', '2022-05-08 14:39:17', '角色保存', 65, 1, 3, 2, '', '/api/auth/roleSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (22, '2022-05-09 14:12:44', '2022-05-09 14:19:43', '权限数据', 65, 1, 3, 0, '', '/api/auth/menuLst', 1, 1);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (23, '2022-05-09 14:13:24', '2022-05-09 14:13:24', '列表', 65, 1, 3, 12, '', '/api/user/list', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (24, '2022-05-09 14:13:39', '2022-05-09 14:13:39', '保存', 65, 1, 3, 12, '', '/api/user/userSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (25, '2022-05-09 14:13:51', '2022-05-09 14:13:51', '停用', 65, 1, 3, 12, '', '/api/user/disableUser', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (26, '2022-05-09 14:14:03', '2022-05-09 14:14:03', '列表', 65, 1, 3, 17, '', '/api/auth/deptLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (27, '2022-05-09 14:14:16', '2022-05-09 14:14:16', '保存', 65, 1, 3, 17, '', '/api/auth/deptSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (28, '2022-05-09 14:14:28', '2022-05-09 14:14:28', '删除', 65, 1, 3, 17, '', '/api/auth/deptDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (29, '2022-05-09 14:15:08', '2022-05-09 14:15:08', '列表', 65, 1, 3, 18, '', '/api/auth/menuLst', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (30, '2022-05-09 14:15:25', '2022-05-09 14:15:25', '保存', 65, 1, 3, 18, '', '/api/auth/menuSave', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (31, '2022-05-09 14:15:45', '2022-05-09 14:15:45', '删除', 65, 1, 3, 18, '', '/api/auth/menuDel', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (32, '2022-11-23 15:35:11', '2022-11-23 15:35:11', '模版', 65, 1, 2, 0, 'AppstoreAddOutlined', '/template', 1, 0);
INSERT INTO `menu` (`id`, `createTime`, `updateTime`, `name`, `userId`, `sort`, `type`, `pid`, `icon`, `path`, `showMenu`, `isDel`) VALUES (34, '2023-07-27 15:21:39', '2023-07-27 15:21:39', '日志管理', 65, 1, 2, 1, '', '/auth/log', 1, 0);
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
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deptIds` text COMMENT '部门权限',
  `describe` varchar(255) DEFAULT NULL COMMENT '描述',
  `isDel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `name`, `menuid`, `keys`, `userId`, `createTime`, `updateTime`, `deptIds`, `describe`, `isDel`) VALUES (1, '管理员', NULL, '1,2,12,19,21,23,24,17,26,27,18,29,30,20,25,28,31,34,32', 1, '2022-05-07 15:55:39', '2023-07-28 16:18:13', '2', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(100) DEFAULT NULL COMMENT '姓名',
  `account` varchar(50) DEFAULT '' COMMENT '账号',
  `password` varchar(255) DEFAULT '' COMMENT '密码',
  `ava` varchar(255) DEFAULT NULL COMMENT '头像',
  `roleId` int DEFAULT '3' COMMENT '角色id',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `deptId` int DEFAULT NULL COMMENT '所属部门',
  `isDel` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1删除',
  `uid` char(36) NOT NULL,
  `delTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`,`delTime`) USING BTREE,
  KEY `roleId` (`roleId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `createTime`, `updateTime`, `name`, `account`, `password`, `ava`, `roleId`, `mobile`, `deptId`, `isDel`, `uid`, `delTime`) VALUES (1, '2022-04-01 13:33:43', '2025-03-13 13:45:48', '管理员', 'admin', 'S/JX7rGzbCEuKxPhlPkgsg==', NULL, 1, 'admin', 2, 0, 'piU7dz4vYCL93tJZPhEa', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
