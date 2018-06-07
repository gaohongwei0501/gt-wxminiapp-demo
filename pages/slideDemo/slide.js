var plug = requirePlugin('myPlugin')
Page({
  data: {
      changeStatus:'',
      result: {}
  },
  onLoad: function() {

    var that = this;
    wx.request({
      url: 'https://geetest.com/demo/gt/register-slide?t='+ new Date().getTime(),
      method: 'GET',
      dataType: 'json',
      success: function (res) {   
        that.setData({ loadCaptcha:true,gt: res.data.gt, challenge: res.data.challenge, offline: !res.data.success })
      },
      fail: function () {
        console.log('error')
      }
    })
  },
  onReady: function(){
   
  },
  btnSubmit: function(){
    var that = this;
    var data = that.data.result;
    if(typeof data !== 'object'){
      console.log("请先完成验证！")
      return 
    }
    wx.request({
      url: 'https://geetest.com/demo/gt/validate-slide?t=' + new Date().getTime(),
      method: 'POST',
      dataType: 'json',
      data: {
        geetest_challenge: data.geetest_challenge,
        geetest_validate: data.geetest_validate,
        geetest_seccode: data.geetest_seccode
      },
      success: function (res) {
        wx.showToast({
          title: res.data.status
        })
      },
      fail: function () {
        console.log('error')
      }
    })
  },
  captchaSuccess:function(result){
    console.log("captcha-Success!");
    this.setData({
          result: result.detail
    })
  },
  captchaReady:function(){
    console.log("captcha-Ready!");
  },
  captchaClose:function(){
    console.log("captcha-Close!");
  },
  captchaError: function () {
    console.log("captcha-Error!");
  }
})