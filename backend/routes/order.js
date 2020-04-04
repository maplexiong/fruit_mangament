const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

router.get("/all", (req, res, next) => {
  let sql = "select * from `order`";
  let sql_two = "select count(oid) from `order`";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    let totalCount = result[0]["count(oid)"];

    pool.query(sql, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      for (item of result) {
        item.order_state === 1
          ? (item.order_state = true)
          : (item.order_state = false);
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

//---------------------------------------------------------------------

router.get("/cell", (req, res, next) => {
  let oid = req.query.oid;
  if (!oid) {
    res.send({ code: 401, msg: "oid required", data: {} });
    return;
  }
  let sql = "select * from `order` where oid=?";
  pool.query(sql, [oid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      result[0].order_state === 1
        ? (result[0].order_state = true)
        : (result[0].order_state = false);
      res.send({ code: 200, msg: "search success", data: result[0] });
    } else {
      res.send({ code: 402, msg: "oid null", data: {} });
    }
  });
});

//---------------------------------------------------------------------

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
  let sql = "select * from `order` limit ?,?";
  let sql_two = "select count(oid) from `order`";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    let totalCount = result[0]["count(oid)"];
    pool.query(sql, [start, pageSize], (err, result) => {
      if (err) {
        next(err);
        return;
      }
      for (item of result) {
        item.order_state === 1
          ? (item.order_state = true)
          : (item.order_state = false);
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

//------------------------------------------------------------

module.exports = router;
