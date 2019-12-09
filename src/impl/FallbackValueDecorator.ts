import { Config } from "../Config";

export class FallbackValueDecorator implements Config {

    constructor(private innerConfig: Config) {}

    has(param: string): Promise<boolean> {
        return this.innerConfig.has(param);
    }
    
    get(param: string, default_value?: any): Promise<any> {
        return this.innerConfig
            .get(param, default_value)
            .then((value) => {
                return value === undefined ? default_value : value;
            });
    }

}