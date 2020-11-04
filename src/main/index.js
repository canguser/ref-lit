import {html, render} from "lit-html";
import Utils from "./utils";
import {Ref} from '@palerock/ref';

function renderIt(ele, htmlContent, {
    beforeRenderedActions,
    onRenderedActions
}) {
    Utils.callFunctions(beforeRenderedActions);
    render(htmlContent, ele);
    Utils.callFunctions(onRenderedActions);
}

export const defineComponent = (name, props, factor) => {
    customElements.define(
        name, class extends HTMLElement {
            static get observedAttributes() {
                return Object.keys(props);
            }

            constructor() {
                super();
                const propertyRef = new Ref(props);
                this._props = propertyRef.proxy;

                const root = this.attachShadow({mode: 'closed'});

                this.beforeRenderedActions = [];
                this.onRenderedActions = [];
                this.onUnmountedActions = [];
                this.onMountedActions = [];

                const {beforeRenderedActions, onRenderedActions, onUnmountedActions, onMountedActions} = this;

                const beforeRendered = (doing) => {
                    beforeRenderedActions.push(doing);
                };

                const onRendered = (doing) => {
                    onRenderedActions.push(doing);
                };

                const onUnmounted = (doing) => {
                    onUnmountedActions.push(doing);
                };

                const onMounted = (doing) => {
                    onMountedActions.push(doing);
                };

                const ref = new Ref();

                this.htmlContentGetter = factor({html, ref: ref.proxy, props: this._props, beforeRendered, onRendered, onUnmounted, onMounted});

                const {htmlContentGetter} = this;
                renderIt(root, htmlContentGetter(), {beforeRenderedActions, onRenderedActions});

                const doRender = () => {
                    renderIt(root, htmlContentGetter(), {beforeRenderedActions, onRenderedActions});
                };

                propertyRef.infect(Object.keys(props), doRender);

                ref.infectAll(doRender)
            }

            connectedCallback() {
                Utils.callFunctions(this.onMountedActions);
            }

            disconnectedCallback() {
                Utils.callFunctions(this.onUnmountedActions);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                this._props[name] = newValue
            }
        }
    );
};

export * from '@palerock/ref';
export * from 'lit-html';