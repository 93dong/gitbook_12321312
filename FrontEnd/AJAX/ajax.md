# AJAX
- [ Asynchronous Javascript And XML - 异步 Javascript 和 XML]
- [ XMLHttpRequest 对象（核心）, JavaScript/DOM, CSS, HTML]
- 允许浏览器与服务器通信而无需刷新当前页面的技术
- JSON[JavaScript Object Notation] JavaScript对象注解
- JSON和XML被用来在AJAX模型中打包信息

----

## XMLHttpRequest(XHR)

### 构造方法
- XMLHttpRequest();
    - 构造函数初始化一个`XMLHttpRequest`对象，必须在多有其他方法被调用前调用构造函数

### 属性
- XMLHttpRequest.onreadystatechange
    - 当readyState属性变化时调用的EvevntHandler。
- XMLHttpRequest.readyState[只读]
    - 0 ：初始化状态
    - 1 ：open()方法已调用，但是send()方法未调用，请求还没有被发送
    - 2 ：send()方法被调用，Http请求方法已发送到Web服务器，未接收到响应
    - 3 ：所有响应头部都已经接收到，响应体开始接收但未完成
    - 4 ：HTTP响应已完全接收。
- XMLHttpRequest.response[只读]
    - 返回的数据类型，取决于 XMLHttpRrquest.responseType 的值，其中包含响应体 body。
- XMLHttpRequest.responseText[只读]
    -
