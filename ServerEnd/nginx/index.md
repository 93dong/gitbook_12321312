# nginx

> web 服务器

### 相较于 Apache 优点

- 轻量级
- 异步非阻塞，高并发
- 内存消耗少
- 开源

### 安装

- 使用[yum](https://baike.baidu.com/item/YUM) 遵照官网进行[安装](http://nginx.org/en/linux_packages.html#RHEL-CentOS)
  > Yum（全称为 Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 SUSE 中的 Shell 前端软件包管理器。基於 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。

```text
    sudo yum install yum-utils
```

- 设置 yum 源

```text
    [nginx-stable]
    name=nginx stable repo
    baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=1
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true

    [nginx-mainline]
    name=nginx mainline repo
    baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=0
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true
```

- 下载 nginx

```text
    yum install nginx
```

### 使用

- nginx 默认配置为 /etc/nginx/nginx.conf
- 在默认配置中 include 了 同级目录 /etc/nginx/conf.d 下所有配置.
- which server block is used for a given request.

```text
    /etc/nginx/nginx.conf

    user  nginx;
    worker_processes  1;

    error_log  /var/log/nginx/error.log warn;
    pid        /var/run/nginx.pid;


    events {
        worker_connections  1024;
    }

    http {
        include       /etc/nginx/mime.types;
        default_type  application/octet-stream;

        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';

        access_log  /var/log/nginx/access.log  main;

        sendfile        on;
        #tcp_nopush     on;

        keepalive_timeout  65;

        gzip  on;

        gzip_types text/css application/javascript;

        include /etc/nginx/conf.d/*.conf;
    }
```

```text
    /etc/nginx/conf.d/default.conf;
    server {
        listen       80; // 监听端口
        server_name  localhost; //

        #charset koi8-r;
        #access_log  /var/log/nginx/host.access.log  main;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
            #
            #location ~ \.php$ {
            #    proxy_pass   http://127.0.0.1;
            #}

            # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
            #
            #location ~ \.php$ {
            #    root           html;
            #    fastcgi_pass   127.0.0.1:9000;
            #    fastcgi_index  index.php;
            #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
            #    include        fastcgi_params;
            #}

            # deny access to .htaccess files, if Apache's document root
            # concurs with nginx's one
            #
            #location ~ /\.ht {
            #    deny  all;
            #}
    }
```

```text
    /etc/nginx/conf.d/book.conf;
    server{
            listen 8001; # 监听的端口号
            server_name localhost;
            root /home/gitbook/_book; # 文件路径
            index index.html;
    }
```

### 负载均衡

- upstream 模块

```text
  /etc/nginx/nginx.conf
  ...
  upstream backEnd { // backEnd 类似变量值，会赋值均衡后的指向
    server  xxx.xx.xx.xx:8002
    server  xxx.xx.xx.xx:8003
  }
  ...
```

```text
    本地模拟时通过不同接口模拟均衡
    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
    server {
        listen 8002;
        server_name localname;
        root xx/xxx/xx
        index index.html
    }
```
