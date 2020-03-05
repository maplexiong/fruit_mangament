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
        req.session.uid = result[0].uid;
        req.session.upwd = upwd;
        console.log(
          "管理员用户:",
          req.session.roleID,
          req.session.uid,
          req.session.upwd
        );
        res.send({ code: 200, msg: "管理员登录", data: result[0] });
      } else if (result[0].role === "general") {
        req.session.roleID = "general";
        req.session.uid = result[0].uid;
        req.session.upwd = upwd;
        console.log(
          "普通用户:",
          req.session.roleID,
          req.session.uid,
          req.session.upwd
        );
        res.send({ code: 200, msg: "普通用户登录", data: result[0] });
      } else {
        res.send({ code: 0, msg: "发生未知错误", data: {} });
      }
    } else {
      res.send({ code: 0, msg: "发生未知错误", data: {} });
    }
  });
});

// 退出登录
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("mycookie");
  res.send({ code: 200, msg: "退出成功,请重新登录" });
});
/* 密码修改 */
// router.post("/update", (req, res) => {
/* router.get("/update", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  // let { uid, upwd } = req.body;
  let { uid, upwd } = req.query;
  if (!uid) {
    res.send({ code: 202, msg: "请提供uid" });
    return;
  }
  if (!upwd) {
    res.send({ code: 202, msg: "请提供upwd" });
    return;
  }
  let sql = "update user set upwd=? where uid=?";
  pool.query("select upwd from user where uid=?", [uid], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (upwd == result[0].upwd) {
      res.send({ code: 202, msg: "与旧密码相同" });
      return;
    } else {
      pool.query(sql, [upwd, uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "修改成功" });
        } else {
          res.send({ code: 201, msg: "修改失败" });
        }
      });
    }
  });
}); */

// router.post("/update/passwd", (req, res) => {
router.get("/update/passwd", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  // let { uid, upwd } = req.body;
  let { uid, upwd } = req.query;
  if (!uid) {
    res.send({ code: 202, msg: "请提供uid" });
    return;
  }
  if (!upwd) {
    res.send({ code: 202, msg: "请提供upwd" });
    return;
  }
  let sql = "update user set upwd=? where uid=?";
  if (uid != req.session.uid) {
    res.send({ code: 202, msg: "只能管理本人信息" });
    return;
  } else {
    if (upwd == req.session.upwd) {
      res.send({ code: 202, msg: "与旧密码相同" });
      return;
    } else {
      pool.query(sql, [upwd, uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0 && result.affectedRows.upwd != upwd) {
          res.send({ code: 200, msg: "修改成功" });
          return;
        } else {
          res.send({ code: 201, msg: "修改失败" });
        }
      });
    }
  }
});

router.post("/reg", (req, res) => {
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  if (req.session.roleID != "admin") {
    res.send({ code: 0, msg: "您没有权限!" });
    return;
  }
  // let { uname, upwd, role, sex, age, phone, work_time, work_begin } = req.body;
  let obj = req.body;
  if (!obj.uname && !obj.upwd && !obj.role) {
    res.send({ code: 0, msg: "必须提供uname,upwd,role(默认权限低)" });
    return;
  }
  let sql = "insert into user set ?";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: "注册成功" });
    } else {
      res.send({ code: 201, msg: "注册失败" });
    }
  });
});

/* router.post("/update",(req,res)=>{
  if (!req.session.roleID) {
    res.send({ code: 0, msg: "请登录!" });
    return;
  }
  if (req.session.roleID != "admin") {
    res.send({ code: 0, msg: "您没有权限!" });
    return;
  }
  let {uname,}
});
 */

module.exports = router;
