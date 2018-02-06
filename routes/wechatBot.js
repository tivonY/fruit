var router = require('express').Router();

var AV = require('leanengine');


// 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
var wechat = require('wechat');


var config = {
  token: 'wepubliclibrarytoken',
  appid: 'wx7fe6fa67366b6214',
  encodingAESKey: 'QVNU33lSE8RNFoy0DNPAkhUBVcdBMte3Qb4FRonug3E'
};

var Token;
var myMess;

var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx7fe6fa67366b6214','be7ba261fb62f779db41c273ec3f36bd',  function (callback) {
    // 传入一个获取全局token的方法
    callback(null, Token);

}, function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    Token = JSON.stringify(token);
    callback(null, Token);
});


var Test = AV.Object.extend('Test');


router.use('/', wechat(config.token)


    .text(function(message, req, res, next) {
  // message为文本内容
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  var keyArray = ['你好', '约吗'];
  var content = message.Content;
  var keyIndex = keyArray.indexOf(content);
  switch (keyIndex) {
    case 0:
      {
        res.reply({
          type: "text",
          content: '您好，大家好才是真的好！'
        });

      }
      break;
    case 1:
      {
        res.reply({
          type: "text",
          content: '不约，不约，叔叔我们不约！'
        });

      }
      break;
    default:
      res.reply({
        type: "text",
        content: '服务器挂掉了，你的要求暂时无法满足……' + JSON.stringify(message)
      });
      break;
  }

    // wechat.scanQRCode({
    //     needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //     scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    //     success: function (res) {
    //         var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    //
    //         res.reply({
    //             type: "text",
    //             content: '' + result
    //         });
    //     }
    // });

}).image(function(message, req, res, next) {
  // message为图片内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359124971',
  // MsgType: 'image',
  // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
  // MediaId: 'media_id',
  // MsgId: '5837397301622104395' }}).voice(function(message, req, res, next) {
  // TODO
}).voice(function(message, req, res, next) {
  // message为音频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'voice',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // Format: 'amr',
  // MsgId: '5837397520665436492' }
}).video(function(message, req, res, next) {
  // message为视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'video',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
  // TODO
}).shortvideo(function(message, req, res, next) {
  // message为短视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'shortvideo',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
  // TODO
}).location(function(message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  // TODO
}).link(function(message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  // TODO
}).event(function(message, req, res, next) {

        var content = '11111';

        if(message.EventKey == "rselfmenu_0_0"){


            var userName = message.FromUserName;
            var result = message.ScanCodeInfo.ScanResult;

            content = '444 - userName-' + userName  + "result-" + result;


        }
        else if(message.EventKey == "rselfmenu_0_1"){
            var userName = message.FromUserName;
            var result = message.ScanCodeInfo.ScanResult;

            content = '333 - userName-' + userName  + "; result-" + result + ";Token" + Token;

            // api.getAccessToken(function (err, token) {
            //     console.warn(err, token);
            // });

            api.getUser({openid: userName, lang: 'en'}, function (err, result) {
                console.warn("...............");
                console.warn(err, result);
                //console.log(err, result)
            });

            console.log(content)

            res.reply({
                type: "text",
                content:  content
            });

            //var access_token = '';
            //var url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token' + access_token +'=&openid=' + userName;

        }
        else if(message.EventKey == "rselfmenu_0_2"){

            content = '222';

            var userName = message.FromUserName;
            var test = new Test();
            test.set('username', userName);
            test.save().then(function(test) {

                console.warn("rselfmenu_0_2  username=" + test.get('username'));
            },
            function (err) {
                console.warn("rselfmenu_0_2  err=" + err);
            });


        }

        // api.getAccessToken(function (err, token) {
        //     // 传入一个获取全局token的方法
        //     res.reply({
        //         type: "text",
        //         content:  content +   token
        //     });
        // });



        //content += '---api' + api.Acc;

          // res.reply({
          //     type: "text",
          //     content:  content
          // });


}).device_text(function(message, req, res, next) {
  // message为设备文本消息内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_text',
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // Content: 'd2hvc3lvdXJkYWRkeQ==',
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
  // TODO
}).device_event(function(message, req, res, next) {
  // message为设备事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_event',
  // Event: 'bind'
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
  // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
  // TODO
}).middlewarify());

module.exports = router;
