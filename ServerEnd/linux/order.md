## 命令记录

### nohup XXXXX &

- nohup node node.js & 
    - nohup: 忽略输入并把输出追加到"nohup.out" => 提示：后台执行程序的输出都被重定向到nohup.out文件
- nohup node node.js >/dev/null & 
    - nohup: 忽略输入重定向错误到标准输出端 =>Linux下还有一个特殊的文件/dev/null，它就像一个无底洞，所有重定向到它的信息都会消失得无影无踪
- nohup node node.js  >/dev/null 2>&1 &
    - 2>&1 将错误信息重定向到标准输出
- 如果希望服务始终运行，则需使用任意命令回到初始页，并通过exit退出。
