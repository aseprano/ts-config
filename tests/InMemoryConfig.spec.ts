import { InMemoryConfig } from "../src/impl/InMemoryConfig";

describe('InMemoryConfig', () => {

    it('can set a value', async () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);

        expect(await cfg.has('key')).toEqual(true);
        expect(await cfg.get('key')).toEqual(10);
    });

    it('deletes an item with an undefined value', async () => {
        const cfg = new InMemoryConfig();

        cfg.set('key', 10);
        cfg.set('key', undefined);
        expect(await cfg.has('key')).toEqual(false);
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

});
