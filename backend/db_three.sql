SET NAMES UTF8;
DROP DATABASE IF EXISTS `fruit_three`;
CREATE DATABASE `fruit_three` CHARSET = UTF8;
USE `fruit_three`;

-- 用户角色表

CREATE TABLE `user_role`(
  `urid` INT PRIMARY KEY AUTO_INCREMENT,
  `role` VARCHAR(32) DEFAULT 'general' COMMENT '用户角色',
  `role_desc` VARCHAR(256) COMMENT '角色描述'
);

INSERT INTO `user_role` VALUES
  (NULL,'admin','管理员'),
  (NULL,'general','员工'),
  (NULL,'teamLeader','组长');

-- -----------------------------------------------------------------------------------------------------

-- 用户表

CREATE TABLE `user`(
  `uid` INT PRIMARY KEY AUTO_INCREMENT,
  `uname` VARCHAR(32) NOT NULL COMMENT '用户名',
  `upwd` VARCHAR(32) NOT NULL COMMENT '密码',
  `role` VARCHAR(32) DEFAULT 'general' COMMENT '默认角色general',
  `sex` INT(11) DEFAULT 2 COMMENT '0女1男(默认)2未知',
  `age` INT(11) DEFAULT 0 COMMENT '年龄',
  `phone` CHAR(11) DEFAULT NULL COMMENT '手机号',
  `work_time` DECIMAL(3,1) DEFAULT 0 COMMENT '工龄(年)',
  `work_begin` VARCHAR(16) DEFAULT '2020-02-02' COMMENT '入职时间',
  `state` TINYINT DEFAULT 0 COMMENT '用户状态0停用1启用'
);

INSERT INTO `user` VALUES
  (NULL,'admin',md5('admin'),'admin',1,35,18372687269,10,'2010-1-1',1),
  (NULL,'abc',md5('123456'),'general',0,30,17612341234,3.1,'2015-1-1',1),
  (NULL,'bbb',md5('123456'),'teamLeader',0,30,17612341234,3.1,'2015-1-1',1),
  (NULL,'xiaoxiong',md5('123456'),DEFAULT,1,30,18945676789,2,'2017-3-1',1),
  (NULL,'xiaozhou',md5('123456'),'general',0,27,17624563286,3,'2016-5-3',1),
  (NULL,'xiaoluo',md5('123456'),'general',0,26,16724563286,3,'2016-5-3',1),
  (NULL,'xiaochen',md5('123456'),'general',1,36,17824563286,3,'2016-5-3',1),
  (NULL,'xiaowang',md5('123456'),'general',2,24,17124563286,1,'2017-5-3',0),
  (NULL,'dingding',md5('123456'),'general',1,22,13724563286,1.2,'2016-9-3',0);

-- -----------------------------------------------------------------------------------------------------

-- 菜单表

CREATE TABLE `menu`(
  `mid` INT PRIMARY KEY AUTO_INCREMENT,
  `first_name` VARCHAR(32) COMMENT '一级菜单',
  `second_name` VARCHAR(32) COMMENT '二级菜单',
  `path_name` VARCHAR(32) COMMENT '跳转路径'
);

INSERT INTO `menu` VALUES
  (NULL,'用户管理','用户列表','UserList'),
  (NULL,'权限管理','权限列表','AuthorityInformation'),
  (NULL,'商品管理','商品列表','ProductList'),
  (NULL,'商品管理','商品详情','FullInformation'),
  (NULL,'订单管理','订单列表','OrderList'),
  (NULL,'数据统计','销售信息','SaleInformation'),
  (NULL,'数据统计','进货信息','PurchaseInformation');

-- -----------------------------------------------------------------------------------------------------

-- 角色拥有的权限

CREATE TABLE `role_menu`(
  `rmid` INT PRIMARY KEY AUTO_INCREMENT,
  `role` VARCHAR(32) COMMENT '角色',
  `path_name` VARCHAR(32) COMMENT '跳转路径',
  `isEnable` TINYINT DEFAULT 1 COMMENT '组件状态1启用0禁用'
);

-- admin  --> UserList | AuthorityInformation | ProductList | FullInformation | OrderList | SaleInformation | PurchaseInformation
-- teamLeader  --> 
-- general  -->

INSERT INTO `role_menu` VALUES
  (NULL,'admin','UserList',DEFAULT),
  (NULL,'admin','AuthorityInformation',DEFAULT),
  (NULL,'admin','ProductList',DEFAULT),
  (NULL,'admin','FullInformation',DEFAULT),
  (NULL,'admin','OrderList',DEFAULT),
  (NULL,'admin','SaleInformation',DEFAULT),
  (NULL,'admin','PurchaseInformation',DEFAULT),
  (NULL,'general','ProductList',DEFAULT),
  (NULL,'teamLeader','UserList',DEFAULT),
  (NULL,'teamLeader','ProductList',DEFAULT),
  (NULL,'teamLeader','OrderList',DEFAULT),
  (NULL,'teamLeader','FullInformation',DEFAULT),
  (NULL,'teamLeader','SaleInformation',DEFAULT);

-- --------------------------------------------------------------------------------------------------

-- 水果信息表

CREATE TABLE `fruit`(
  `fid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `fname` VARCHAR(32) DEFAULT NULL COMMENT '产品名',
  `funit` VARCHAR(32) DEFAULT NULL COMMENT '单位',
  `fkind` VARCHAR(32) DEFAULT NULL COMMENT '类别',
  `forigin` VARCHAR(32) DEFAULT NULL COMMENT '产地',
  `fcount` DECIMAL(6,2) DEFAULT NULL COMMENT '数量',
  `fprice` DECIMAL(6,2) DEFAULT NULL COMMENT '进价',
  `f_sale_price` DECIMAL(6,2) DEFAULT NULL COMMENT '售价',
  `f_is_sale` TINYINT DEFAULT 0 COMMENT '是否在售0未售1在售'
  -- `fdesc` VARCHAR(255) DEFAULT '无' COMMENT '描述'
);

INSERT INTO `fruit` VALUES
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1),
  (NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1),
  (NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1),
  (NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1),
  (NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);

-- ---------------------------------------------------------------------------------------------------

-- 订单表

CREATE TABLE `order`(
  `orderId` VARCHAR(32) PRIMARY KEY NOT NULL COMMENT '订单编号',
  `order_principal` VARCHAR(32) NOT NULL COMMENT '负责人',
  `order_number`INT NOT NULL COMMENT '商品数量',
  `order_amount` DECIMAL(7,2) NOT NULL COMMENT '金额',
  `order_date` VARCHAR(32) NOT NULL COMMENT '产生订单日期',
  `order_state` BOOLEAN DEFAULT 0 COMMENT '状态1完成0未完成'
);

-- -----------------------------------------------------------------------------------------------------

-- 订单详情表(产生订单)

CREATE TABLE `order_detail`(
  `od_id` INT PRIMARY KEY AUTO_INCREMENT,
  `orderId` VARCHAR(32) NOT NULL COMMENT '订单编号',
  `od_fid` INT NOT NULL COMMENT '水果编号',
  `od_fruit_name` VARCHAR(32) NOT NULL COMMENT '水果名',
  `od_fruit_unit` VARCHAR(32) NOT NULL COMMENT '水果单位',
  `od_fruit_count` DECIMAL(6,2) NOT NULL COMMENT '水果数量',
  `od_fruit_sale_price` DECIMAL(6,2) NOT NULL COMMENT '水果售价',
  `od_date` VARCHAR(32) NOT NULL COMMENT '订单产生日期',
  FOREIGN KEY(`orderId`) REFERENCES `order`(`orderId`)
);

-- -----------------------------------------------------------------------------------------------------

