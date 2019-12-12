import { YamlConfig } from "../src/impl/YamlConfig";

describe('YamlConfig', () => {

    it('can parse a Yaml string', async () => {
        const yaml = "invoice: 34843\ndate: 2001-01-23";

        const cfg = YamlConfig.fromString(yaml);

        expect(cfg).not.toBeNull();
        expect(await cfg.get('invoice')).toEqual(34843);
        expect(await cfg.get('date')).toEqual('2001-01-23');
    });

});
