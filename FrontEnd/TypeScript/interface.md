# 接口 `interface` - 只声明成员方法，不做实现
>   TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。


## 初识
-   类型检查器会查看`fn`的调用，参数要求必需一个为`string`类型的`label`。
-   只检查必需属性是否存在，并且类型是否匹配。类型检查器不会检查属性顺序

```typescript
    let fn = (params: { label:string } ) => {
        console.log(params.label);
    }

    interface paramsLimit {
        label:string,
    }
    // paramsLimit 接口相当于名字，描述要求。
    fn = (params:paramsLimit) => {
        console.log(params.label);
    }
```

## 可选属性
-   接口属性不全是必需

```typescript
    interface paramsLimit {
        label?:string;
        title?:string;
    }
    let fn = (parasm:paramsList):{} => {
        console.log(params);
    }
    fn(); // success
    fn({ label:'2' }); // success
    fn({ label:'2', title:'1' }); // success
```

## 只读属性 `readonly`
-   对象属性只能在对象创建时修改值

```typescript
    interface ReadOnly {
        readonly title:string;
        readonly num:number;
    }
    let readonlyObject:ReadOnly = {
        title:'title',
        num:3,
    }
    readonlyObject.title = 'title2'; // error
```
-   typeScript 具有 `ReadonlyArray<T>` 类型，与 `Array<T>` 相似,只是把所有可变的方法去掉了

```typescript
    let a:number[] = [1,2,4];
    let ro:ReadonlyArray<number> = a;
    ro[0] = 1; // error
    ro.push(2); // error
    let b = ro; // success 可使用断言
    a = ro; // error
    a = ro as number[]; // success
    a = <number[]>ro; // success JSX中不可使用
```

## 额外的属性检查
-   SquareConfig 可以有任意数量的属性

```typescript
    interface SquareConfig {
        label?:string;
        title?:string;
        [propname:string]:any
    }
    let fn:void = (data:SquareConfig) => {}
    fn({color:2}) // success;
```

-   赋值给其他变量

```typescript
    let a = {colo:2,title:2}
    fn(a); // success a不需经过额外属性检查 和SquareConfig有相同属性时可用;
    let b = {colo:3}
    fn(b); // error
```

## 函数类型
-   定义调用签名：定义参数列表和返回值类型的函数定义

```typescript
   interface SearchFn {
        ( source:string, title:string ): number;
   }
   let fn:SearchFn = (source:string,title:string) => true
   // 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
   fn = ({a:string,b:string}):boolean{} // error boolean不符合number
```

## 可索引的类型
-   可索引类型需具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

```typescript
   interface StringArray {
        [ index:number ]:string;
   }
   let a:StringArray = ['1','2','3'];
   a[1]; // '2'
```

## 类类型

### 实现接口
-   接口描述了类的公共部分，而不是公共和私有两部分。它不会帮你检查类是否具有某些私有成员
```typescript
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }

    class Clock implements ClockInterface { // implements 实现的意思
        currentTime: Date = new Date();
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
```

### 类静态部分和实例部分的区别
-   类具有两个类型：静态部分的类型和实例的类型


### 继承接口
-   和类一样，接口也可以相互继承。
```typescript
    // 继承单个接口
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;

    // 继承多个接口
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
```

### 混合类型
-   先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。
-  一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
```typescript
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number): string { return '' };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
```

### 接口继承类
-   当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
```typescript
    class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() { }
    }

    class TextBox extends Control {
        select() { }
    }

    // Error: Property 'state' is missing in type 'Image'.
    class Image implements SelectableControl {
        select() { }
    }

    class Location {

    }
```

&emsp;&emsp;在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

&emsp;&emsp;在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上，SelectableControl就像Control一样，并拥有一个select方法。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。
