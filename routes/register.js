// 注册
const router = require('express').Router();
//引入user的数据库构架完成状态
const user = require('../sql/user')

router.get('/', function (req, res, next) {
  console.log('此时进入 注册的/里面');
  // 渲染
  res.render('register')
})

router.post('/in', function (req, res, next) {
  console.log('进入注册的in 里面');
  let obj = req.body;
  console.log(obj);
  // 查询数据库数据
  user.findOne({ username: obj.username }, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      // 证明用户已存在
      res.redirect('/register')
    } else {
      // 不存在 插入数据
      user.insertMany(obj, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
        res.redirect('/login')
      })
    }
  })
})



module.exports = router;
