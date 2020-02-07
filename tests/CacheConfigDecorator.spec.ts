import { CacheConfigDecorator } from "../src/impl/CacheConfigDecorator";
import { InMemoryConfig } from "../src/impl/InMemoryConfig";
import { mock, when, anyString, instance, anything } from 'ts-mockito';

describe('CacheConfigDecorator', () => {

    const memcfg = new InMemoryConfig();
    memcfg.setMany({
        foo: 10,
        bar: 12
    });

    it('cannot be built with a negative ttl', () => {
        expect(() => new CacheConfigDecorator(memcfg, -1)).toThrow();
    });

    it('returns false if queried for a non existing key', async () => {
        const cache = new CacheConfigDecorator(memcfg, 10);
        expect(await cache.has('moo')).toEqual(false);
    });

    it('fetches data from the inner config', async () => {
        const cache = new CacheConfigDecorator(memcfg);
        expect(await cache.get('foo')).toEqual(10);
    });

    it('holds fetched data for the requested amount of time', async (done) => {
        let numberOfInvocation = 0;
        const fakeCache = mock(InMemoryConfig);

        when(fakeCache.get(anyString(), anything()))
            .thenCall(() => {
                return new Promise((resolve) => {
                    numberOfInvocation++;
                    resolve(10);
                });
        });

        const cache = new CacheConfigDecorator(instance(fakeCache), 3);
        const val = await cache.get('foo');
        expect(val).toEqual(10);
        expect(numberOfInvocation).toEqual(1);

        setTimeout(async () => {
            expect(await cache.get('foo')).toEqual(10);
            expect(numberOfInvocation).toEqual(1, 'First get failed'); // still cache not invalidated
        }, 2800);

        setTimeout(async () => {
            expect(await cache.get('foo')).toEqual(10);
            expect(numberOfInvocation).toEqual(2, 'Second get failed'); // cache invalidated
            done();
        }, 3000);
    });

    it('returns undefined if the inner config returns undefined', async () => {
        const cfg = new CacheConfigDecorator(memcfg, 100);
        expect(await cfg.get('moo')).toBeUndefined();
    });

});