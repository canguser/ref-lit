# Ref-Lit JS
> Lightweight progressive JavaScript rendering framework

> 当前是英文文档，中文文档请点击这里切换：[中文文档地址](./readme-zh_CN.md)

## Features
- Based on [ref.js](https://github.com/canguser/ref) & [lit-html.js](https://github.com/Polymer/lit-html)
- Using [Web Component API](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- Lightweight ([mini-source](https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js) less than 20k)
- Faster & Simply

## Example
**[Live Demo](https://jsfiddle.net/cangshi/sku8rtm2/1/)**
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
        {
            value: '',
            type: 'text',
            placeholder: 'please input...'
        },
        ({props, component}) => {

            function onInputChanged(e) {
                component.dispatchEvent(new CustomEvent('cvalue', {
                    detail: {value: e.target.value}
                }));
            }

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

## Import Ref-Lit JS
- If using `npm` or `yarn`
    ```shell script
    # npm
    npm i @palerock/ref-lit
    ```
    ```shell script
    # yarn
    yarn add @palerock/ref-lit
    ```
- Using `<script src>` on browser
    ```html
    <script src="xxx/ref-lit.mini.js"></script>
    <script>
        const {defineComponent, html} = window.$ref_lit;
    </script>
    ```
- Using `Module` on browser
    ```html
    <script type="module">
        import 'xxx/ref-lit.mini.js';
        const {defineComponent, html} = window.$ref_lit;
    </script>
    ```

> How to get the ref-js sources?
View the root dir named [`build`](https://github.com/canguser/ref-lit/tree/master/build), mini-js or normal chose by yourself.
Or using following url to import or download：
[https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js](https://unpkg.com/@palerock/ref-lit/build/ref-lit.mini.js)
[https://unpkg.com/@palerock/ref-lit/build/ref-lit.js](https://unpkg.com/@palerock/ref-lit/build/ref-lit.js)

## API Documentation
> Now, the documentation is writing.
You can take a quick look at the src [`./src/demo`](https://github.com/canguser/ref-lit/tree/master/src/demo) for demos, it's easy to reach it.
