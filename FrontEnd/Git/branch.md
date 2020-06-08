# 分支(本质：指向提交对象的可变指针)
- git commit 提交时，Git会先计算每一个子目录的校验和，然后在Git仓库中这些校验和保存为树对象，随后创建一个提交对象（包含指向这个树对象的指针）。Git可以在需要的时候重现保存的快照。
- Git 仓库有五个对象：三个 blob 对象（保存者文件快照片），一个树对象（记录着目录结构和 blob 对象索引），以及一个提交对象（包含着指向前述树对象的指针和所有提交信息）。


## 分支创建
>   - git branch [ branch-name ] 创建分支，但未切换到新创建的分支
>   - git branch [ branch-name ] -b  创建分支，并切换到新创建的分支

1. 在当前所在的提交对象上创建一个指针
2. 创建一个新分支，但不会自动切换到新分支去。即 HEAD 指针指向当前所在分支，并未指向新创建的分支
3. 特殊指针`HEAD`指向房前所在的本地分支

## 分支切换
>   git checkout [ branch-name ] `HEAD`指针指向 branch-name 分支

## 分支删除
>   git branch -d [ branch-name ]

## 分支合并
>   git merge [ branch-name(source) ]
- 如若有冲突时，Git会尝试自动合并，合并不成功时，需手动合并，合并完成之后使用 `git add` 将冲突文件状态变更为已解决，之后可 `git commit` 提交合并结果

## 删除远程分支
>   git push [ remote-name ] --delete [ branch-name ]

## 变基
- rebase 命令将提交到某一个分支的所有数据都移至另一个分支上
>   git rebase [ rebase-target-branch-name ] [ source-branch-name ]  source-branch-name变基在rebase-target-branch-name分支上，使得rebase-target-branch-name分支提交记录直接前进

## 命令
- git branch 查看分支列表
- git branch -v 查看每个分支最后一次提交
- git branch -vv 查看所有跟踪分支
- git branch -b [ branch-name ] [ remote-branch-name ] 新建分支并设置远程跟踪分支
- git branch -u [ remote-branch-name] 修改远程跟踪分支
- git branch --merge 查看哪些分支已经合并到当前分支
- git branch --no-merge 查看哪些分支未合并到当前分支
- git branch -d [ branch-name ] 删除分支
- git branch -D [ branch-name ] 强制删除分支
- git fetch 从服务器上抓取本地没有的数据，不会修改工作目录中的内容，只会获取数据让你合并。
- git pull = git fetch + git merge

