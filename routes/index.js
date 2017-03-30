module.exports = function(req, res,next,viewPath){
  res.render(viewPath, {
      layout: false,
      title:"哈哈哈哈"
  });
};