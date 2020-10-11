import { Config } from "../Config";

export class CompositeConfig implements Config {

    constructor(
        private readonly outmostConfig: Config,
        private readonly innermostConfig: Config
    ) { }

    public has(param: string): boolean {
        return this.outmostConfig.has(param) || this.innermostConfig.has(param);
    }
    
    public get<T>(param: string, default_value?: T): T|undefined {
        return this.outmostConfig.get(param) ?? this.innermostConfig.get(param, default_value);
    }

}