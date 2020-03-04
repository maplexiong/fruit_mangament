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
      // console.log(req.session);
      req.session.user = 1;
      console.log(req.sessionID);
      console.log(req.session.id);
      // req.session.id = result[0].aid;
      // console.log(req.session);
      res.send({
        code: 200,
        msg: "登录成功",
        // sessionID: req.session.id,
        data: result[0]
      });
    } else {
      // console.log(req.sessionID);
      res.send({
        code: 201,
        msg: "登录错误",
        sessionID: "",
        data: []
      });
    }
  });
});
/* 修改管理员密码 */
/* router.post("/update", (req, res) => {
  let { aid, aname, apwd } = req.body;
  console.log(aid, aname, apwd);
  if (!apwd) {
    res.send({ code: 202, msg: "请输入密码", data: [] });
    return;
  }
  let sql1 = "select aid,aname,apwd from admin where aid=?";
  let sql2 = "update  admin set aname=? and apwd=? where aid=?";
  pool.query(sql1, [aid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (apwd == result[0].apwd) {
        res.send({ code: 201, msg: "与旧密码相同", data: [] });
        return;
      } else {
        pool.query(sql2, [aname, apwd, aid], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send({ code: 200, msg: "修改成功", data: [] });
          } else {
            res.send({ code: 202, msg: "修改错误", data: [] });
          }
        });
      }
    } else {
      res.send({ code: 202, msg: "操作错误", data: [] });
    }
  });
});
 */
module.exports = router;
