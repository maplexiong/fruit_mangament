/**
 * 检查当前用户是否已经登录(检查req.session.user是否存在)，
 * 若登录了，调用后续的处理路由
 * 否则，向客户端输出“需要登录”提示
 */

module.exports = function(req, res, next) {
  if (!req.session) {
    //若当前中间件之前没有调用过session中间件，则终止执行
    throw new Error("login check middleware needs session middleware");
  }
  if (!req.session.user) {
    //客户端尚未登录
    res.send({ code: 499, msg: "login required" });
    return;
  }
  next(); //客户端已经登录过，则放行
};
