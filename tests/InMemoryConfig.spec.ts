import { InMemoryConfig } from "../src/impl/InMemoryConfig";

describe('InMemoryConfig', () => {

    it('can set a value', () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);

        expect(cfg.has('key')).toEqual(true);
        expect(cfg.get<number>('key')).toEqual(10);
    });

    it('deletes an item when set with an undefined value', () => {
        const cfg = new InMemoryConfig();

        const paramName = 'key';
        cfg.set(paramName, 10);
        cfg.set(paramName, undefined);
        expect(cfg.has('key')).toEqual(false);
    });

    it('returns false if has() does not find the value', () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);

        expect(cfg.has('bar')).toEqual(false);
        expect(cfg.get('bar')).toBeUndefined();
    });

    it('can be set multiple values', () => {
        const cfg = new InMemoryConfig();
        cfg.setMany({foo: 10, bar: 11});

        expect(cfg.get<number>('foo')).toEqual(10);
        expect(cfg.get<number>('bar')).toEqual(11);
        expect(cfg.get<number>('baz')).toBeUndefined();
    });

    it('returns the default value if the requested parameter does not exist', () => {
        const config = new InMemoryConfig();
        expect(config.get('foo', 10)).toEqual(10);
    });

});
