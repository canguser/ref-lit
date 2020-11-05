# Ref-Lit JS
> 轻量级的 JavaScript 渐进式渲染框架

## 特征
- 基于 [ref.js](https://github.com/canguser/ref) 和 [lit-html.js](https://github.com/Polymer/lit-html)
- 使用了 [Web Component API](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- 轻量级 ([mini-source](https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js) 大小低于 20k)
- 快速 & 简单

## 示例
**[在线 Demo](https://jsfiddle.net/cangshi/sku8rtm2/1/)**
```html
<!-- html -->
<my-component></my-component>
```
```javascript
// javascript
<script type="module">
    import 'https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js';

    const {defineComponent, html} = window.$ref_lit;

    defineComponent('custom-input',
        // 声明组件参数
        {
            value: '',
            type: 'text',
            placeholder: 'please input...'
        },
        ({props, component}) => {
            // 组件内容区域
            function onInputChanged(e) {
                component.dispatchEvent(new CustomEvent('cvalue', {
                    detail: {value: e.target.value}
                }));
            }
            // html 方法的使用参见 lit-html.js
            return () => html`
                <input value=${props.value} type=${props.type} placeholder=${props.placeholder} @keyup=${onInputChanged} >
            `
        }
    );

    defineComponent('my-component', {}, ({ref}) => {

        function onValueChanged(e) {
            ref.value = e.detail.value;
        }

        return () => html`
            <div>
                <p>${ref.value}</p>
                <custom-input value=${ref.value} @cvalue=${onValueChanged}></custom-input>
            </div>
        `
    });
</script>
```

## 引入 Ref-Lit JS
- 如果使用 `npm` 或者 `yarn`
    ```shell script
    # npm
    npm i @palerock/ref-lit
    ```
    ```shell script
    # yarn
    yarn add @palerock/ref-lit
    ```
- 通过浏览器 `HTML` 代码中的 `<script src>` 引入
    ```html
    <script src="xxx/ref-lit.mini.js"></script>
    <script>
        const {defineComponent, html} = window.$ref_lit;
    </script>
    ```
- 通过浏览器 `HTML` 代码模块化引入
    ```html
    <script type="module">
        import 'xxx/ref-lit.mini.js';
        const {defineComponent, html} = window.$ref_lit;
    </script>
    ```

> 怎样获取 `ref-lit` 的资源文件?
查看源码中 [`build`](https://github.com/canguser/ref-lit/tree/master/build) 目录, 你可以自行选择下载是否压缩过的资源文件.
或者通过以下链接引入/下载：
[https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js](https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js)
[https://unpkg.com/@palerock/ref-lit/build/ref-lit.js](https://unpkg.com/@palerock/ref-lit/build/ref-lit.js)

## API 文档
> 目前，文档正在积极撰写中。
你可以在源码的目录 [`./src/demo`](https://github.com/canguser/ref-lit/tree/master/src/demo) 获取到一些例子，通过它们可以很快学会如果使用.

## 相关地址
- English Documentation URL：[./readme.md](./readme.md)
