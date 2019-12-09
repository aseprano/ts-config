import { InMemoryConfig } from "../src/impl/InMemoryConfig";
import { FallbackValueDecorator } from "../src/impl/FallbackValueDecorator";

describe('FallbackValueDecorator', () => {
    const fakeConfig = new InMemoryConfig();
    fakeConfig.set('foo', 'bar');

    const fallback = new FallbackValueDecorator(fakeConfig);
    
    it('returns the inner value if found', async () => {
        expect(await fallback.get('foo', 10)).toEqual('bar');
    });

    it('returns the default value instead of undefined', async () => {
        expect(await fallback.get('moo', 10)).toEqual(10);
    });

});
