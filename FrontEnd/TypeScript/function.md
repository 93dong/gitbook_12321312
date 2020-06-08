# 函数
>   TypeScript函数可以创建有名字的函数和匿名函数。

## 函数类型

### 为函数定义类型
```typescript
    function add(x:number,y:number):number {
        return x+y;
    }

    let myAdd = function(x:number,y:number):number {
        return x+y;
    }
```

### 书写完整函数类型
```typescript
    // 函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。
    let myAdd:{x:number,y:number} => number =
        function(x:number,y:number):number { return x+y; }；
    // 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性。
    let myAdd: (baseValue: number, increment: number) => number =
        function(x: number, y: number): number { return x + y; };
```

### 推断类型
-   在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：
```typescript
    // myAdd has the full function type
    let myAdd = function(x: number, y: number): number { return x + y; };

    // The parameters `x` and `y` have the type number
    let myAdd: (baseValue: number, increment: number) => number =
        function(x, y) { return x + y; };
```

## 可选参数和默认参数
-   TypeScript里的每个函数参数都是必须的
```typescript
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // error, 参数缺失
    let result2 = buildName("Bob", "Adams", "Sr.");  // error, 参数溢出
    let result3 = buildName("Bob", "Adams");         // success 参数符合
```
-   可选参数功能（参数名旁使用?）可选参数必须跟在必须参数后面
```typescript
    function buildName(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    let result1 = buildName("Bob");  // success
    let result2 = buildName("Bob", "Adams", "Sr.");  // error, 参数溢出
    let result3 = buildName("Bob", "Adams");  // ah, 参数符合
```
-   默认值 同ES6
```typescript
    function buildName(firstName: string, lastName:string = "Smith") {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // success "Bob Smith"
    let result2 = buildName("Bob", undefined);       // success "Bob Smith"
    let result3 = buildName("Bob", "Adams", "Sr.");  // error, 参数溢出
    let result4 = buildName("Bob", "Adams");         // success "Bob Smith"
```

## 剩余参数
-   在JavaScript里，你可以使用arguments来访问所有传入的参数。在TypeScript里，你可以把所有参数收集到一个变量里
```typescript
    function buildName(firstName: string, ...restOfName: string[]) {
      return firstName + " " + restOfName.join(" ");
    }

    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

