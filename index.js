function extendPromise(promise, resolve, reject) {

    const methods = {};

    // methods to override
    for (let method of ['then', 'catch', 'finally']) {

        if (!Promise.prototype.hasOwnProperty(method)) {
            continue;
        }

        methods[method] = function(...args) {
            const promise = Promise.prototype[method].call(this, ...args);

            // add properties & methods to the newly created promise
            Object.assign(promise, methods, { promise, resolve, reject });

            return promise;
        };
    }

    Object.assign(promise, methods, { promise, resolve, reject });

}

function flatPromise(executor) {

    let resolve, reject;

    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    if (executor) {
        executor(resolve, reject);
    }

    return { promise, resolve, reject };
}

flatPromise.withControl = function withControl(executor) {

    const { promise, resolve, reject } = flatPromise();

    extendPromise(promise, resolve, reject);

    if (executor) {
        executor(resolve, reject);
    }

    return promise;
};

module.exports = flatPromise;
