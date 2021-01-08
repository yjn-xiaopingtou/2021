

const router = require('express').Router()
// 引入user的数据库构架完成的状态
const user = require('../sql/user')
// console.log(user);
// 构建表
router.get('/', function (req, res, next) {
  console.log('login里面');
  res.render('login')
})

router.post('/in', function (req, res, next) {
  console.log('我进入 login  in里面了')
  let obj = req.body
  console.log(obj);
  user.findOne(obj, (err, data) => {
    if (err) {
      console.log(1111)
    }
    if (data) {
      // cookie的守卫
      // res.cookie('isLogin','ok')

      req.session.isLogin = 'ok';
      console.log(data);
      console.log('登陆成功');
      res.redirect('/pro')
    } else {
      res.redirect('/register')
    }
  })

})


module.exports = router;