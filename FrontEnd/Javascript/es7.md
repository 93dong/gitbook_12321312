# ES7

## includes()

> 用于判断一个数组是否包含一个指定的值，如果包含则返回 true ，否则返回 false 。

```javascript
// includes 和 indexOf 相似
let arr = [1, 2, 3, 4, 5, 6];
let x = 2;
// 判断是否包含某值x = 2
// es7之前
arr.indexOf(x) !== -1; // true
// es7之后
arr.includes(x); // true
arr.includes(2); // true
```

## 指数操作符 `**`

> 指数运算符 `**` ,具有和 `Math.pow(..)` 等效的计算效果

```javascript
Math.pow(8, 2); // 64
8 ** 2; // 64
```
