# 枚举
>   使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。

## 数字枚举
-   默认从 0 开始，可指定
```typescript
    enum Response {
        No = 0,
        Yes = 1,
    }

    function respond(recipient: string, message: Response): void {
        // ...
    }

    respond("Princess Caroline", Response.Yes)
```

## 字符串枚举
>   在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```typescript
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }
```

&emsp;&emsp;由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息（尽管反向映射会有所帮助），字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

## 异构枚举
>   不建议使用【枚举可以混合字符串和数字成员】

```typescript
    enum BooleanLikeHeterogeneousEnum {
        No = 0,
        Yes = "YES",
    }
```

## 计算的和常量成员
每个枚举成员都带有一个值，它可以是常量或计算出来的。 当满足如下条件时，枚举成员被当作是常量：
-   它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值`0`
```typescript
    enum E { X }
```
-   它不带有初始化器且它之前的枚举成员是一个数字常量。 这种情况下，当前枚举成员的值为它上一个枚举成员的值加`1`。
```typescript
    enum E1 { X, Y, Z }

    enum E2 {
        A = 1, B, C
    }
```
-   枚举成员使用常量枚举表达式初始化。 常量枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：
    1.  一个枚举表达式字面量（主要是字符串字面量或数字字面量）
    2.  一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
    3.  带括号的常量枚举表达式
    4.  一元运算符`+`, `-`, `~`其中之一应用在了常量枚举表达式
    5.  常量枚举表达式做为二元运算符`+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^`的操作对象。

若常量枚举表达式求值后为NaN或Infinity，则会在编译阶段报错。

```typescript
    enum FileAccess {
        // constant members
        None,
        Read    = 1 << 1,
        Write   = 1 << 2,
        ReadWrite  = Read | Write,
        // computed member
        G = "123".length
    }
```

## 联合枚举类型与枚举成员的类型
存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为
-   任何字符串字面量（例如："foo"，"bar"，"baz"）
-   任何数字字面量（例如：1, 100）
-   应用了一元-符号的数字字面量（例如：-1, -100）
当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义。

首先，枚举成员成为了类型！

```typescript
    enum ShapeKind {
        Circle,
        Square,
    }

    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }

    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }

    let c: Circle = {
        kind: ShapeKind.Square,
        //    ~~~~~~~~~~~~~~~~ Error!
        radius: 100,
    }
```
另一个变化是枚举类型本身变成了每个枚举成员的联合。 虽然我们还没有讨论联合类型，但你只要知道通过联合枚举，类型系统能够利用这样一个事实，它可以知道枚举里的值的集合。 因此，TypeScript能够捕获在比较值的时候犯的愚蠢的错误。 例如：

```typescript
    enum E {
        Foo,
        Bar,
    }

    function f(x: E) {
        if (x !== E.Foo || x !== E.Bar) {
            //             ~~~~~~~~~~~
            // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
        }
    }
```

### 运行时的枚举
>   枚举是在运行时真正存在的对象

```typescript
    enum E {
        X, Y, Z
    }

    function f(obj: { X: number }) {
        return obj.X;
    }

    // Works, since 'E' has a property named 'X' which is a number.
    f(E);
```

#### 反向映射
除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了反向映射，从枚举值到枚举名字。[不会为字符串枚举成员生成反向映射]

```typescript
    enum Enum {
        A
    }
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"

    // 转换js
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
    })(Enum || (Enum = {}));
    var a = Enum.A;
    var nameOfA = Enum[a]; // "A"
```

#### const 枚举
常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
```typescript
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

    // 生成代码
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## 外部枚举
外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常量成员。 对于非常量的外部枚举而言，没有初始化方法时被当做需要经过计算的。
```typescript
    declare enum Enum {
        A = 1,
        B,
        C = 2
    }
```

