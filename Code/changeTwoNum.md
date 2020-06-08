# 交换两个数的值
```javascript
    let middleVal;
    middleVal = a;
    a = b;
    b = middleVal;
```
```javascript
    a += b;
    b = a-b;
    a -= b;
    
    a -= b;
    b = a + b;
    a = b - a;
```
```javascript
    a ^= b;
    b ^= a;
    a ^= b;
    
    a = ( b ^= a ^= b )^a
```
```javascript
    let object = {
        a:b,
        b:a,
    };
    a = object.a;
    b = object.b;
```
```javascript
    a = [ b, b = a ][0]
```
```javascript
    [a,b] = [b,a];
```
