# 类 -类实现并实现方法
>   传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。
>   两部分：静态部分和实例部分。

## 共有，私有与受保护的修饰符

### 默认为 `public`

```typescript
    class Animal {
        public name:string;
        public move(distance:number){
            console.log(`move ${distance}`);
        }
    }
```

### 私有 `private`
-   当成员被标记为`private`时，它就不能在声明它的类外部访问。
```typescript
    class Animal {
        private name:string;
        constructor(thename:number){
            this.name = thename;
        }
    }
    new Animal('Cat').name // error  name是私有的
```
-   类型兼容：如果其中一个类型里包含一个`private`成员，那么只有当另一个类型中也存在这样一个`private`成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。`protected`也适用这个规则。
```typescript
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    animal = rhino;
    animal = employee; // 错误: Animal 与 Employee 不兼容.
```

### 被保护 `protected`
>   与`private`修饰符的行为相似，但`protected`成员在派生类中仍然可以访问

```typescript
    class Person {
        protected name: string;
        constructor(name: string) { this.name = name; }
    }

    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name); // protected属性name在派生类中还可使用
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    console.log(howard.getElevatorPitch());
    console.log(howard.name); // 错误
```

```typescript
    class Person {
        protected name: string;
        protected constructor(theName: string) { this.name = theName; } // 不能被实力话，但是可以继承
    }

    // Employee 能够继承 Person
    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```

## readonly 修饰符
-   将属性设置为只读，只读属性必须在声明时或构造函数里被初始化。
```typescript
    class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor (theName: string) {
            this.name = theName;
        }
    }
    let dad = new Octopus("Man with the 8 strong legs");
    dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

## 参数属性
-   参数属性通过给构造函数添加一个访问限定符来声明。使用`private`限定一个参数属性会声明并初始化一个私有成员；对于`public`和`protected`来说是一样的。
```typescript
    class Animal {
        constructor(private name: string) { }
        move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
```

## 存取器
-   typeScript 支持通过 getter/setter 来截取对对象成员的访问。
-   注意：只带有 get ，不带有 set 的存取器自动被推断为 readonly。

```typescript
    class Employee {
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            this._fullName = newName;
        }
    }

    let employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }
```

## 静态属性
-   存在于类本身上面而不是类的实例上，每个实例想要访问，都需使用类名访问。
```typescript
    class Grid {
        static origin = {x: 0, y: 0};
        calculateDistanceFromOrigin(point: {x: number; y: number;}) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor (public scale: number) { }
    }

    let grid1 = new Grid(1.0);  // 1x scale
    let grid2 = new Grid(5.0);  // 5x scale

    console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
    console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

## 抽象类
-   抽象类作为其他派生类的基类使用，一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。`abstract`关键字用来定义抽象类和抽象类内部定义的抽象方法。
```typescript
    abstract class Animal {
        abstract makeSound(): void;
        move(): void {
            console.log("roaming the earth...");
        }
    }
```
-   抽象类中的抽象方法不包含具体实现并且必须在派生类中实现，抽象方法的语法与接口方法相似。两者都是定义方法签名饭不包含方法体。然而，抽象方法必须包含`abstract`关键字且可以包含访问修饰符。
```typescript
    abstract class Department {

        constructor(public name: string) {
        }

        printName(): void {
            console.log('Department name: ' + this.name);
        }

        abstract printMeeting(): void; // 必须在派生类中实现
    }

    class AccountingDepartment extends Department {

        constructor() {
            super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
        }

        printMeeting(): void {
            console.log('The Accounting Department meets each Monday at 10am.');
        }

        generateReports(): void {
            console.log('Generating accounting reports...');
        }
    }

    let department: Department; // 允许创建一个对抽象类型的引用
    department = new Department(); // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    department.printName();
    department.printMeeting();
    department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

## 高级技巧
>   类定义会创建：类的实例类型和一个构造函数。

### 构造函数
-   当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的实例的类型。
```typescript
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter: Greeter;
    greeter = new Greeter("world");
    console.log(greeter.greet());

    let greeterMaker: typeof Greeter = Greeter; // typeof Greeter 意为获取Greeter类的类型，而不是实例的类型
    greeterMaker.standardGreeting = "Hey there!";
```

### 把类当作接口使用
-   因为类可以创建出类型，所以你能够在允许使用接口的地方使用类
```typescript
    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    let point3d: Point3d = {x: 1, y: 2, z: 3};
```
