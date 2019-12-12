import { Config } from "../Config";
const YAML = require('yaml');

export class YamlConfig implements Config {

    public static fromFile(path: string): YamlConfig {
        const fs = require('fs');
        const s = fs.readFileSync(path);
        return YamlConfig.fromString(s);
    }

    public static fromString(s: string): YamlConfig {
        const o = YAML.parse(s);

        if (typeof o !== 'object') {
            throw new Error('Invalid YAML configuration file');
        }

        return new YamlConfig(o);
    }

    private constructor(private o: {[key: string]: any}) {}

    async has(param: string): Promise<boolean> {
        return this.o[param] !== undefined;
    }

    async get(param: string, default_value?: any): Promise<any> {
        const value: any = this.o[param];
        return value !== undefined ? value : default_value;
    }

}
