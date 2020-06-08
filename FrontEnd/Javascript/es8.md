# ES8

## async/await

> 异步函数,返回 Promise

```javascript
// 不使用 async/await
let login = function() {
  $.ajax({
    url: "xxx"
  }).then(() => {
    getUserInfo();
  });
};
let getUserInfo = function() {
  // 获取用户信息
};

login(); // 实现功能：登录后获取用户信息

// 使用 async/await
let asyncLogin = async function() {
  await $.ajax(); // 登录；
  $.ajax(); // 获取用户信息；
};
```

## Object.values

> 返回 Object 自身属性的所有值，不包括继承的值

```javascript
let object1 = {
  name: "object1",
  desc: "美丽的Object"
};

let object2 = Object.create(object1);
object2.aliasName = "帅气的object2";
console.log(object2.name); // 'object1' 继承的值
console.log(object2.desc); // '美丽的Object' 继承的值
console.log(object2.aliasName); // '帅气的object2'
Object.values(object2); // ['帅气的object2']
```

## Object.entries

> 返回指定对象自身可枚举属性的键值对的数组

```javascript
let object3 = {
  value: "调皮的object3"
};
Object.definedProperty(object3, "name", {
  value: "object3", // 属性对应的值，默认为undefined
  writable: false, // 为true时才能被赋值运算符改变，默认为false
  enumerable: false, // 为true时，此属性才会出现在枚举属性中，默认false
  configurable: true // 为true时，该属性描述符才能够改变，同时该属性也能从对应的对象上被删掉，默认false
});
let dealData = Object.entries(object3);
console.log(dealData); // [['value','调皮的object3']]
console.log(object3.name); // 'object3'
```

## String.prototype.padStart

> 用另一个字符串填充当前字符串（重复，如果需要），以便产生的字符串达到给定的长度，填充从当前字符串的左侧开始。

```javascript
"abc".padStart(10, "333"); // '3333333abc'
"abc".padStart(10); // '       abc'
"abc".padStart(10, "efaghsgdtrifbdk"); // 'efaghsgabc'
```

## String.prototype.padEnd

> 用另一个字符串填充当前字符串（重复，如果需要），以便产生的字符串达到给定的长度，填充从当前字符串的右侧开始。

```javascript
"abc".padEnd(10, "333"); // 'abc3333333'
"abc".padEnd(10); // 'abc       '
"abc".padEnd(10, "efaghsgdtrifbdk"); // 'abcefaghsg'
```

## Object.getOwnPropertyDesciptors

> 方法返回指定对象上一个自有属性对应的属性描述符

```javascript
let object4 = {
  name: "object4"
};
Object.getOwnPropertyDescriptor(object4, "name");
// {
//   value:'object4',
//   configurable:true,
//   writable:true,
//   enumerable:true,
// }
```

## 函数参数列表允许结尾处逗号

```javascript
let fn = function(a, b) {};
```
