import { NullConfig } from "../src/impl/NullConfig";

describe('NullConfig', () => {
    const config = new NullConfig();

    it('has() method always resolves to false', () => {
        expect(config.has('foo')).toBe(false);
    });

    it('get() method always resolves to undefined value', () => {
        expect(config.get('foo', 'somevalue')).toEqual('somevalue');
    });

});
