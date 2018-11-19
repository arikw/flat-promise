const expect = require('chai').expect;
const flatPromise = require('../index');

describe('flatPromise()', () => {

    it('should return an object containing a Promise with resolve and reject functions', () => {

        expect(flatPromise().promise).to.be.a('promise');
        expect(flatPromise().resolve).to.be.a('function');
        expect(flatPromise().reject).to.be.a('function');

    });

    it('should not have resolve & reject functions on chained then() calls', () => {

        const { promise } = flatPromise();
        const chained = promise.then().then();
        expect(chained).to.not.have.property('reject');
        expect(chained).to.not.have.property('resolve');

    });

    it('should not have resolve & reject functions on chained catch() calls', () => {

        const { promise } = flatPromise();
        const chained = promise.catch().catch();
        expect(chained).to.not.have.property('reject');
        expect(chained).to.not.have.property('resolve');

    });

    it('should not have resolve & reject functions on chained finally() call', () => {

        if (Promise.prototype.hasOwnProperty('finally')) {
            const { promise } = flatPromise();
            const chained = promise.finally().finally();
            expect(chained).to.not.have.property('reject');
            expect(chained).to.not.have.property('resolve');
        }

    });

    it('should accept an executor function', () => {

        expect(() => flatPromise(() => {})).to.not.throw();

    });

    it('should not accept a non-function as an executor function', () => {

        expect(() => flatPromise(123)).to.throw();

    });

    it('resolves ansyncronously from executor function', done => {

        const { promise } = flatPromise((res, rej) => {
            setTimeout(() => {
                res('done!');
            }, 0);
        });

        promise.then((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('resolves ansyncronously from outside of the executor function', done => {

        const { promise, resolve } = flatPromise();

        setTimeout(() => {
            resolve('done!');
        }, 0);

        promise.then((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('resolves immediatly outside of the executor function', done => {

        const { promise, resolve } = flatPromise();

        promise.then((result) => {
            expect(result).to.equal('done!');
            done();
        });

        resolve('done!');

    });

    it('rejects ansyncronously from executor function', done => {

        const { promise } = flatPromise((res, rej) => {
            setTimeout(() => {
                rej('done!');
            }, 0);
        });

        promise.catch((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('rejects ansyncronously from outside of the executor function', done => {

        const { promise, reject } = flatPromise();

        setTimeout(() => {
            reject('done!');
        }, 0);

        promise.catch((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('rejects immediatly outside of the executor function', done => {

        const { promise, reject } = flatPromise();

        promise.catch((result) => {
            expect(result).to.equal('done!');
            done();
        });

        reject('done!');

    });

});

describe('flatPromise.withControl()', () => {

    it('should return an object containing a Promise', () => {

        expect(flatPromise.withControl()).to.be.a('promise');

    });

    it('should have resolve & reject functions on chained then() calls', () => {

        const promise = flatPromise.withControl().then().then();
        expect(promise).to.have.property('reject');
        expect(promise).to.have.property('resolve');

    });

    it('should have resolve & reject functions on chained catch() calls', () => {

        const promise = flatPromise.withControl().catch().catch();
        expect(promise).to.have.property('reject');
        expect(promise).to.have.property('resolve');

    });

    it('should have resolve & reject functions on chained finally() call', () => {

        if (Promise.prototype.hasOwnProperty('finally')) {
            const promise = flatPromise.withControl().finally().finally();
            expect(promise).to.have.property('reject');
            expect(promise).to.have.property('resolve');
        }

    });

    it('should accept an executor function', () => {

        expect(() => flatPromise.withControl(() => {})).to.not.throw();

    });

    it('should not accept a non-function as an executor function', () => {

        expect(() => flatPromise.withControl(123)).to.throw();

    });

    it('resolves ansyncronously from executor function', done => {

        const promise = flatPromise.withControl((res, rej) => {
            setTimeout(() => {
                res('done!');
            }, 0);
        });

        promise.then((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('resolves ansyncronously from outside of the executor function', done => {

        const { promise, resolve } = flatPromise.withControl();

        setTimeout(() => {
            resolve('done!');
        }, 0);

        promise.then((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('resolves immediatly outside of the executor function', done => {

        flatPromise.withControl()
            .then((result) => {
                expect(result).to.equal('done!');
                done();
            })
            .resolve('done!');

    });

    it('rejects ansyncronously from executor function', done => {

        const promise = flatPromise.withControl((res, rej) => {
            setTimeout(() => {
                rej('done!');
            }, 0);
        });

        promise.catch((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('rejects ansyncronously from outside of the executor function', done => {

        const { promise, reject } = flatPromise.withControl();

        setTimeout(() => {
            reject('done!');
        }, 0);

        promise.catch((result) => {
            expect(result).to.equal('done!');
            done();
        });

    });

    it('rejects immediatly outside of the executor function', done => {

        flatPromise.withControl()
            .catch((result) => {
                expect(result).to.equal('done!');
                done();
            })
            .reject('done!');

    });

});
