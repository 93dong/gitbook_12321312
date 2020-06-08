# HTTP 访问控制（CORS）
## [OPTIONS 预检](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
### 不触发 OPTIONS 预检
####简单请求
- 使用 GET,HEAD,POST 请求
- 设置了对CORS安全的首部字段集合标准外字段
- Accept
- Accept-Language
- Content-Language
- Content-Type
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width
- Content-Type 值设置要求以外的值
- text/plain
- multiple/form-data
- application/x-www-form-urlencoded
- 请求中的任意 XMLHttpRequest.upload 对象均没有注册任何事件监听器
- 请求中没有使用 ReadableStream 对象

使用 CORS 首部字段处理跨域权限

#### 预检请求
> 需预检的请求'要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求
#### 预检请求于重定向
>大多数浏览器不支持针对预检请求的重定向，如果预检请求发生了重定向，浏览器将报告错误
#### 附带身份凭证的请求
> 可以基于 HTTP cookies 和 HTTP 认证信息发送身份凭证。对于 XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。如果要发送 需设置 withCredentials 字段为true    
但如果 服务器响应中未携带 Access-Control-Allow-Credentials:true 浏览器将不会把响应内容返回给请求的发送者
#### 附带身份凭证的请求失败
> 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin： 。原因在于请求的首部携带了 cookie 信息，返回 '' 请求将失败
### HTTP 请求首部字段
- Origin: 表明预检请求或实际请求的源站
- Access-Control-Request-Method：将实际请求所使用的 HTTP 方法告诉服务器。
- Access-Control-Request-Headers：将实际请求所携带的首部字段告诉服务器。
