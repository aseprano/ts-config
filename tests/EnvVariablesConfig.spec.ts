import { EnvVariablesConfig } from "../src/impl/EnvVariablesConfig";

describe('EnvVariablesConfig', () => {

    it('returns true or false if the requested parameter exists or not', async () => {
        const cfg = new EnvVariablesConfig({
            foo: 'bar'
        });

        expect(await cfg.has('bar')).toEqual(false);
        expect(await cfg.has('foo')).toEqual(true);
    });

    it('returns the value of the variables', async () => {
        const cfg = new EnvVariablesConfig({
            foo: 'bar',
            name: 'john',
            age: 130
        });

        expect(await cfg.get('foo')).toEqual('bar');
        expect(await cfg.get('name')).toEqual('john');
        expect(await cfg.get('age')).toEqual(130);
    });

});
