const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

router.get("/login", (req, res) => {
  let { ename, epwd } = req.query;
  let sql = "select * from emp where ename=? and epwd=?";
  pool.query(sql, [ename, epwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      req.session.id = result[0].eid;
      res.send({
        code: 200,
        msg: "登录成功",
        sessionID: req.session.id,
        data: result[0]
      });
    } else {
      res.send({ code: 201, msg: "登录错误", sessionID: "", data: [] });
    }
  });
});

module.exports = router;
