import { mock, when, instance } from "ts-mockito";
import { RedisClient } from "redis";
import { RedisConfig } from "../src/impl/RedisConfig";

describe('RedisConfig', () => {

    it('forwards prefix and key to the client', async () => {
        const fakeClient = mock(RedisClient);
        when(fakeClient.HGET)
            .thenReturn((prefix: string, key: string, callable: (err?: Error, data?: any) => {}): any => {
                expect(prefix).toEqual('some:prefix');
                expect(key).toEqual('mykey');
                callable(undefined, 'value');
            });

        const cfg = new RedisConfig(instance(fakeClient), 'some:prefix');
        expect(await cfg.get('mykey')).toEqual('value');
    });
    
    it('returns the default value when the key is not found in redis', async () => {
        const fakeClient = mock(RedisClient);
        when(fakeClient.HGET)
            .thenReturn((prefix: string, key: string, callable: (err?: Error, data?: any) => {}): any => {
                callable(undefined, null);
            });

        const cfg = new RedisConfig(instance(fakeClient), 'some:prefix');
        expect(await cfg.get('mykey', 10)).toEqual(10);
    });

    it('transforms the callback error to promise error', async (done) => {
        const fakeClient = mock(RedisClient);
        when(fakeClient.HGET)
            .thenReturn((prefix: string, key: string, callable: (err?: Error, data?: any) => {}): any => {
                callable(new Error('fake error'), null);
            });

        const cfg = new RedisConfig(instance(fakeClient), 'some:prefix');

        cfg.get('mykey')
            .catch((error) => {
                expect(error.message).toEqual('fake error');
                done();
            });
    });

})