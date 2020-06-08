# Git Hooks
> Git 能在特定的重要动作发生时触发自定义脚本。钩子存储在 Git目录下的hooks子目录中。也是大部分项目中的 .git/hooks。把一个正确命名且可执行的文件放入 Git 目录下的 hooks 子目录中，即可激活该钩子脚本。

## 客户端hooks
> 克隆某个版本库时，它的客户端钩子 并不 随同复制。 如果需要靠这些脚本来强制维持某种策略，建议你在服务器端实现这一功能。

### 提交工作流钩子

#### pre-commit
> 在键入提交信息前运行，用以检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，不过可以使用 git commit --no-verify 来绕过检查

```bash
#!/bin/bash

# 如果在commit时有未添加到暂存区的文件，拒绝提交
diff=$(git diff)
if [[ $diff !=0 ]];then
  echo "some files is changed but not add to stash, git commit denied"
  exit 1
fi

# 读取git暂存区的.js 和 .vue文件
files=$(git diff --cached --name-only | grep -E '\.js$|\.vue$')

# 在控制台打印文件列表
echo $files
# Prevent ESLint help message if no files matched

# 如果文件列表为空，退出执行环境，继续执行commit操作
if [[ $files = "" ]] ; then
    exit 0
fi

failed=0

# 循环文件列表
for file in ${files}; do
    # 判断文件是否存在(-e 表示 exists)
    if [ ! -e $file ] ; then
        continue
    fi
    
    # 在控制台打印该文件的eslint检验结果，如果通过，则返回空
    git show :$file | ./node_modules/.bin/eslint $file --color --fix
    
    # 文件未通过eslint检验，标记为失败
    if [[ $? != 0 ]] ; then
        failed=1
    fi
done;

# 有文件未通过检验，退出执行环境，中断commit操作
if [[ $failed != 0 ]] ; then
    echo "❌  ESLint failed, git commit denied"
    exit $failed
fi
# 通过测试发现，如果通过 yarn add 的方式安装 eslint , babel-eslint 的话，这句代码将会报错:
# git show :$file | ./node_modules/.bin/eslint $file --color --fix
# 只用用npm重新安装上面提到的一些包，才能在 ./node_modules/.bin 目录下找到eslint
```

#### prepare-commit-msg
> 在启动提交信息编辑器之前，默认信息被创建之后运行。允许编辑提交者所看到的默认信息，该钩子接收一些选项：存有当前提交信息的文件路径，提交类型和修补提交的提交的 SHA-1 校验。对哪些会自动产生默认信息的提交，可以结合模版来使用，动态插入信息。

#### commit-msg
> 钩子接收一个参数，即存有当前提交信息的临时文件的路径。如果钩子以非零值退出，Git 将放弃提交，可以用来在提交通过前校验项目状态或提交信息。

#### post-commit
> 钩子在整个提交过程完成后运行，不接收任何参数，但可以通过运行 git log -1 HEAD 来获得最后一次的提交信息，该钩子一般用于通知之类的事情。

### 电子邮件工作流钩子
> 钩子均由 git am 命令调用。

#### applypacth-msg
> 接收单个参数：包含请求合并信息的临时文件的名字。如果脚本返回非零值，Git 将放弃该补丁。可以用该脚本来确保提交信息符合格式，或直接用脚本修正格式错误。

#### pre-applypatch
> 运行于应用补丁之后，产生提交之前，可以用于在提交前检查快照，运行检测或检查工作区，如果未通过，脚本会以非零值退出，中断 git am 的运行，这样补丁就不会被提交。

#### post-applypatch
> 运行于提交产生之后，是在 git am 运行期间最后被调用的钩子，可以用于结果通知，但没办法用它停止打补丁的过程。

### 其他钩子

#### pre-rebase
> 钩子运行于变基之前，以非零值退出可以中止变基的过程。 可以用来禁止对已经推送的提交变基

#### post-rewrite
> 钩子被那些会替换提交记录的命令调用，比如 git commit --amend 和 git rebase（不过不包括 git filter-branch）。 唯一的参数是触发重写的命令名，同时从标准输入中接受一系列重写的提交记录。 这个钩子的用途很大程度上跟 post-checkout 和 post-merge 差不多

#### post-checkout
> 在 git checkout 成功运行后，post-checkout 钩子会被调用,可以用它调整工作目录。 其中包括放入大的二进制文件、自动生成文档或进行其他类似这样的操作。

#### post-merge
> 在 git merge 成功运行后，post-merge 钩子会被调用。 你可以用它恢复 Git 无法跟踪的工作区数据，比如权限数据。 这个钩子也可以用来验证某些在 Git 控制之外的文件是否存在，这样你就能在工作区改变时，把这些文件复制进来。

#### pre-push
> pre-push 钩子会在 git push 运行期间， 更新了远程引用但尚未传送对象时被调用。 它接受远程分支的名字和位置作为参数，同时从标准输入中读取一系列待更新的引用。 你可以在推送开始之前，用它验证对引用的更新操作（一个非零的退出码将终止推送过程）。

#### pre-auto-gc
> Git 的一些日常操作在运行时，偶尔会调用 git gc --auto 进行垃圾回收。 pre-auto-gc 钩子会在垃圾回收开始之前被调用，可以用它来提醒你现在要回收垃圾了，或者依情形判断是否要中断回收。

## 服务器端hooks
>  这些钩子脚本在推送到服务器之前和之后运行。 推送到服务器前运行的钩子可以在任何时候以非零值退出，拒绝推送并给客户端返回错误消息

#### pre-receive
> 最先被调用的脚本。它从标准输入获取一系列被推送的引用。如果它以非零值退出，所有的推送内容都不会被接受。 你可以用这个钩子阻止对引用进行非快进（non-fast-forward）的更新，或者对该推送所修改的所有引用和文件进行访问控制。

#### update
> 会为每一个准备更新的分支各运行一次。假如推送者同时向多个分支推送内容，pre-receive 只运行一次，相比之下 update 则会为每一个被推送的分支各运行一次。 它不会从标准输入读取内容，而是接受三个参数：引用的名字（分支），推送前的引用指向的内容的 SHA-1 值，以及用户准备推送的内容的 SHA-1 值。 如果 update 脚本以非零值退出，只有相应的那一个引用会被拒绝；其余的依然会被更新。

#### post-receive
> 在整个过程完结以后运行，可以用来更新其他系统服务或者通知用户.它接受与 pre-receive 相同的标准输入数据。 它的用途包括给某个邮件列表发信，通知持续集成（continous integration）的服务器，或者更新问题追踪系统
