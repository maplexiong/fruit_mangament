const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

// router.get("/login/:aname&:apwd", (req, res) => {
router.get("/login", (req, res) => {
  let { aname, apwd } = req.query;
  let sql = "select * from admin where aname=? and apwd=?";
  pool.query(sql, [aname, apwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      req.session.id = result[0].aid;
      console.log(req.session);
      res.send({
        code: 200,
        msg: "登录成功",
        sessionID: req.session.id,
        data: result[0]
      });
    } else {
      res.send({
        code: 201,
        msg: "登录错误",
        sessionID: "",
        data: []
      });
    }
  });
});
/* 修改管理员密码 session */
router.post("/update", (req, res) => {
  // let {};
});

module.exports = router;
