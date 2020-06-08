# 远程仓库

## 添加远程仓库
>   git remote add < shortname > < url >

## 从远程仓库中抓取与拉取
>   git fetch [remote-name]

- git fetch 拉取数据到本地仓库，不会自动合并或修改当前分支。
- git pull 会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支
- git clone 命令会自动设置本地master分支跟踪克隆的远程仓库的 master 分支。

## 推送到远程分支
> git push [ remote-name ] [ branch-name ]

## 查看远程分支
>   git remote show [ remote-name ]

## 远程仓库的移除与重命名
>   git remote rename [ old-remote-name ] [ new-remote-name ]
>   git remote rm [ remote-name ]
