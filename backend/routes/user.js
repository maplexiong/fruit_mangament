var express = require("express");
const pool = require("../db/pool");
var router = express.Router();

router.post("/login", (req, res, next) => {
  // console.log(req);
  let uname = req.body.uname;
  if (!uname) {
    res.send({ code: 401, msg: "uname required" });
    return;
  }
  let upwd = req.body.upwd;
  if (!upwd) {
    res.send({ code: 402, msg: "upwd required" });
    return;
  }
  let loginCaptcha = req.body.loginCaptcha;
  if (!loginCaptcha) {
    res.send({ code: 403, msg: "loginCaptcha required" });
    return;
  } else if (loginCaptcha.toLowerCase() !== req.session.loginCaptcha) {
    res.send({ code: 404, msg: "loginCaptcha error" });
    return;
  }

  let sql =
    "select uid,uname,role,state from user where uname=? and upwd=md5(?)";
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length === 0) {
      res.send({ code: 400, msg: "uname or upwd error" });
      return;
    } else if (result[0].state !== 1) {
      res.send({ code: 201, msg: "user disabled" });
      return;
    } else {
      req.session.user = result[0];
      req.session.save();
      console.log(req.session.user);
      res.send({
        code: 200,
        msg: "login success",
        data: req.session.user,
      });
    }
  });
});

//--------------------------------------------------------------------------

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("mycookie");
  res.send({ code: 200, msg: "logout success" });
});

//--------------------------------------------------------------------------

router.post("/update/passwd", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  let uid = req.session.user.uid;
  if (!uid) {
    res.send({ code: 401, msg: "uid required" });
    return;
  }
  let upwd = req.body.upwd;
  if (!upwd) {
    res.send({ code: 402, msg: "upwd required" });
    return;
  }
  let sql = "update user set upwd=md5(?) where uid=?";
  if (uid !== req.session.user.uid) {
    res.send({ code: 403, msg: "only operate yourself " });
    return;
  } else {
    pool.query(sql, [upwd, uid], (err, result) => {
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
  }
});

//--------------------------------------------------------------------------

router.post("/update", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let uid = req.body.uid;
  if (!uid) {
    res.send({ code: 401, msg: "uid required" });
    return;
  } else {
    uid = parseInt(uid);
  }

  let obj = req.body; //obj={role,sex,age,phone,work_time,work_begin,uid}
  let sql = "update user set ? where uid=?";
  pool.query(sql, [obj, uid], (err, result) => {
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

//--------------------------------------------------------------------------

router.post("/reg", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let obj = req.body;
  if (!obj.uname || !obj.upwd || !obj.role) {
    res.send({ code: 401, msg: "uname,upwd,role required" });
    return;
  }
  let sql = "insert into user set uname=?,upwd=md5(?),role=?";
  let sql_two = "select uid from user where uname=? ";
  pool.query(sql_two, [req.body.uname], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      res.send({ code: 409, msg: "uname already taken" });
      return;
    }
    pool.query(sql, [obj.uname, obj.upwd, obj.role], (err, result) => {
      if (err) {
        next(err);
        return;
      }
      if (result.insertId > 0 && result.affectedRows > 0) {
        res.send({ code: 200, msg: "reg success", uid: result.insertId });
      } else {
        res.send({ code: 402, msg: "reg fail" });
      }
    });
  });
});

//--------------------------------------------------------------------------

router.get("/all", (req, res) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let sql = "select * from user order by work_time desc";
  let sql_two = "select count(uid) from user";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    let totalCount = result[0]["count(uid)"];
    pool.query(sql, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      for (item of result) {
        item.state === 1 ? (item.state = true) : (item.state = false);
      }
      res.send({
        code: 200,
        msg: "search success",
        totalCount: totalCount,
        data: result,
      });
    });
  });
});

//--------------------------------------------------------------------------
//是否停用用户
router.post("/userState", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }

  let uid = req.body.uid;
  let userState = req.body.userState;

  if (!uid) {
    res.send({ code: 401, msg: "uid required" });
    return;
  }
  if (!userState) {
    res.send({ code: 402, msg: "userState required" });
    return;
  }
  userState == "true" ? (userState = 1) : (userState = 0);
  let sql = "update user set state=? where uid=?";
  pool.query(sql, [userState, uid], (err, result) => {
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

//--------------------------------------------------------------------------

router.post("/del", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }
  let uid = req.body.uid;
  if (!uid) {
    res.send({ code: 401, msg: "uid required" });
    return;
  } else {
    uid = parseInt(uid);
  }
  if (uid === req.session.user.uid) {
    res.send({ code: 497, msg: "Don't delete yourself" });
    return;
  }
  let sql = "delete from user where uid=?";
  pool.query(sql, uid, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: "del success" });
    } else {
      res.send({ code: 400, msg: "del fail" });
    }
  });
});

//--------------------------------------------------------------------------

router.get("/list", (req, res, next) => {
  if (!req.session.user) {
    res.send({ code: 499, msg: "login required" });
    return;
  }
  if (req.session.user.role !== "admin") {
    res.send({ code: 498, msg: "admin account required" });
    return;
  }

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
  let sql = "select * from user limit ?,?";
  let sql_two = "select count(uid) from user";
  pool.query(sql_two, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    let totalCount = result[0]["count(uid)"];
    pool.query(sql, [start, pageSize], (err, result) => {
      if (err) {
        next(err);
        return;
      }
      for (item of result) {
        item.state === 1 ? (item.state = true) : (item.state = false);
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

//---------------------------------------------------------------------------

module.exports = router;
