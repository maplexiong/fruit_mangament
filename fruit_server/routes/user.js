const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

// router.post("/login", (req, res) => {
router.get("/login", (req, res) => {
  // let { uname, upwd } = req.body;
  let { uname, upwd } = req.query;
  let sql = "select uid,role from user where uname=? and upwd=?";
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      res.send({ code: 201, msg: "用户信息错误或不存在" });
    } else if (result.length > 0) {
      if (result[0].role === "admin") {
        req.session.roleID = "admin";
        console.log("管理员用户:", req.session.roleID);
        res.send({ code: 200, msg: "管理员登录", data: result[0] });
      } else if (result[0].role === "general") {
        req.session.roleID = "general";
        console.log("普通用户:", req.session.roleID);
        res.send({ code: 200, msg: "普通用户登录", data: result[0] });
      } else {
        res.send({ code: 0, msg: "发生未知错误", data: {} });
      }
    } else {
      res.send({ code: 0, msg: "发生未知错误", data: {} });
    }
  });
});

module.exports = router;
