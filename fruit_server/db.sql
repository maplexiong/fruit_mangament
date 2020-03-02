SET
  NAMES UTF8;

DROP DATABASE IF EXISTS `fruit`;

CREATE DATABASE `fruit` CHARSET = UTF8;

USE `fruit`;

-- 管理员表
CREATE TABLE `admin`(
  `aid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `aname` VARCHAR(32) DEFAULT NULL,
  `apwd` VARCHAR(32) DEFAULT NULL
);

INSERT INTO `admin` VALUES(NULL, 'admin', 'admin');

-- 员工表
-- 编号 姓名  密码 性别 年龄 电话 工龄 入职时间
CREATE TABLE `emp`(
  `eid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `ename` VARCHAR(32) DEFAULT NULL,
  `epwd` VARCHAR(32) DEFAULT NULL,
  `esex` INT(11) DEFAULT NULL,
  `eage` INT(11) DEFAULT NULL,
  `ephone` VARCHAR(16) DEFAULT NULL,
  `work_time` VARCHAR(16) DEFAULT NULL,
  `work_begin` VARCHAR(16) DEFAULT NULL
);

INSERT INTO `emp` VALUES(NULL, 'xiaoxiong','123456',1,24,'18372687269','0104','2018-10-10');
INSERT INTO `emp` VALUES(NULL, 'xiaozhou','123456',0,23,'17612341234','0105','2018-09-15');
INSERT INTO `emp` VALUES(NULL, 'timo','123456',1,22,'15256421234','0005','2019-10-10');

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
);

INSERT INTO `fruit` VALUES(NULL,'江西橙子赣南脐橙','kg','脐橙','中国江西',500,2.5,5,1);
INSERT INTO `fruit` VALUES(NULL,'海南三亚小台农芒果','kg','台芒','中国海南',300,4.8,9,1);

-- ---------------------------------------------------------------------------------------------------

-- 订单表
-- 编号 订单时间
CREATE TABLE `order`(
  `oid` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `otime` VARCHAR(32)
);

-- -----------------------------------------------------------------------------------------------------