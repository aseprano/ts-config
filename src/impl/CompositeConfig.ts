import { Config } from "../Config";

export class CompositeConfig implements Config {
    private configs: Config[] = [];

    constructor(config?: Config) {
        if (config) {
            this.configs.push(config);
        }
    }

    addConfigAtEnd(config: Config): CompositeConfig {
        this.configs.push(config);
        return this;
    }

    addConfigAtBegin(config: Config): CompositeConfig {
        this.configs.unshift(config);
        return this;
    }

    async has(param: string): Promise<boolean> {
        let hasValue = false;
        let iConfig = 0;

        while (!hasValue && iConfig < this.configs.length) {
            hasValue = await this.configs[iConfig].has(param);
            ++iConfig;
        }

        return hasValue;
    }
    
    async get(param: string, default_value?: any): Promise<any> {
        let value = undefined;
        let iConfig = 0;

        while (value === undefined && iConfig < this.configs.length) {
            value = await this.configs[iConfig].get(param);
            ++iConfig;
        }
        
        return value;
    }

}