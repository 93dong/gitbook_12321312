# 基础类型

## 布尔值 `boolean`

```typescript
    let isTrue: boolean = false;
```

## 数字 `number`

```typescript
    let isNumber: number = 1; // 支持十进制，十六进制，二进制，八进制。
```

## 字符串 `string`

```typescript
    let isString: string = "string"; // 可使用模版字符串`${}`
    isString = "string2";
```

## 数组 `Array` `[]`

```typescript
    let isArray: number[] = [1,2,4]; // 元素类型后加[]，表示有此类型元素组成的一个数组
    let isArray2: Array<number> = [1,2,4]; // 数组范型：Array<元素类型>
```

## 元组 Tuple
-   元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```typescript
    let tuple1:[string, number];
    tuple1 = ['tuple',1]; // success
    tuple1 = [1,'tuple']; // error
```
-   访问已知索引的元素
```typescript
    tuple1[0].substr(1) // success
    tuple1[1].substr(1) // error number类型没有substr方法
```
-   访问越界元素，会使用联合类型替代
```typescript
    tuple1[2] = 'tuple1'; // success 越界元素类型可以为string或number( string | number )
    tuple1[2] = []; // error []类型不是（ string | number ）
```

## 枚举 `enum`
-   `enum` 类型是对 JavaScript 标准数据类型的一个补充。
-   默认从0开始为元素编号，也可以手动指定
-   提供便利可以由枚举的值得到名字。
```typescript
    // 默认编号
    enum Color { Red, Green, Blue }
    let c: Color = Color.Green; // 1
    // 指定起始编号
    enum Color1 { Red = 1, Green, Blue }
    let c1: Color1 = Color.Green; // 2
    // 指定全部编号
    enum Color2 { Red = 1, Green = 3, Blue = 4 }
    let c2: Color1 = Color.Green; // 3
    // 查找相应值的名字
    enum Color2 { Red = 1, Green = 3, Blue = 4 }
    let colorName: string = Color[3]; // 'Green'
```

## 任意值 `any`
-   为不清楚类型的变量指定一个类型，直接通过编译阶段的检查。并可以调取方法使用。
```typescript
    let noType:any = 'any';
    noType  = []; // success
    noType  = false; // success
    noType  = 1; // success
    noType.toFixd(2) // success
```

## 空值 `viod`
-   表示没有任何类型。常见于函数没有返回值
-   只能赋值 undefined 和 null。
```typescript
    let noReturnFn:void = () => {
        console.log('noReturn');
    }
    // 声明void类型变量
    let voidData:void = undefined; // success
    let voidData:void = null; // success
    let voidData:void = 1; // error
```

## Null `null`，Undefined `undefined`
-   默认情况下 null 和 undefined 是所有类型的子类型，可以赋值给任意类型
-   当指定 --strictNullChekcs 标记，null 和 undefined 只能赋值给 void 和它们各自

## Never `never`
-   表示那些永不存在的值的类型。是任何类型的子类型，也可以赋值给任何类型。
-   没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。即使 any 也不可以赋值给 never。
```typescript
    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {
        }
    }
```

## Object `object`
-   表示非原始类型：除了 number，string，boolean，symbol，null，undefined 之外的类型
-   object 类型的变量只允许给他赋值任意值，但只能在它上面调用Object的方法。
```typescript
    let c:object = [];
    c.toString(); // success toString是Object的方法
    c.split('_'); // error split不是Object的方法 会报错 c.split is not a function
```

## 类型断言
-   只在编译阶段起作用，告诉编译器类型值
```typescript
    let someValue:any = "this is a any type";
    // TypeScript中使用JSX时，不被允许
    let valueLength:number = (<string>someValue).length; // success
    // TypeScript中使用JSX时，仅有 as 语法断言是被允许的
    let valueLength:number = (someValue as string).length; // success
```
