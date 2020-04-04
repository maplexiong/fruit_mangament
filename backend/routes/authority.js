const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

//获取角色对应权限
router.get("/roleAuthority", (req, res, next) => {
  let role = req.session.user.role;
  if (!role) {
    res.send({ code: 401, msg: "role required" });
    return;
  }
  const sql = "select rmid,role,path_name,isEnable from role_menu";
  pool.query(sql, role, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    for (item of result) {
      item.isEnable == 1 ? (item.isEnable = true) : (item.isEnable = false);
    }
    switch (role) {
      case "admin":
        res.send({ code: 200, msg: "search success", data: result });
        break;
      case "teamLeader":
        let oneArr = result.filter((elem) => {
          return elem.role !== "admin" && elem.role !== "teamLeader";
        });
        res.send({ code: 200, msg: "search success", data: oneArr });
        break;
      case "general":
        let twoArr = result.filter((elem) => {
          return (
            elem.role !== "admin" &&
            elem.role !== "teamLeader" &&
            elem.role !== "general"
          );
        });
        res.send({ code: 200, msg: "search success", data: twoArr });
        break;
      default:
        res.send({ code: 401, msg: "no role", data: [] });
        break;
    }
  });
});

//是否启用模块
router.post("/isEnable", (req, res, next) => {
  let rmid = req.body.rmid;
  let isEnable = req.body.isEnable;
  if (!rmid) {
    res.send({ code: 401, msg: "rmid required" });
    return;
  }
  if (!isEnable) {
    res.send({ code: 402, msg: "isEnable required" });
    return;
  }
  const sql = "update role_menu set isEnable=? where rmid=?";
  isEnable == "true" ? (isEnable = 1) : (isEnable = 0);
  pool.query(sql, [isEnable, rmid], (err, result) => {
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

module.exports = router;
