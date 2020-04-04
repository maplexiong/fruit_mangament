/**
 * 查询之前使用loginCheck检测是否登录
 */

const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

router.get("/all", (req, res, next) => {
  let sql = "select * from fruit";
  let sql_two = "select count(fid) from fruit";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    let totalCount = result[0]["count(fid)"];

    pool.query(sql, (err, result) => {
      if (err) {
        next(err);
        return;
      }

      res.send({
        code: 200,
        msg: "search success",
        totalCount: totalCount,
        data: result
      });
    });
  });
});

//-----------------------------------------------------------------------------------

router.get("/cell", (req, res, next) => {
  let fid = req.query.fid;
  if (!fid) {
    res.send({ code: 401, msg: "fid required", data: [] });
    return;
  }
  let sql = "select * from fruit where fid=?";
  pool.query(sql, [fid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      res.send({ code: 200, msg: "search success", data: result[0] });
    } else {
      res.send({ code: 402, msg: "fid null", data: {} });
    }
  });
});

//-----------------------------------------------------------------------------------

router.get("/list", (req, res, next) => {
  let { pageNum, pageSize } = req.query;
  if (!pageNum) {
    pageNum = 1;
  } else {
    pageNum = parseInt(pageNum);
  }
  if (!pageSize) {
    pageSize = 6;
  } else {
    pageSize = parseInt(pageSize);
  }
  let start = (pageNum - 1) * pageSize;
  let sql = "select * from fruit limit ?,?";
  let sql_two = "select count(fid) from fruit";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    let totalCount = result[0]["count(fid)"];
    pool.query(sql, [start, pageSize], (err, result) => {
      if (err) {
        next(err);
        return;
      }
      for (item of result) {
        item.f_is_sale === 1
          ? (item.f_is_sale = true)
          : (item.f_is_sale = false);
      }
      res.send({
        code: 200,
        msg: "search success",
        pageNum: pageNum,
        pageSize: pageSize,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        data: result
      });
    });
  });
});

//-----------------------------------------------------------------------------------

router.post("/add", (req, res, next) => {
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
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
    res.send({ code: 401, msg: "all info required", data: [] });
    return;
  }
  let sql = "insert into fruit values(null,?,?,?,?,?,?,?,?)";
  pool.query(
    sql,
    [fname, funit, fkind, forigin, fcount, fprice, f_sale_price, f_is_sale],
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.send({ code: 200, msg: "add success", fid: result.insertId });
    }
  );
});

//-----------------------------------------------------------------------------------

router.post("/update", (req, res, next) => {
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let fid = req.body.fid;
  if (!fid) {
    res.send({ code: 401, msg: "fid required" });
    return;
  }

  if (!req.body.f_is_sale) {
    res.send({ code: 402, msg: "f_is_sale required" });
    return;
  }

  let obj = req.body; //obj={fname,funit,fkind,forigin,fcount, fprice,f_sale_price,f_is_sale}
  obj.f_is_sale == "true" ? (obj.f_is_sale = 1) : (obj.f_is_sale = 0);
  let sql = "update fruit set ? where fid=?";
  pool.query(sql, [obj, fid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.changedRows > 0) {
      res.send({ code: 200, msg: "update success" });
    } else if (result.changedRows === 0) {
      res.send({ code: 201, msg: "update no change" });
    } else {
      res.send({ code: 400, msg: "update fail" });
    }
  });
});

//-----------------------------------------------------------------------------------

router.post("/del", (req, res, next) => {
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let fid = req.body.fid;
  if (!fid) {
    res.send({ code: 401, msg: "fid required" });
    return;
  }
  let sql = "delete from fruit where fid=?";
  pool.query(sql, fid, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: "del success",
        delUserId: req.session.user.uid
      });
    } else {
      res.send({ code: 400, msg: "del fail" });
    }
  });
});

module.exports = router;
