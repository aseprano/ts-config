import { InMemoryConfig } from "../src/impl/InMemoryConfig";
import { FallbackValueDecorator } from "../src/impl/FallbackValueDecorator";
import { mock, when, instance } from "ts-mockito";

describe('FallbackValueDecorator', () => {
    const fakeConfig = new InMemoryConfig();
    fakeConfig.set('foo', 'bar');

    const fallback = new FallbackValueDecorator(fakeConfig);
    
    it('provides the default_value to the inner config', async () => {
        const mockedConfig = mock(InMemoryConfig);
        when(mockedConfig.get('foo', 10)).thenResolve(12);

        const fallback = new FallbackValueDecorator(instance(mockedConfig));
        expect(await fallback.get('foo', 10)).toEqual(12);
    });

    it('returns the inner value if found', async () => {
        expect(await fallback.get('foo', 10)).toEqual('bar');
    });

    it('returns the default value instead of undefined', async () => {
        expect(await fallback.get('moo', 10)).toEqual(10);
    });

});
