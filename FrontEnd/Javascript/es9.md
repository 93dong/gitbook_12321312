# ES9

## 异步迭代器 & for...await...of

> `for...of` 方法能够遍历具有 `Symbol.iterator` 接口的 同步迭代器 数据。  
> `for...await...of` 方法能够遍历具有 `Symbol.asyncIteratore` 接口的 异步迭代器 数据。即当前一个成员状态改变后，才会遍历到下一个成员

```javascript
var arrayList = [1, 2, 3, 4, 5, 6, 7];
// 异步迭代器
arrayList[Symbol.asyncIterator] = function() {
  const len = this.length;
  let pointer = 0;
  return {
    next: function() {
      const done = pointer >= len;
      const value = done ? undefined : arrayList[pointer++];
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          resolve({ value, done });
        }, 1000);
      });
    }
  };
};

// 遍历异步迭代器
var traverse1 = async function(array) {
  for await (let i of array) {
    console.log(i);
  }
};
traverse1(arrayList); // 每隔1秒输出一个
// 遍历同步迭代器
var traverse2 = function(array) {
  for (let i of array) {
    console.log(i);
  }
};
traverse2(arrayList); // 一起输出
```

## 正则表达式命名捕获组

> 允许命名捕获组使用符号 `?` ，在打开捕获括号 `(` 后立即命名
> 任何匹配失败的命名组都将返回 `undefined`

```javascript
// before
const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
  match = reDate.exec("2018-04-30"),
  year = match[1], // 2018
  month = match[2], // 04
  day = match[3]; // 30

// now
const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match = reDate.exec("2018-04-30"),
  year = match.groups.year, // 2018
  month = match.groups.month, // 04
  day = match.groups.day; // 30

// 也可用于 replace
const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  d = "2018-04-30",
  usDate = d.replace(reDate, "$<month>-$<day>-$<year>"); // '04-30-2018'
```

## 正则表达式反向断言

```javascript
// 目前js 支持先行断言
// 匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中
const reLookahead = /\D(?=\d+)/,
  match = reLookahead.exec("$123.89");
console.log(match[0]); // $
```
