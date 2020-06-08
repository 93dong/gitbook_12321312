# connect
- 将 React 组件连接到 Redux 存储。
- 它为连接组件提供了存储中所需的数据片段。
- 不修改连接组件，而是返回一个新的已连接的组件

## 方法参数

### mapStateToProps?: (state, ownProps?) => Object
> 组件将会监听 Redux store 的变化,任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。如果你省略了这个参数，你的组件将不会监听 Redux store

- state:redux 提供的状态数据
- ownProps:为组件提供的props
- 参数
    - 仅使用state参数
        - 仅state变化 会调用此函数
    - 同时使用state，ownProps参数
        - state 和 ownProps 只要有一个变化，都会调用 mapStateToProps 函数。ownProps值为传递到组件的 props。
- 返回数据 Object
    - 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
  
### mapDispatchToProps?: (dispatch,ownProps?) => Object | Object
> 如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。

- 参数
    - Function
        - 该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
        - 如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
    - Object
        - 每个定义在该对象的函数都将被当作 Redux action creator,对象所定义的方法名将作为属性名;


```javascript
    import connect from 'XXX/';
    const actionFn = ()=>{
        return {
            type:'ACTION_1',
            text:'此action纯属虚构，如有雷同，嗯，那就是凑巧了。',
        };
    };
    const mapDispatchToProps = { callAction:actionFn };
    const mapStateToProps = ()=>({});
    const A = (props) =>{
        return  (
            <div
               onClick={()=>{
                   props.callAction();
               }}
            >
               ...
            </div>
        )
    };
    connect(mapStateToProps,mapDispatchToProps)(A);
```

### mergeProps?: (stateProps,dispatchProps,ownProps) => 
> 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。

### options?: Object
- context:object : 供React-Redux使用的自定义上下文
- pure:boolean : connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true.
- areStatesEqual?:Function & areOwnPropsEqual?: Function & areStatePropsEqual?: Function & areMergedPropsEqual?: Function 
    - 当prue为true时，将传入的state与其之前的值进行比较，指定具体比对值，如果没有改变，connect()会避免重新渲染以及对mapStateToProps、mapDispatchToProps和mergeProps的调用。
- forwardRef:boolean :如果指定为true，则像connect包装后的组件添加ref，实际返回被包装组件的实例。

# connectAdvanced
> 是一个将 React 组件连接到 Redux store 的函数

- 这个函数是 connect() 的基础，但是对于如何把state, props, 和 dispatch 组合到最后的 props 中,则不做定义，完全由调用者操作
- 不修改连接组件，而是返回一个新的已连接的组件
