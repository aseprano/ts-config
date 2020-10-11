import { Config } from "./Config";
import { CompositeConfig } from "./impl/exports";

export class ConfigBuilder {
    private configurationChain: Array<Config> = [];

    public static withOutmostConfig(config: Config): ConfigBuilder {
        return new ConfigBuilder(config);
    }

    private constructor(config: Config) {
        this.configurationChain.push(config);
    }

    public thatFallbacksTo(lowerLevelConfig: Config): ConfigBuilder {
        this.configurationChain.push(lowerLevelConfig);
        return this;
    }

    public build(): Config {
        if (this.configurationChain.length == 1) {
            return this.configurationChain[0];
        }

        const lastConfigIndex = this.configurationChain.length - 1;
        let prevConfigIndex = lastConfigIndex - 1;
        let compositeConfig = new CompositeConfig(this.configurationChain[prevConfigIndex], this.configurationChain[lastConfigIndex]);

        while (prevConfigIndex-- > 0) {
            compositeConfig = new CompositeConfig(this.configurationChain[prevConfigIndex], compositeConfig);
        }

        return compositeConfig;
    }

}