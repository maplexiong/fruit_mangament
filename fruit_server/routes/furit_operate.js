const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

router.get("/all", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  let sql = "select * from fruit";
  let sql_two = "select count(fid) from fruit";
  pool.query(sql_two, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let dataCount = result[0]["count(fid)"];
      pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.send({
            code: 200,
            msg: "查询信息成功",
            dataCount: dataCount,
            data: result
          });
        } else {
          res.send({ code: 201, msg: "查询信息失败", dataCount: 0, data: [] });
        }
      });
    } else {
      res.send({ code: 201, msg: "查询信息失败", dataCount: 0, data: [] });
    }
  });
});

router.get("/cell", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  let { fid } = req.query;
  let sql = "select * from fruit where fid=?";
  pool.query(sql, [fid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, msg: "查询信息成功", data: result[0] });
    } else {
      res.send({ code: 201, msg: "查询信息失败", data: [] });
    }
  });
});

router.get("/list", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  let { pageNum, pageCount } = req.query;
  if (!pageNum) pageNum = 1;
  if (!pageCount) pageCount = 6;
  let start = (pageNum - 1) * pageCount;
  pageCount = parseInt(pageCount);
  let sql = "select * from fruit limit ?,?";
  let sql_two = "select count(fid) from fruit";
  pool.query(sql_two, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let dataCount = result[0]["count(fid)"];
      pool.query(sql, [start, pageCount], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.send({
            code: 200,
            msg: "查询信息成功",
            dataCount: dataCount,
            data: result
          });
        } else {
          res.send({ code: 201, msg: "查询信息失败", dataCount: 0, data: [] });
        }
      });
    } else {
      res.send({ code: 201, msg: "查询信息失败", dataCount: 0, data: [] });
    }
  });
});

/* update info */
router.post("/update", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  if (req.session.roleID != "admin") {
    res.send({ code: 0, msg: "您没有权限!" });
    return;
  }
  let {
    fid,
    fname,
    funit,
    fkind,
    forigin,
    fcount,
    fprice,
    f_sale_price,
    f_is_sale
  } = req.body;
  if (
    !fname &&
    !funit &&
    !fkind &&
    !forigin &&
    !fcount &&
    !fprice &&
    !f_sale_price &&
    !f_is_sale
  ) {
    res.send({ code: 201, msg: "请输入完整信息", data: [] });
    return;
  }
  let sql =
    "update fruit set fname=?,funit=?,fkind=?,forigin=?,fcount=?,fprice=?,f_sale_price=?, f_is_sale=? where fid=?";
  pool.query(
    sql,
    [
      fname,
      funit,
      fkind,
      forigin,
      fcount,
      fprice,
      f_sale_price,
      f_is_sale,
      fid
    ],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 200, msg: "修改信息成功" });
      } else {
        res.send({ code: 201, msg: "修改信息失败" });
      }
    }
  );
});

/* add furit info */

router.post("/add", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  if (req.session.roleID != "admin") {
    res.send({ code: 0, msg: "您没有权限!" });
    return;
  }
  let {
    fname,
    funit,
    fkind,
    forigin,
    fcount,
    fprice,
    f_sale_price,
    f_is_sale
  } = req.body;
  if (
    !fname &&
    !funit &&
    !fkind &&
    !forigin &&
    !fcount &&
    !fprice &&
    !f_sale_price &&
    !f_is_sale
  ) {
    res.send({ code: 201, msg: "请输入完整信息", data: [] });
    return;
  }
  let sql = "insert into fruit values(null,?,?,?,?,?,?,?,?)";
  pool.query(
    sql,
    [fname, funit, fkind, forigin, fcount, fprice, f_sale_price, f_is_sale],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 200, msg: "新增信息成功" });
      } else {
        res.send({ code: 201, msg: "新增信息失败" });
      }
    }
  );
});

router.post("/del", (req, res) => {
  // router.get("/del", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  if (req.session.roleID != "admin") {
    res.send({ code: 0, msg: "您没有权限!" });
    return;
  }
  let { fid } = req.body;
  // let { fid } = req.query;
  let sql = "delete from fruit where fid=?";
  pool.query(sql, [fid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: "删除信息成功" });
    } else {
      res.send({ code: 201, msg: "删除信息失败" });
    }
  });
});

module.exports = router;
