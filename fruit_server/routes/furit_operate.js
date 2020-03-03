const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

router.get("/all", (req, res) => {
  let sql = "select * from fruit";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, msg: "查询信息成功", data: result });
    }
  });
});

router.get("/cell", (req, res) => {
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
  let { pageNum, pageCount } = req.query;
  if (!pageNum) pageNum = 1;
  if (!pageCount) pageCount = 6;
  let start = (pageNum - 1) * pageCount;
  pageCount = parseInt(pageCount);
  let sql = "select * from fruit limit ?,?";
  pool.query(sql, [start, pageCount], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "查询信息成功", data: result });
  });
});

/* update info */
router.post("/update", (req, res) => {
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
        res.send({ code: 200, msg: "修改信息成功", data: [] });
      } else {
        res.send({ code: 201, msg: "修改信息失败", data: [] });
      }
    }
  );
});

/* add furit info */

router.post("/add", (req, res) => {
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
        res.send({ code: 200, msg: "新增信息成功", data: [] });
      } else {
        res.send({ code: 201, msg: "新增信息失败", data: [] });
      }
    }
  );
});

router.post("/del", (req, res) => {
  let { fid } = req.body;
  let sql = "delete from fruit where fid=?";
  pool.query(sql, [fid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: "删除信息成功", data: [] });
    } else {
      res.send({ code: 201, msg: "删除信息失败", data: [] });
    }
  });
});

module.exports = router;
