SET NAMES UTF8;
DROP DATABASE IF EXISTS `fruit`;
CREATE DATABASE `fruit` CHARSET = UTF8;
USE `fruit`;

--用户表

CREATE TABLE `user`(
  `uid` INT PRIMARY KEY AUTO_INCREMENT,
  `uname` VARCHAR(32) NOT NULL COMMENT '用户名',
  `upwd` VARCHAR(32) NOT NULL COMMENT '密码',
  `role` VARCHAR(32) DEFAULT 'general' COMMENT '默认角色general',
  `sex` INT(11) DEFAULT 1 COMMENT '0女1男(默认)2未知',
  `age` INT(11) DEFAULT NULL COMMENT '年龄',
  `phone` CHAR(11) DEFAULT NULL COMMENT '手机号',
  `work_time` DECIMAL(3,1) DEFAULT NULL COMMENT '工龄(年)',
  `work_begin` VARCHAR(16) DEFAULT NULL COMMENT '入职时间'
);

INSERT INTO `user` VALUES(NULL,'admin','admin','admin',DEFAULT,35,18372687269,10,'2010-1-1');
INSERT INTO `user` VALUES(NULL,'abc','123456','admin',0,30,17612341234,3.1,'2015-1-1');
INSERT INTO `user` VALUES(NULL,'xiaoxiong','123456',DEFAULT,1,30,18945676789,2,'2017-3-1');
INSERT INTO `user` VALUES(NULL,'xiaozhou','123456','general',0,27,17624563286,3,'2016-5-3');
INSERT INTO `user` VALUES(NULL,'xiaoluo','123456','general',0,26,16724563286,3,'2016-5-3');
INSERT INTO `user` VALUES(NULL,'xiaochen','123456','general',1,36,17824563286,3,'2016-5-3');
INSERT INTO `user` VALUES(NULL,'xiaowang','123456','general',2,24,17124563286,1,'2017-5-3');
INSERT INTO `user` VALUES(NULL,'dingding','123456','general',1,22,13724563286,1.2,'2016-9-3');

-- -----------------------------------------------------------------------------------------------------

-- 管理员表
/* CREATE TABLE `admin`(
  `aid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `aname` VARCHAR(32) DEFAULT NULL,
  `apwd` VARCHAR(32) DEFAULT NULL
); */

-- INSERT INTO `admin` VALUES(NULL, 'admin', 'admin');

-- 员工表
-- 编号 姓名  密码 性别 年龄 电话 工龄 入职时间
/* CREATE TABLE `emp`(
  `eid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `ename` VARCHAR(32) DEFAULT NULL,
  `epwd` VARCHAR(32) DEFAULT NULL,
  `esex` INT(11) DEFAULT NULL,
  `eage` INT(11) DEFAULT NULL,
  `ephone` VARCHAR(16) DEFAULT NULL,
  `ework_time` VARCHAR(16) DEFAULT NULL,
  `ework_begin` VARCHAR(16) DEFAULT NULL
);

INSERT INTO `emp` VALUES(NULL, 'xiaoxiong','123456',1,24,'18372687269','0104','2018-10-10');
INSERT INTO `emp` VALUES(NULL, 'xiaozhou','123456',0,23,'17612341234','0105','2018-09-15');
INSERT INTO `emp` VALUES(NULL, 'timo','123456',1,22,'15256421234','0005','2019-10-10');
 */
-- --------------------------------------------------------------------------------------------------

-- 水果信息表
-- 编号 产品名 单位 类别 产地 数量 进价 售价 是否在售
-- 是否在售 1在售 0未售
CREATE TABLE `fruit`(
  `fid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `fname` VARCHAR(32) DEFAULT NULL,
  `funit` VARCHAR(32) DEFAULT NULL,
  `fkind` VARCHAR(32) DEFAULT NULL,
  `forigin` VARCHAR(32) DEFAULT NULL,
  `fcount` INT(11) DEFAULT NULL,
  `fprice` DECIMAL(6,2) DEFAULT NULL,
  `f_sale_price` DECIMAL(6,2) DEFAULT NULL,
  `f_is_sale` INT(11) DEFAULT NULL
  -- `fdesc` VARCHAR(255) DEFAULT '无'
);

INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);
INSERT INTO `fruit` VALUES(NULL,'山东大樱桃大连车厘子','kg','车厘子','中国广西',320,4.8,12,1);
INSERT INTO `fruit` VALUES(NULL,'甘肃天水精品花牛苹果','kg','苹果','中国甘肃',320,5,10,1);
-- ---------------------------------------------------------------------------------------------------

-- 订单表
-- 编号 订单时间 完成订单时间
CREATE TABLE `order`(
  `oid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `otime` VARCHAR(32),
  `o_complete_time` VARCHAR(32)
);

-- -----------------------------------------------------------------------------------------------------