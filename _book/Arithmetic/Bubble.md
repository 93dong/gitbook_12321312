# 冒泡排序（n²）

### 最普通

```javascript
// desc 最普通
let Bubble = list => {
  for (let i = list.length - 1; i > 0; i--) {
    console.log("1", i);
    for (let p = 0; p < i; p++) {
      if (list[p] > list[p + 1]) {
        [list[p], list[p + 1]] = [list[p + 1], list[p]];
      }
    }
  }
  return list;
};
```

### 添加标识-以提前结束

```javascript
// desc 添加标识-以提前结束
let Bubble2 = list => {
  for (let i = 0; i < list.length - 1; i++) {
    let isSort = true;
    for (let p = 0; p < list.length - i - 1; p++) {
      if (list[p] > list[p + 1]) {
        [list[p], list[p + 1]] = [list[p + 1], list[p]];
        isSort = false;
      }
    }
    if (isSort) {
      break;
    }
  }
  return list;
};
```

### 记忆最后一次调整位置-减少循环次数

```javascript
// desc 记忆最后一次调整位置-减少循环次数
let Bubble3 = list => {
  for (let i = 0; i < list.length - 1; i++) {
    let isSort = true;
    let sign = list.length - i - 1;
    let lastIndex = sign;
    for (let p = 0; p < sign; p++) {
      if (list[p] > list[p + 1]) {
        [list[p], list[p + 1]] = [list[p + 1], list[p]];
        isSort = false;
        lastIndex = p;
      }
    }
    sign = lastIndex;
    if (isSort) {
      break;
    }
  }
  return list;
};
```

### 正向，逆向，双向排序（适用于大部分已排序情况下

```javascript
// desc 正向，逆向，双向排序（适用于大部分已排序情况下
let Bubble4 = list => {
  for (let i = 0; i < list.length - 1; i++) {
    let isSort = true;
    for (let p = 0; p < list.length - i - 1; p++) {
      if (list[p] > list[p + 1]) {
        [list[p], list[p + 1]] = [list[p + 1], list[p]];
        isSort = false;
        lastIndex = p;
      }
    }
    if (isSort) {
      break;
    }
    isSort = true;
    for (let q = list.length - i - 1; q > i; q--) {
      if (list[q] < list[q - 1]) {
        [list[q - 1], list[q]] = [list[q], list[q - 1]];
        isSort = false;
      }
    }
    if (isSort) {
      break;
    }
  }
  return list;
};
```
