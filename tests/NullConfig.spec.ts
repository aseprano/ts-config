import { NullConfig } from "../src/impl/NullConfig";

describe('NullConfig', () => {

    it('has() method always resolves to false', (done) => {
        const config = new NullConfig();
        config.has('foo').then((has) => {
            expect(has).toEqual(false);
            done();
        });
    });

    it('get() method always resolves to undefined value', (done) => {
        const config = new NullConfig();

        config.get('foo')
            .then((val) => {
                expect(val).not.toBeDefined();
                done();
            });
    });

});
