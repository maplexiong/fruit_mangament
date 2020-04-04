const express = require("express");
const pool = require("../db/pool");
let router = express.Router();

/**
 * 根据登录角色不同区别菜单
 * 字段 role = admin / teamLeader / general
 */

router.get("/", (req, res, next) => {
  let role = req.session.user.role;
  if (!role) {
    res.send({ code: 401, msg: "role required" });
    return;
  }
  // let role = "admin";
  const sql = "select path_name ,isEnable from role_menu where role=?";
  let p1 = new Promise((resolve, reject) => {
    pool.query(sql, role, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      if (result.length > 0) {
        let enabled = result.filter((elem) => {
          return elem.isEnable === 1;
        });
        resolve(enabled);
      } else {
        reject("未知错误!");
      }
    });
  });
  p1.then((enabled) => {
    const sql =
      "select mid,first_name,second_name,path_name from menu where path_name=? order by mid desc";
    let promise = enabled.map((Enabled) => {
      return new Promise((resolve) => {
        pool.query(sql, [Enabled.path_name], (err, result) => {
          if (err) {
            next(err);
            return;
          }
          resolve(...result);
        });
      });
    });
    Promise.all(promise).then((allData) => {
      let oneArr = allData.map((elem) => elem.first_name);
      oneArr = [...new Set(oneArr)];
      let newArr = oneArr.map((first_name) => ({
        first_name,
        children: allData
          .filter((elem) => elem.first_name === first_name)
          .map(({ second_name, path_name }) => ({
            second_name,
            path_name,
          })),
      }));
      res.send({ code: 200, msg: "search success", data: newArr });
    });
  }).catch((err) => {
    res.send({ code: 402, msg: err });
  });
});

module.exports = router;
