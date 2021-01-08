var express = require('express');
var router = express.Router();
const staff = require('../sql/staff')
/* GET home page. */
router.get('/', function (req, res, next) {
  staff.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)

    res.render('staff', {
      index: 3,
      data: data
    });
  })

});


// 添加
router.get("/add", function (req, res, next) {
  res.render("staffAdd", {
    index: 3,
  });
});

router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;

  console.log(obj);
  staff.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");
  })

});


//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  staff.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");
  })

});


//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  staff.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('staffUpdate', {
      index: 3,
      data: data
    })
  })


});
// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;
  console.log(obj);
  // 处理数据类型，符合数据集合的字段类型
  obj.salary = Number(obj.salary);
  // // obj.stock = parseFloat(obj.stock);
  obj.year = obj.year - 0;
  // // obj.sales = obj.sales - 0;
  // // obj.score = obj.score * 1;
  console.log('obj_id', obj)
  staff.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");

  })


});




//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
  // console.log(obj);
  let reg = new RegExp(obj.search);
  staff.find({ username: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("staff", {
      index: 3,
      data,
    });
  })


});
module.exports = router;
