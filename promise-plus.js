function PromiseP(promiseOrExecutor, context) {
    if (promiseOrExecutor instanceof Promise) this.old = promiseOrExecutor;
    else if (typeof promiseOrExecutor === 'function') this.old = new Promise(promiseOrExecutor);
    else this.old = Promise.reject(new Error('Promise-Plus : constructor only takes promise or executor'));
    this.context = typeof context === 'object' ? context : {};
}

PromiseP.prototype.then = function (res, rej) {
    this.old = this.old.then(res && res.bind(this.context), rej && rej.bind(this.context));
    return this;
};

PromiseP.prototype.catch = function (rej) {
    return this.then(null, rej);
};

if (typeof module !== 'undefined') module.exports = PromiseP;
else this.PromiseP = PromiseP;
