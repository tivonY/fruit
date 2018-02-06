// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });

    res.json({
        "message": "success hello",
        "status": 1
    });



  //插入数据
  var Test = AV.Object.extend("Test");
  var post = new Test();
  post.set("username", "test1");

  post.save(null, {
      success: function(post) {
          res.json({
              "message": "success",
              "status": 1
          });
      },
      error: function(post, error) {
          res.json({
              "message": error.message,
              "status": 400
          });
      }
  });

  
});
app.post('/hello1', function(req, res) {
    //res.render('hello', { message: 'Congrats, you just set up your app!' });

    res.json({
        "message": "success hello",
        "status": 1
    });

});

app.get('/get_test_data', function(req, res) {
    //res.render('get_test_data', { message: 'Congrats, get_test_data!' });

    res.json({
        "message": "success",
        "status": 1,
        "Header": [
            {
                "Children":[
                    {   "Name": "ACN",
                        "Value": 112
                    },
                    {   "Name": "China",
                        "Value": 112
                    },
                    {   "Name": "Dalian",
                        "Value": 113
                    },
                    {   "Name": "F&A",
                        "Value": 110
                    }
                ],
                "Name": "Alert",
                "Value": 102
            },
            {
                "Children":[
                    {   "Name": "ACN",
                        "Value": 45
                    },
                    {   "Name": "China",
                        "Value": 51
                    },
                    {   "Name": "Dalian",
                        "Value": 48
                    },
                    {   "Name": "F&A",
                        "Value": 41
                    }
                ],
                "Name": "Utilization",
                "Value": 51
            },
            {
                "Children":[
                    {   "Name": "ACN",
                        "Value": 86
                    },
                    {   "Name": "China",
                        "Value": 88
                    },
                    {   "Name": "Dalian",
                        "Value": 82
                    },
                    {   "Name": "F&A",
                        "Value": 81
                    }
                ],
                "Name": "Productivity",
                "Value": 82
            },
            {
                "Children":[
                    {   "Name": "ACN",
                        "Value": 65
                    },
                    {   "Name": "China",
                        "Value": 53
                    },
                    {   "Name": "Dalian",
                        "Value": 55
                    },
                    {   "Name": "F&A",
                        "Value": 55
                    }
                ],
                "Name": "Accuracy",
                "Value": 64
            }
        ],
        "Body": [
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10225/v20150814134407.jpg",
                "Name": "Li,Taihua",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 102
                    },
                    {   "Name": "Utilization",
                        "Value": 59
                    },
                    {   "Name": "Productivity",
                        "Value": 76
                    },
                    {   "Name": "Accuracy",
                        "Value": 54
                    }
                ]
            },
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10228/v20150814134429.jpg",
                "Name": "Wei,Yiru.wei",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 96
                    },
                    {   "Name": "Utilization",
                        "Value": 56
                    },
                    {   "Name": "Productivity",
                        "Value": 56
                    },
                    {   "Name": "Accuracy",
                        "Value": 56
                    }
                ]
            },
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10229/v20151027142603.jpg",
                "Name": "Zhang,Jie",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 97
                    },
                    {   "Name": "Utilization",
                        "Value": 41
                    },
                    {   "Name": "Productivity",
                        "Value": 74
                    },
                    {   "Name": "Accuracy",
                        "Value": 63
                    }
                ]
            },
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10230/v20150814134524.jpg",
                "Name": "Zhang,Xiaodong",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 102
                    },
                    {   "Name": "Utilization",
                        "Value": 41
                    },
                    {   "Name": "Productivity",
                        "Value": 81
                    },
                    {   "Name": "Accuracy",
                        "Value": 57
                    }
                ]
            },
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10231/v20150814134545.jpg",
                "Name": "Zhang,Jiaojiao",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 90
                    },
                    {   "Name": "Utilization",
                        "Value": 50
                    },
                    {   "Name": "Productivity",
                        "Value": 75
                    },
                    {   "Name": "Accuracy",
                        "Value": 75
                    }
                ]
            },
            {
                "Avatar": "http://170.252.153.22:8001/DE.Xccelerator//Uploads/avatar/10232/v20150814151750.jpg",
                "Name": "Yang,Shengnan",
                "Values": [
                    {   "Name": "Alert",
                        "Value": 107
                    },
                    {   "Name": "Utilization",
                        "Value": 44
                    },
                    {   "Name": "Productivity",
                        "Value": 79
                    },
                    {   "Name": "Accuracy",
                        "Value": 53
                    }
                ]
            }

        ]
    });

});

app.post('/login', function (req, res) {

    res.json({
        "message": "login success",
        "status": 1
    });

});

app.post('/test_User', function (req, res) {

    //插入数据
    var Test = AV.Object.extend("Test");
    var post = new Test();
    post.set("username", "test1");

    post.save(null, {
        success: function(post) {
            res.json({
                "message": "",
                "status": 1
            });
        },
        error: function(post, error) {
            res.json({
                "message": error.message,
                "status": 400
            });
        }
    });
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();