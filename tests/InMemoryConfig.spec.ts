import { InMemoryConfig } from "../src/impl/InMemoryConfig";

describe('InMemoryConfig', () => {

    it('can be set a value', async () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);

        expect(await cfg.has('key')).toEqual(true);
        expect(await cfg.get('key')).toEqual(10);
    });

    it('returns false if has() does not find the value', async () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);

        expect(await cfg.has('bar')).toEqual(false);
        expect(await cfg.get('bar')).toBeUndefined();
    });

    it('can be set multiple values', async () => {
        const cfg = new InMemoryConfig();
        cfg.setMany({foo: 10, bar: 11});

        expect(await cfg.get('foo')).toEqual(10);
        expect(await cfg.get('bar')).toEqual(11);
        expect(await cfg.get('baz')).toBeUndefined();
    });

    it('can delete an item', async () => {
        const cfg = new InMemoryConfig();
        cfg.set('foo', 10);
        cfg.unset('foo');
        expect(await cfg.has('foo')).toEqual(false);
    });

    it('returns true if an item exists with an undefined value', async () => {
        const cfg = new InMemoryConfig();
        cfg.set('foo', undefined);
        expect(await cfg.has('foo')).toEqual(true);
    });

});
