export default class Utils {
    static callFunctions(funcList = [], {
        context = Utils,
        args = []
    } = {}) {
        return funcList.filter(func => typeof func === 'function')
            .map(func => func.apply(context, args));
    }

    static waitFrame(params) {
        return new Promise(resolve => {
            if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
                window.requestAnimationFrame(() => {
                    resolve(params);
                });
            } else {
                setTimeout(() => {
                    resolve(params);
                }, 0)
            }
        });
    }
}