# 泛型
>   是一种特殊的变量，只用于标识类型而不是值

## 泛型函数
```typescript
    function identity<T>(arg: T): T {
        return arg;
    }
    // 使用
    let output = identity<string>("myString");
    let output = identity("myString");  // 利用类型推论-确定 T 类型
```

## 使用泛型变量
>   编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。

```typescript
    function loggingIdentity<T>(arg: T): T {
        console.log(arg.length);  // Error: T 没有 .length 属性
        return arg;
    }
```

```typescript
    function loggingIdentity<T>(arg: T[]): T[] { // T类型的数组
            console.log(arg.length);  // 数组有 .length 属性
            return arg;
        }
```



## 泛型类型
-   泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面（<T>），像函数声明一样：
```typescript
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <T>(arg: T) => T = identity;
```
-   我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
```typescript
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <U>(arg: U) => U = identity;
```
-   我们还可以使用带有调用签名的对象字面量来定义泛型函数
```typescript
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: {<T>(arg: T): T} = identity;
```
-   泛型接口
```typescript
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn = identity;
```
-   把泛型参数当作整个接口的一个参数
```typescript
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn<number> = identity;
```

## 泛型类
>   泛型类使用（<>）括起泛型类型，跟在类名后面。【泛型类指的是实例部分的类型，所以类的静态属性不能使用泛型类型】

```typescript
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型约束
```typescript
    interface Lengthwise {
        length: number;
    }
    // 限制泛型数据必需含有 .length 属性
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }
```

### 在泛型约束中使用类型的参数
```typescript
    // 约束获取对象时，key 值必需存在于对象上
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    getProperty(x, "m"); // error: x 没有 'm' 的 key
```

### 在泛型里使用类类型
>   待补充

