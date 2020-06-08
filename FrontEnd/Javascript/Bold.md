# [Bolb](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

> 表示一个不可变的，原始数据的类文件对象。File 接口基于 Blob

```javascript
const blob1 = new Blob(["123456"]);
const blob2 = blob1.slice(1, 4);
const fileRead = new FileReader();
const blob2Content1 = fileRead.readAsBinaryString(blob2);
console.log(fileRead.result); // '2345'
const blob2Content2 = fileRead.readAsArrayBuffer(blob2); // 暂不懂可干嘛
const blob2Content3 = fileRead.readAsArrayBuffer(blob2);
console.log(fileRead.result); // 返回结果链接
```

- Blob.size（只读）：Blob 对象所包含的数据的大小

```javascript
const objectDemo = { a: 1 };
const blob3 = new Blob([JSON.stringify(objectDemo)]);
console.log(blob3.size); // 7 => {"a":1} => 7
const blob4 = new Blob([objectDemo]);
console.log(blob4.size); // 15 => [object Object] => 15
// 使用普通对象创建 Blob 时，相当于调用了普通对象的 toString()的方法得到字符串数据，然后在创建 Blob
```
