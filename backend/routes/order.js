const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

/**
 * 产生订单
 * uname:用户名 allData:商品详情数据 totalCount:商品件数 totalAmount:商品金额 payAmount:支付金额
 */
router.post("/produceOrder", (req, res, next) => {
  let uname = req.session.user.uname;
  let totalCount = 0;
  let totalAmount = 0;
  if (!uname) {
    res.send({ code: 401, msg: "uname required!" });
    return;
  }
  let allData = req.body.allData;
  // console.log(allData);
  if (!allData) {
    res.send({ code: 402, msg: "allData required!" });
    return;
  } else {
    totalCount = allData.length;
    for (var item of allData) {
      totalAmount += Number(item.f_sale_price) * Number(item.needCount);
    }
  }
  //订单号生成规则
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let timestamp = "" + date.getTime();
  month < 10 ? (month = "0" + month) : (month = month);
  day < 10 ? (day = "0" + day) : (day = day);
  let doTimestamp = timestamp.slice(-8);
  let orderId = `${year}${month}${day}${doTimestamp}`;
  // console.log(orderId, totalCount, totalAmount);

  let payAmount = req.body.payAmount;
  if (!payAmount) {
    payAmount = 0;
  } else {
    payAmount = Number(payAmount);
  }

  let orderState = 0;
  payAmount >= totalAmount ? (orderState = 1) : (orderState = 0);
  const sql =
    "insert into `order` set orderId=?, order_principal=?,order_number=?,order_amount=?,order_date=?,order_state=?";
  const sql2 =
    "insert into `order_detail` set orderId=? , od_fid=? , od_fruit_name= ? , od_fruit_unit=? , od_fruit_count=? , od_fruit_sale_price=? , od_date=?";
  const sql3 = "select fcount from fruit where fid=?";
  const sql4 = "update fruit set fcount=? where fid=?";

  new Promise((resolve, reject) => {
    //生成订单order
    pool.query(
      sql,
      [
        orderId,
        uname,
        totalCount,
        totalAmount,
        new Date().getTime(),
        orderState,
      ],
      (err, result) => {
        if (err) {
          next(err);
          return;
        }
        if (result.affectedRows > 0) {
          resolve(orderId);
        }
      }
    );
  }).then(() => {
    //生成订单详情order_detail
    let promise = allData.map((item) => {
      return new Promise((resolve, reject) => {
        pool.query(
          sql2,
          [
            orderId,
            item.fid,
            item.fname,
            item.funit,
            item.needCount,
            item.f_sale_price,
            new Date().getTime(),
          ],
          (err, result) => {
            if (err) {
              next(err);
              return;
            }
            if (result.affectedRows > 0) {
              resolve();
            }
          }
        );
      });
    });
    Promise.all(promise).then((result) => {
      res.send({
        code: 200,
        msg: "Order generated successfully",
        data: { orderId: orderId },
      });
    });
    //完成订单?修改商品库存
    if (orderState === 1) {
      let promise2 = allData.map(({ fid, needCount }) => {
        return new Promise((resolve) => {
          pool.query(sql3, fid, (err, result) => {
            if (err) {
              next(err);
              return;
            }
            let result_fcount = result[0].fcount;
            let updata_data = Number(result_fcount) - Number(needCount);
            pool.query(sql4, [updata_data, fid], (err, result) => {
              if (err) {
                next(err);
                return;
              }
              if (result.changedRows > 0) {
                resolve("ok");
              }
            });
          });
        });
      });
      Promise.all(promise2).then(() => {});
    }
  });
});

//---------------------------------------------------------------------

/**
 * get one order and  order_detail  by orderId
 */

router.get("/cellOrderDetail", (req, res, next) => {
  let orderId = req.query.orderId;
  if (!orderId) {
    res.send({ code: 401, msg: "orderId required !" });
    return;
  }
  const sql =
    "select orderId,order_principal,order_number,order_amount,order_date,order_state from `order` where orderId=?";
  const sql2 =
    "select od_id,orderId,od_fid,od_fruit_name,od_fruit_unit,od_fruit_count,od_fruit_sale_price,od_date from `order_detail` where orderId=?";
  pool.query(sql, orderId, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      pool.query(sql2, orderId, (err, result2) => {
        if (err) {
          next(err);
          return;
        }
        let orderDetail = result2;
        res.send({
          code: 200,
          msg: "search success",
          data: {
            orderId: result[0].orderId,
            order_principal: result[0].order_principal,
            order_number: result[0].order_number,
            order_amount: result[0].order_amount,
            order_date: result[0].order_date,
            order_state: result[0].order_state,
            orderDetail: orderDetail,
          },
        });
      });
    } else {
      res.send({ code: 402, msg: "orderId null", data: {} });
    }
  });
});

//---------------------------------------------------------------------
/**
 * get order all of list
 */
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
  let sql =
    "select orderId,order_principal,order_number,order_amount,order_date,order_state from `order` order by order_date desc limit ?,?  ";
  let sql_two = "select count(orderId) from `order`";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    let totalCount = result[0]["count(orderId)"];
    pool.query(sql, [start, pageSize], (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.send({
        code: 200,
        msg: "search success",
        pageNum: pageNum,
        pageSize: pageSize,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        data: result,
      });
    });
  });
});

module.exports = router;
