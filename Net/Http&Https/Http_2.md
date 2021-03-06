# HTTP/2

## HTTP/1.1 存在的问题
- TCP 连接数限制
- 同一个域名下，浏览器最多能同时创建6～8个 TCP 连接。
- 线头阻塞问题
- 每个 TCP 连接同时只能处理一个请求-响应，浏览器按 FIFO 原则处理请求，上一个响应没返回会阻塞后续请求，为解决出现了 管线化
- Header 内容太多，没有相应的压缩传输优化文案
- 为减少请求，合并文件，导致单个请求变大延迟变高，且内嵌资源不能使用缓存机制
- 明文传输不安全

## HTTP/2 的优势
- 二进制分桢层
    - 桢是数据传输的最小单位，以二进制传输代替原本的明文传输，原本数据被划分为更小的数据帧。
- 多路复用
    - 在一个 TCP 连接上，可以不断向对方发送桢，每桢的 strem identifier 标明这一桢属于哪个流，结束时，根据 stream identifier 拼接每个流的所有桢组成一整块数据。（解决线头阻塞，TCP 连接数量和 TCP 连接慢）HTTP2 对于同一域名只需要创建一个连接
- 服务端推送（Sever Push）
    - 主要针对资源内联作出优化
        - 客户端可以缓存推送的资源
        - 客户端可以拒收推送过来的资源
        - 推送资源可以由不同页面共享
        - 服务器可以按照优先级推送资源
- Header 压缩
    - 使用 HPACK 算法压缩首部内容
- 应用层的重置连接
    - HTTP/1 是通过 tcp segment 里的 reset flag 来通知对端关闭连接的。会直接断掉，下次再发请求必须重新建立连接。
    - HTTP/2 引入了 RST_STREAM 类型的 frame 可以在不断开连接的前提下取消某个 request 的
stream。
- 请求优先级设置
    - HTTP/2 里的每个 stream 都可以设置依赖和权重，可以按依赖树分配优先级，解决了关键请求被阻塞的问题
    - HTTP/1 的几种优化可以弃用
    - 合并文件
    - 内联资源
    - 雪碧图
    - 域名分片
