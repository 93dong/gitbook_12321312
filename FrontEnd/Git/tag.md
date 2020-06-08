# 打标签
>   给历史中某个提交打上标签

## 查看标签
>   git show [ tag-name ]

## 列出标签
>   git tag
>   git tag -l [ tag-name ]  `列出指定tag`

## 创建标签

### 轻量标签（特定提交的引用,本质：提交校验和存储到一个文件中）
>   git tag [ tag-name ]

### 附注标签（存储在Git数据库中的一个完整对象，可以被校验。附带信息：打标签者名字，电子邮件地址，日期时间，标签信息）
>   git tag -a [ tag-name ] -m [ tag-msg ] `-m 指定了一条将会存储在标签中的信息`

### 后期打标签
>   git tag -a [ tag-name ] [ 提交的校验和 ]

## 共享标签
>   git push [ remote-name ] [ tag-name ] `单个标签推送`
>
>   git push [ remote-name ] --tags `推送所有不在远程仓库服务器上的标签`

## 检出标签
>   git checkout -b [ branch-name ] [ tag-name ] `在特定的标签上创建一个新分支`
