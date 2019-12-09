import { CompositeConfig } from "../src/impl/CompositeConfig"
import { InMemoryConfig } from "../src/impl/InMemoryConfig";
import { mock, when, instance } from "ts-mockito";

describe('CompositeConfig', () => {

    it('always returns false for has() when empty', async () => {
        const config = new CompositeConfig();
        expect(await config.has('foo')).toEqual(false);
    });

    it('loops through all configs for has()', async () => {
        let invocationsOrder: number[] = [];

        const mockedConfig1 = mock(InMemoryConfig);
        when(mockedConfig1.has('foo')).thenCall(() => {
            invocationsOrder.push(1);
            return Promise.resolve(false);
        });

        const mockedConfig2 = mock(InMemoryConfig);
        when(mockedConfig2.has('foo')).thenCall(() => {
            invocationsOrder.push(2);
            return Promise.resolve(false);
        });

        const cfg = new CompositeConfig();
        cfg.addConfigAtEnd(instance(mockedConfig1))
            .addConfigAtEnd(instance(mockedConfig2));

        expect(await cfg.has('foo')).toEqual(false);
        expect(invocationsOrder).toEqual([1, 2]);
    });

    it('returns the first non-false result of has()', async () => {
        const callSequence: number[] = [];

        const fakeConfig1 = mock(InMemoryConfig);
        when(fakeConfig1.has('foo')).thenCall(() => {
            callSequence.push(1);
            return Promise.resolve(false);
        });

        const fakeConfig2 = mock(InMemoryConfig);
        when(fakeConfig2.has('foo')).thenCall(() => {
            callSequence.push(2);
            return Promise.resolve(true);
        });

        const fakeConfig3 = mock(InMemoryConfig);
        when(fakeConfig3.has('foo')).thenCall(() => {
            callSequence.push(3);
            return Promise.resolve(false);
        });

        const config = new CompositeConfig();

        config.addConfigAtEnd(instance(fakeConfig1))
            .addConfigAtEnd(instance(fakeConfig2))
            .addConfigAtEnd(instance(fakeConfig3));

        expect(await config.has('foo')).toEqual(true);
        expect(callSequence).toEqual([1, 2]);
    });

    it('returns undefined for get() when empty', async () => {
        const config = new CompositeConfig();
        expect(await config.get('foo')).toBeUndefined();
    });

    it('loops through all the configs for get()', async () => {
        let invocationsOrder: number[] = [];

        const mockedConfig1 = mock(InMemoryConfig);
        when(mockedConfig1.get('foo')).thenCall(() => {
            invocationsOrder.push(1);
            return Promise.resolve(undefined);
        });

        const mockedConfig2 = mock(InMemoryConfig);
        when(mockedConfig2.get('foo')).thenCall(() => {
            invocationsOrder.push(2);
            return Promise.resolve(undefined);
        });

        const cfg = new CompositeConfig();
        cfg.addConfigAtEnd(instance(mockedConfig1))
            .addConfigAtEnd(instance(mockedConfig2));

        expect(await cfg.get('foo')).toBeUndefined();
        expect(invocationsOrder).toEqual([1, 2]);
    });

    it('returns the first non-undefined result of get()', async () => {
        const callSequence: number[] = [];

        const fakeConfig1 = mock(InMemoryConfig);
        when(fakeConfig1.get('foo')).thenCall(() => {
            callSequence.push(1);
            return Promise.resolve(undefined);
        });

        const fakeConfig2 = mock(InMemoryConfig);
        when(fakeConfig2.get('foo')).thenCall(() => {
            callSequence.push(2);
            return Promise.resolve('bar');
        });

        const fakeConfig3 = mock(InMemoryConfig);
        when(fakeConfig3.get('foo')).thenCall(() => {
            callSequence.push(3);
            return Promise.resolve('baz');
        });

        const config = new CompositeConfig();

        config.addConfigAtEnd(instance(fakeConfig1))
            .addConfigAtEnd(instance(fakeConfig2))
            .addConfigAtEnd(instance(fakeConfig3));

        expect(await config.get('foo')).toEqual('bar');
        expect(callSequence).toEqual([1, 2]);
    });


})