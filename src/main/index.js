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

export const setup = (ele, func) => {

    const beforeRenderedActions = [];
    const onRenderedActions = [];

    const beforeRendered = (doing) => {
        beforeRenderedActions.push(doing);
    };

    const onRendered = (doing) => {
        onRenderedActions.push(doing);
    };

    const ref = new Ref();

    const htmlContentGetter = func({html, ref: ref.proxy, beforeRendered, onRendered});

    renderIt(ele, htmlContentGetter(), {beforeRenderedActions, onRenderedActions});

    ref.infectAll(
        () => {
            renderIt(ele, htmlContentGetter(), {beforeRenderedActions, onRenderedActions});
        }
    )

};

export * from '@palerock/ref';