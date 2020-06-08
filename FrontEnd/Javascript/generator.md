# 生成器 Generator & 异步生成器

## 生成器

> 生成器对象是一个由 generator function 返回的，并且它符合可迭代协议和迭代器协议
> 生成器函数在执行时能暂时暂停，后面从暂停处继续执行

### Generator.prototype.next()

> 返回一个由 yield 表达式生成的值

### Generator.prototype.return()

> 返回给定的值并结束生成器

### Generator.prototype.throw()

> 向生成器抛出一个错误

### function\*

> 定义一个生成器函数，返回一个 Generator 对象

## 异步生成器

> 异步生成器和普通的生成器很像，但是其是 async 函数，内部可以使用 await 表达式，并且它返回一个具有 Symbol.asyncIterator 方法的对象。
