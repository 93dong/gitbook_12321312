# 前端跨域

> 跨域并非限制浏览器请求，而是返回结果被浏览器拦截

## JSONP

> JSON with Padding 页面上引入不同域上的 js 脚本文件是被允许。

- 回调函数：响应到来时在页面中调用的函数
- 数据：传入回调函数中的 JSON 数据

## CROS（Cross-Origin Resource Sharing）跨域资源共享

> 定义了访问跨域资源时，浏览器与服务器应该如何沟通。  
> 基本思想：使用自定义 http 头部，让服务器能声明哪些来源可以通过浏览器访问该服务器上的资源，从而决定请求或响应时应该成功还是失败。  
> CORS 本身并非绝对安全，可用 OAuth2 措施来加强保障

- Access-Control-Allow-Origin
  - \*：允许任何域接收响应
  - 指定域名：指定域可接收响应

## documemt.domain/iframe（跨子域）

> 同源策略限制不用域中的 js 数据交互

- domain：设置相同域，主域必须相同

## window.name

> 在一个窗口的生命周期内，窗口载入的所有页面都共享一个 window.name，每个页面对 window.name 都有读写的权限。window.name 是持久存在一个窗口载入过的所有页面中

## window.postMessage

> Html5 新特性 可使用向其他的 windows 对象发送消息
